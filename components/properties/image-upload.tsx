'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { CloudinaryUploadResult } from '@/lib/cloudinary';
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface ImageUploadProps {
  onImagesUploaded: (images: CloudinaryUploadResult[]) => void;
  existingImages?: CloudinaryUploadResult[];
  maxFiles?: number;
}

export function ImageUpload({ onImagesUploaded, existingImages = [], maxFiles = 10 }: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<CloudinaryUploadResult[]>(existingImages);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Check if adding these files would exceed the limit
    if (uploadedImages.length + acceptedFiles.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} images`);
      // Only add files up to the limit
      const remainingSlots = maxFiles - uploadedImages.length;
      if (remainingSlots > 0) {
        setFiles(prev => [...prev, ...acceptedFiles.slice(0, remainingSlots)]);
      }
      return;
    }
    
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, [uploadedImages.length, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    // Notify parent component
    onImagesUploaded(uploadedImages.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }
      
      setUploadProgress(100);
      
      const data = await response.json();
      const newImages = data.images as CloudinaryUploadResult[];
      
      setUploadedImages(prev => [...prev, ...newImages]);
      setFiles([]);
      
      // Notify parent component
      onImagesUploaded([...uploadedImages, ...newImages]);
      
      toast.success(`Successfully uploaded ${newImages.length} images`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-gray-100 rounded-full">
            <Upload className="h-8 w-8 text-gray-500" />
          </div>
          <div>
            <p className="text-lg font-medium">
              {isDragActive ? 'Drop the files here' : 'Drag & drop images here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse (max {maxFiles} images, 5MB each)
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Supported formats: JPEG, PNG, WebP
          </p>
        </div>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Selected Files ({files.length})</h3>
            <Button 
              onClick={uploadFiles} 
              disabled={uploading}
              className="bg-black text-white hover:bg-gray-800"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload All
                </>
              )}
            </Button>
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-gray-500 text-right">{uploadProgress}%</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-2 text-xs truncate">{file.name}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Uploaded Images ({uploadedImages.length})</h3>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="mr-1 h-3 w-3" />
              Saved to Cloudinary
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <div className="aspect-square relative">
                  <img
                    src={image.secure_url}
                    alt={`Property image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeUploadedImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-2 text-xs flex items-center justify-between">
                  <span className="truncate">{image.public_id.split('/').pop()}</span>
                  <span className="text-gray-500">{Math.round(image.width / 100) / 10}MP</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
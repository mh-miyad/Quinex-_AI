import { getDatabase } from '../mongodb';
import { Property, PropertyCreateInput, PropertyUpdateInput, PropertyImage } from '../models/Property';
import { ObjectId } from 'mongodb';

export class PropertyService {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<Property>('properties');
  }

  async createProperty(data: PropertyCreateInput): Promise<Property> {
    const collection = await this.getCollection();
    
    const property: Omit<Property, '_id'> = {
      ...data,
      status: data.status || 'active',
      images: data.images || [],
      description: data.description || '',
      amenities: data.amenities || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(property);
    const created = await collection.findOne({ _id: result.insertedId });
    
    if (!created) {
      throw new Error('Failed to create property');
    }

    return {
      ...created,
      id: created._id.toString(),
    };
  }

  async getProperties(userId: string, filters?: any): Promise<Property[]> {
    const collection = await this.getCollection();
    
    const query: any = { userId };
    
    if (filters?.status) {
      query.status = filters.status;
    }
    
    if (filters?.type) {
      query.type = filters.type;
    }
    
    if (filters?.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { location: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const properties = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return properties.map(property => ({
      ...property,
      id: property._id.toString(),
    }));
  }

  async getPropertyById(id: string, userId: string): Promise<Property | null> {
    const collection = await this.getCollection();
    
    const property = await collection.findOne({
      _id: new ObjectId(id),
      userId,
    });

    if (!property) {
      return null;
    }

    return {
      ...property,
      id: property._id.toString(),
    };
  }

  async updateProperty(id: string, userId: string, data: PropertyUpdateInput): Promise<Property | null> {
    const collection = await this.getCollection();
    
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return null;
    }

    return {
      ...result.value,
      id: result.value._id.toString(),
    };
  }

  async deleteProperty(id: string, userId: string): Promise<boolean> {
    const collection = await this.getCollection();
    
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId,
    });

    return result.deletedCount > 0;
  }

  async getPropertyStats(userId: string): Promise<any> {
    const collection = await this.getCollection();
    
    const stats = await collection.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          sold: {
            $sum: { $cond: [{ $eq: ['$status', 'sold'] }, 1, 0] }
          },
          rented: {
            $sum: { $cond: [{ $eq: ['$status', 'rented'] }, 1, 0] }
          },
          totalValue: { $sum: '$price' },
          avgPrice: { $avg: '$price' },
        }
      }
    ]).toArray();

    return stats[0] || {
      total: 0,
      active: 0,
      sold: 0,
      rented: 0,
      totalValue: 0,
      avgPrice: 0,
    };
  }

  async addPropertyImages(id: string, userId: string, images: PropertyImage[]): Promise<Property | null> {
    const collection = await this.getCollection();
    
    const property = await collection.findOne({
      _id: new ObjectId(id),
      userId,
    });

    if (!property) {
      return null;
    }

    const currentImages = property.images || [];
    const updatedImages = [...currentImages, ...images];

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { 
        $set: { 
          images: updatedImages,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return null;
    }

    return {
      ...result.value,
      id: result.value._id.toString(),
    };
  }

  async removePropertyImage(id: string, userId: string, imagePublicId: string): Promise<Property | null> {
    const collection = await this.getCollection();
    
    const property = await collection.findOne({
      _id: new ObjectId(id),
      userId,
    });

    if (!property) {
      return null;
    }

    const updatedImages = (property.images || []).filter(img => img.public_id !== imagePublicId);

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { 
        $set: { 
          images: updatedImages,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return null;
    }

    return {
      ...result.value,
      id: result.value._id.toString(),
    };
  }
}

export const propertyService = new PropertyService();
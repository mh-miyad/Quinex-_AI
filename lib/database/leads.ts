import { getDatabase } from '../mongodb';
import { Lead, LeadCreateInput, LeadUpdateInput } from '../models/Lead';
import { ObjectId } from 'mongodb';

export class LeadService {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<Lead>('leads');
  }

  async createLead(data: LeadCreateInput): Promise<Lead> {
    const collection = await this.getCollection();
    
    const lead: Omit<Lead, '_id'> = {
      ...data,
      score: data.score || 50,
      status: data.status || 'new',
      notes: data.notes || [],
      createdAt: new Date(),
    };

    const result = await collection.insertOne(lead);
    const created = await collection.findOne({ _id: result.insertedId });
    
    if (!created) {
      throw new Error('Failed to create lead');
    }

    return {
      ...created,
      id: created._id.toString(),
    };
  }

  async getLeads(userId: string, filters?: any): Promise<Lead[]> {
    const collection = await this.getCollection();
    
    const query: any = { userId };
    
    if (filters?.status) {
      query.status = filters.status;
    }
    
    if (filters?.score) {
      if (filters.score === 'high') {
        query.score = { $gte: 80 };
      } else if (filters.score === 'medium') {
        query.score = { $gte: 60, $lt: 80 };
      } else if (filters.score === 'low') {
        query.score = { $lt: 60 };
      }
    }
    
    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
        { phone: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const leads = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return leads.map(lead => ({
      ...lead,
      id: lead._id.toString(),
    }));
  }

  async getLeadById(id: string, userId: string): Promise<Lead | null> {
    const collection = await this.getCollection();
    
    const lead = await collection.findOne({
      _id: new ObjectId(id),
      userId,
    });

    if (!lead) {
      return null;
    }

    return {
      ...lead,
      id: lead._id.toString(),
    };
  }

  async updateLead(id: string, userId: string, data: LeadUpdateInput): Promise<Lead | null> {
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

  async deleteLead(id: string, userId: string): Promise<boolean> {
    const collection = await this.getCollection();
    
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId,
    });

    return result.deletedCount > 0;
  }

  async getLeadStats(userId: string): Promise<any> {
    const collection = await this.getCollection();
    
    const stats = await collection.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: {
            $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
          },
          contacted: {
            $sum: { $cond: [{ $eq: ['$status', 'contacted'] }, 1, 0] }
          },
          qualified: {
            $sum: { $cond: [{ $eq: ['$status', 'qualified'] }, 1, 0] }
          },
          converted: {
            $sum: { $cond: [{ $eq: ['$status', 'converted'] }, 1, 0] }
          },
          avgScore: { $avg: '$score' },
          highPriority: {
            $sum: { $cond: [{ $gte: ['$score', 80] }, 1, 0] }
          },
        }
      }
    ]).toArray();

    return stats[0] || {
      total: 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      converted: 0,
      avgScore: 0,
      highPriority: 0,
    };
  }
}

export const leadService = new LeadService();
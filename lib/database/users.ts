import { getDatabase } from '../mongodb';
import { User, UserCreateInput, UserUpdateInput } from '../models/User';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export class UserService {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<User>('users');
  }

  async createUser(data: UserCreateInput): Promise<User> {
    const collection = await this.getCollection();
    
    // Check if user already exists
    const existingUser = await collection.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    const user: Omit<User, '_id'> = {
      ...data,
      password: hashedPassword,
      plan: data.plan || 'free',
      settings: {
        market: 'new-york',
        currency: 'USD',
        language: 'en',
        timezone: 'America/New_York',
        theme: 'light',
        notifications: {
          email: true,
          whatsapp: false,
          browser: true,
        },
        integrations: {
          whatsapp: false,
          googleCalendar: false,
        },
        ...data.settings,
      },
      createdAt: new Date(),
    };

    const result = await collection.insertOne(user);
    const created = await collection.findOne({ _id: result.insertedId });
    
    if (!created) {
      throw new Error('Failed to create user');
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = created;
    
    return {
      ...userWithoutPassword,
      id: created._id.toString(),
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection();
    
    const user = await collection.findOne({ email });

    if (!user) {
      return null;
    }

    return {
      ...user,
      id: user._id.toString(),
    };
  }

  async getUserById(id: string): Promise<User | null> {
    const collection = await this.getCollection();
    
    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return null;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    return {
      ...userWithoutPassword,
      id: user._id.toString(),
    };
  }

  async updateUser(id: string, data: UserUpdateInput): Promise<User | null> {
    const collection = await this.getCollection();
    
    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };

    // Hash password if provided
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return null;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = result.value;
    
    return {
      ...userWithoutPassword,
      id: result.value._id.toString(),
    };
  }

  async verifyPassword(email: string, password: string): Promise<User | null> {
    const collection = await this.getCollection();
    
    const user = await collection.findOne({ email });

    if (!user || !user.password) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      ...userWithoutPassword,
      id: user._id.toString(),
    };
  }
}

export const userService = new UserService();
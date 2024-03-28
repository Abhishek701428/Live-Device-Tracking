import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  usertype: 'superadmin' | 'admin' | 'user';
  password: string;
  devicesId: string[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  usertype: {
    type: String,
    enum: ['superadmin', 'admin', 'user'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  devicesId: {
    type: [String], 
    default: [],   
  },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

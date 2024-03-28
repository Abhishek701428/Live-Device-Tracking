import { Document, model, Schema } from 'mongoose';

export interface EnvironmentDocument extends Document {
  vehicleName: string;
  vehicleNumber: string;
  email: string;
  location?: string;
  vehicleImage?: string;
}

const environmentSchema = new Schema<EnvironmentDocument>({
  vehicleName: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  },
  vehicleImage: {
    type: String
  }
});

const EnvironmentModel = model<EnvironmentDocument>('Environment', environmentSchema);

export default EnvironmentModel;

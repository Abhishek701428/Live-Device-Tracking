import mongoose, { Document, Schema } from 'mongoose';

export interface  ServiceLog {
  serviceDate: string;
  asset: string;
  maintenanceNotes: string;
  odometer: string;
  engineHours: number;
  attachments: string[];
  actions: string[];
}

const serviceLog = new Schema<ServiceLog & Document>({
  serviceDate: { type: String, required: true },
  asset: { type: String, required: true },
  maintenanceNotes: { type: String, required: true },
  odometer: { type: String, required: true },
  engineHours: { type: Number, required: true },
  attachments: { type: [String], default: [] },
  actions: { type: [String], default: [] },
});

const MaintenanceModel = mongoose.model<ServiceLog & Document>('serviceLog', serviceLog);

export default MaintenanceModel;

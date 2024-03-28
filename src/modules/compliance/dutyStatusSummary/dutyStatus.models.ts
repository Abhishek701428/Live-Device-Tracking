import mongoose, { Document, Schema } from 'mongoose';

export interface IDriverStatus extends Document {
  driver: string;
  dutyStatus: {
    type: Boolean,
    required: true,
    default: false,
  }
  timeInCurrentStatus: string;
  vehicle: string;
  timeUntilBreak: string;
  driveRemaining: string;
  shiftRemaining: string;
  cycleRemaining: string;
  cycleTomorrow: string;
  drivingInViolation: {
    type: Boolean,
    required: true,
    default: false,
  }
}

const DriverStatusSchema: Schema = new Schema({
  driver: { type: String, required: true },
  dutyStatus: {  
    type: Boolean,
    required: true,
    default: false, 
  },
  timeInCurrentStatus: { type: String, required: true },
  vehicle: { type: String, required: true },
  timeUntilBreak: { type: String, required: true },
  driveRemaining: { type: String, required: true },
  shiftRemaining: { type: String, required: true },
  cycleRemaining: { type: String, required: true },
  cycleTomorrow: { type: String, required: true },
  drivingInViolation: {
    type: Boolean,
    required: true,
    default: false,
    },
  });

export default mongoose.model<IDriverStatus>('DutyStatus', DriverStatusSchema);
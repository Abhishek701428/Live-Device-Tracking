import { Schema, model, Document } from 'mongoose';
interface HoursOfSRDriver extends Document {
  date: Date;
  shift: string;
  driving: string;
  inViolation: boolean;
  from: string;
  to: string;
  details: string;
}
const HoursOfSRDriverSchema = new Schema<HoursOfSRDriver>(
  {
    date: {
      type: Date,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    driving: {
      type: String,
      required: true,
    },
    inViolation: {
      type: Boolean,
      default: false,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

const HoursOfSRDriverModel = model<HoursOfSRDriver>('HoursOfSRDriver', HoursOfSRDriverSchema);

export {HoursOfSRDriverModel, HoursOfSRDriver};
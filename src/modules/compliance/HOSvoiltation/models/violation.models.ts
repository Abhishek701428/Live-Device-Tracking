import mongoose, { Schema, Document } from 'mongoose';

export interface IViolation extends Document {
  driver: string;
  violationTime: string;
  days:{
    type:boolean,
    required: true,
    default: false,
  }
}

const violationSchema: Schema = new Schema({
  driver: {type: String, required: true  },
  violationTime: { type: String, required: true },
  days: { 
    type:Boolean,
    required: true,
    default: false, 
  }
});

export default mongoose.model<IViolation>('Violation', violationSchema);

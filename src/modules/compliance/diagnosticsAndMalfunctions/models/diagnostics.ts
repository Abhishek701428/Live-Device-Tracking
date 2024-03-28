import mongoose, { Schema, Document } from 'mongoose';

export interface DiagnosticsAndMalfunctionsInterface extends Document {
  dateTriggered: string;
  event: string;
  asset: string;
  drivers: string;
  daysUntilDeadline: string;
  status:{
    type: Boolean,
    required: true,
    default: false,
  }
}

const DiagnosticsAndMalfunctionsSchema: Schema = new Schema({
  dateTriggered: { type: String, required: true },
  event: { type: String, required: true },
  asset: { type: String, required: true },
  drivers: { type: String, required: true },
  daysUntilDeadline: { type: String, required: true },
  status: { 
    type: Boolean,
    required: true,
    default: false,
  },
});

const DiagnosticsAndMalfunctionsModel = mongoose.model<DiagnosticsAndMalfunctionsInterface>(
  'DiagnosticsAndMalfunctions',
  DiagnosticsAndMalfunctionsSchema
);

export default DiagnosticsAndMalfunctionsModel;
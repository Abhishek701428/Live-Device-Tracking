import { Schema, model, Document } from 'mongoose';

interface Trailers extends Document {
  name: string;
  location: string;
  lastTrip: number;
  status: boolean;
  battery: number;
  tags: string[];
  // action: string;
}

const trailersSchema = new Schema<Trailers>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  lastTrip: {type:Number, required:true},
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  battery: { type: Number, required: true },
  tags: { type: [String], default: [] },
  // action: { type: String, required: true },
});

const TrailersModel = model<Trailers>('Trailers', trailersSchema);

export default TrailersModel;

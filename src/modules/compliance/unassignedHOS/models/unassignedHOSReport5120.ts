import mongoose, { Document, Schema } from 'mongoose';

export interface TripType extends Document {
  startTime: Date;
  duration: number;
  distance: number;
  trip: string;
  previousDriver: string;
  nextDriver: string;
  action: string;
}

const tripSchema = new Schema<TripType>(
  {
    startTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    trip: {
      type: String,
      required: true,
    },
    previousDriver: {
      type: String,
      required: true,
    },
    nextDriver: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TripModel = mongoose.model<TripType>('Unassigned', tripSchema);

export default TripModel;
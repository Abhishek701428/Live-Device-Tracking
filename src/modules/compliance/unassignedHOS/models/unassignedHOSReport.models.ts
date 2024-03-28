import mongoose, { Document, Schema } from 'mongoose';

export interface VehicleType extends Document {
  vehicle: string;
  unassignedTime: number;
  unassignedDistance: number;
  unassignedSegments: number;
  pendingSegments: number;
  annotatedSegments: number;
}

const vehicleSchema = new Schema<VehicleType>(
  {
    vehicle: {
      type: String,
      required: true,
      unique: true,
    },
    unassignedTime: {
      type: Number,
      required: true,
    },
    unassignedDistance: {
      type: Number,
      required: true,
    },
    unassignedSegments: {
      type: Number,
      required: true,
    },
    pendingSegments: {
      type: Number,
      required: true,
    },
    annotatedSegments: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VehicleModel = mongoose.model<VehicleType>('UnAssigned-hos', vehicleSchema);

export default VehicleModel;
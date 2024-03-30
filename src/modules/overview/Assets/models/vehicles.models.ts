import { Schema, model, Document } from 'mongoose';

interface Vehicle extends Document {
  name: string;
  location: string;
  lastTrip:string;
  status: {
    type: Boolean,
    required: true,
    default: false, 
  }
  currentDriver: {
    name: string;
  };
  currentFuelLevel: number;
  licensePlate: string;
  tags: string[];
  action:string;
}

const vehicleSchema = new Schema<Vehicle>({
  name: { type: String, required: true, unique: true},
  location: { type: String, required: true },
  lastTrip: {type:String, required:true},
  status: { 
    type: Boolean,
    required: true,
    default: false, 
   },
  currentDriver: {
    name: { type: String, default: '' },
    licenseNumber: { type: String, default: '' },
  },
  currentFuelLevel: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  tags: { type:[String], default: [] },
  action:String
});

const VehicleModel = model<Vehicle>('Assetsvehicle', vehicleSchema);

export default VehicleModel;

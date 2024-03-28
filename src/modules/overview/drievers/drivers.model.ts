import mongoose, { Document, Model } from 'mongoose';

export interface DriverModel extends Document {
  name: string;
  drivingStatus: boolean;
  currentVehicle: string;
  currentLocation: string;
  appVersion: string;
  operatingSystem: string;
}

const driverSchema = new mongoose.Schema({
  name: { 
   type: String,
    required: true 
   },
  drivingStatus: { 
    type: Boolean,
    required: true,
    default: false, 
   },
  currentVehicle: {
    type: String,
     required: true 
   },
  currentLocation: { 
   type: String, 
   required: true 
},
  appVersion: { 
   type: String,
    required: true 
   },
  operatingSystem: { 
   type: String, 
   required: true 
}
});

const Driver: Model<DriverModel> = mongoose.model<DriverModel>('Driver', driverSchema);
export default Driver;

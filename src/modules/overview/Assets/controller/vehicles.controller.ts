import { Request, Response } from 'express';
import VehicleModel from '../models/vehicles.models';

// Create a new vehicle
// Define a function to create a new vehicle and save it to the database
export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const newVehicleData = {
      name: req.body.name,
      location: req.body.location,
      lastTrip: req.body.lastTrip,
      status: req.body.status,
      currentDriver: {
        name: req.body.currentDriver.name
      },
      currentFuelLevel: req.body.currentFuelLevel,
      licensePlate: req.body.licensePlate,
      tags: req.body.tags,
      action: req.body.action
    };

    const newVehicle = new VehicleModel(newVehicleData);
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get all vehicles
export const getAllVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles = await VehicleModel.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search for a vehicle by name
export const getVehicleByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    const vehicle = await VehicleModel.findOne({ name });

    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error while searching for vehicle by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a vehicle by ID
export const updateVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, req.body, { new: true });
    
    if (updatedVehicle) {
      res.status(200).json(updatedVehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a vehicle by ID
export const deleteVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedVehicle = await VehicleModel.findByIdAndDelete(id);
    
    if (deletedVehicle) {
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

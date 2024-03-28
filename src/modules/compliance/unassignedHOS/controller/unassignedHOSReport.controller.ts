// controllers/VehicleController.ts
import { Request, Response } from 'express';
import VehicleModel, { VehicleType } from '../models/unassignedHOSReport.models';

export const createVehicle_hoc = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      vehicle,
      unassignedTime,
      unassignedDistance,
      unassignedSegments,
      pendingSegments,
      annotatedSegments,
    } = req.body;

    const newVehicle: VehicleType = new VehicleModel({
      vehicle,
      unassignedTime,
      unassignedDistance,
      unassignedSegments,
      pendingSegments,
      annotatedSegments,
    });

    const savedVehicle = await newVehicle.save();

    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getVehicles_hoc = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles = await VehicleModel.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getVehicleById_hoc = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const vehicle = await VehicleModel.findById(id);

    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateVehicle_hoc = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedVehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteVehicle_hoc = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedVehicle = await VehicleModel.findByIdAndDelete(id);

    if (!deletedVehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
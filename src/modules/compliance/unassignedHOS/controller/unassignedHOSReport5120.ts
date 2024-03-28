import { Request, Response } from 'express';
import TripModel, { TripType } from '../models/unassignedHOSReport5120';

export const createTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      startTime,
      duration,
      distance,
      trip,
      previousDriver,
      nextDriver,
      action,
    } = req.body;

    const newTrip: TripType = new TripModel({
      startTime,
      duration,
      distance,
      trip,
      previousDriver,
      nextDriver,
      action,
    });

    const savedTrip = await newTrip.save();

    res.status(201).json(savedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const trips = await TripModel.find();
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTripById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const trip = await TripModel.findById(id);

    if (!trip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTrip = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedTrip = await TripModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTrip = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedTrip = await TripModel.findByIdAndDelete(id);

    if (!deletedTrip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
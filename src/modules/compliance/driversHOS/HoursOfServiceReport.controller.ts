import { Request, Response } from 'express';
import {HoursOfSRDriverModel, HoursOfSRDriver} from './HoursOfServiceReport.models'

// Create
export const createHoursOfSRDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEntry: HoursOfSRDriver = req.body; // Assuming you're sending the data in the request body
    const createdEntry = await HoursOfSRDriverModel.create(newEntry);
    res.status(201).json(createdEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read
export const getHoursOfSRDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const entries = await HoursOfSRDriverModel.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update
export const updateHoursOfSRDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedEntry = await HoursOfSRDriverModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete
export const deleteHoursOfSRDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedDocument = await HoursOfSRDriverModel.findByIdAndDelete(id);

    if (deletedDocument) {
      res.status(200).json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
import { Request, Response } from 'express';
import TrailersModel from '../models/trailers.models';

// Create a new trailer
export const createTrailer = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTrailer = new TrailersModel(req.body);
    const savedTrailer = await newTrailer.save();
    res.status(201).json(savedTrailer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all trailers
export const getAllTrailers = async (req: Request, res: Response): Promise<void> => {
  try {
    const trailers = await TrailersModel.find();
    res.status(200).json(trailers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific trailer by ID
export const getTrailerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const trailer = await TrailersModel.findById(id);
    
    if (trailer) {
      res.status(200).json(trailer);
    } else {
      res.status(404).json({ error: 'Trailer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a trailer by ID
export const updateTrailerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTrailer = await TrailersModel.findByIdAndUpdate(id, req.body, { new: true });
    
    if (updatedTrailer) {
      res.status(200).json(updatedTrailer);
    } else {
      res.status(404).json({ error: 'Trailer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a trailer by ID
export const deleteTrailerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTrailer = await TrailersModel.findByIdAndDelete(id);
    
    if (deletedTrailer) {
      res.status(200).json({ message: 'Trailer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Trailer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

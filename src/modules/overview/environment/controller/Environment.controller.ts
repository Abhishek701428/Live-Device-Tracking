import { Request, Response } from 'express';
import EnvironmentModel, { EnvironmentDocument } from '../models/Environment.model';

interface ErrorResponse {
  message: string;
}

export const UserController = {
  //...............................................................................................
  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { vehicleName, vehicleNumber, email, location, vehicleImage } = req.body;
      if (!vehicleName || !vehicleNumber || !email || !location || !vehicleImage) {
        throw new Error('Missing required fields.');
      }
      const newEnvironment = new EnvironmentModel({ vehicleName, vehicleNumber, email, location, vehicleImage });
      const savedEnvironment = await newEnvironment.save();
      res.status(201).json(savedEnvironment);
    } catch (error: any) {
      console.error(error);
      const errResponse: ErrorResponse = { message: error.message || 'Internal server error.' };
      res.status(400).json(errResponse);
    }
  },
//.........................................................................................................
  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const updatedEnvironment = await EnvironmentModel.findByIdAndUpdate(userId, req.body, { new: true });
      res.status(200).json(updatedEnvironment);
    } catch (error: any) {
      const errResponse: ErrorResponse = { message: error.message };
      res.status(400).json(errResponse);
    }
  },
//..........................................................................................................
  getAllUsers: async (_req: Request, res: Response): Promise<void> => {
    try {
      const environments = await EnvironmentModel.find();
      res.status(200).json(environments);
    } catch (error: any) {
      const errResponse: ErrorResponse = { message: error.message };
      res.status(500).json(errResponse);
    }
  },
//........................................................................................................
  filterEnvironments: async (req: Request, res: Response): Promise<void> => {
    try {
      const { vehicleName, vehicleNumber, email, location } = req.query;
  
      const query: Partial<EnvironmentDocument> = {};
  
      if (vehicleName) query.vehicleName = vehicleName as string;
      if (vehicleNumber) query.vehicleNumber = vehicleNumber as string;
      if (email) query.email = email as string;
      if (location) query.location = location as string;
  
      const filteredEnvironments = await EnvironmentModel.find(query as any);
      res.status(200).json(filteredEnvironments);
    } catch (error: any) {
      const errResponse: ErrorResponse = { message: error.message };
      res.status(500).json(errResponse);
    }
  },
//......................................................................................................
  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const deletedEnvironment = await EnvironmentModel.findByIdAndDelete(userId);
      res.status(200).json(deletedEnvironment);
    } catch (error: any) {
      const errResponse: ErrorResponse = { message: error.message };
      res.status(400).json(errResponse);
    }
  },
  //.........................................................................................................
};

export default UserController;

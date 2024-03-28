import { Request, Response } from 'express';
import UserModel, { IUser } from './DriverHoursOfServiceAuditReport.models';

// Create a new user
export const createDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { driver, totalUpdate } = req.body;
    const newUser: IUser = new UserModel({ driver, totalUpdate });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
export const getAllDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getUserByIdDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const user: IUser | null = await UserModel.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
export const updateUserByIdDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const { driver, totalUpdate } = req.body;
    const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
      userId,
      { driver, totalUpdate },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
export const deleteUserByIdDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const deletedUser: IUser | null = await UserModel.findByIdAndDelete(userId);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
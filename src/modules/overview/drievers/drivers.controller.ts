import { Request, Response } from 'express';
import Driver, { DriverModel } from './drivers.model';
//..........................................................................................
export const createDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDriver: DriverModel = await Driver.create(req.body);
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//..............................................................................................
export const getAllDrivers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const drivers: DriverModel[] = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//...........................................................................................
export const updateDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedDriver: DriverModel | null = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).exec();

    if (!updatedDriver) {
      res.status(404).json({ message: 'Driver not found' });
      return;
    }

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//.........................................................................................................
export const deleteDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id).exec();

    if (!deletedDriver) {
      res.status(404).json({ message: 'Driver not found' });
      return;
    }

    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//...........................................................................................................
export const searchDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, drivingStatus, currentVehicle, currentLocation } = req.query;

    const query: any = {};

    if (name) query.name = { $regex: new RegExp(name as string, 'i') };
    if (drivingStatus === 'true' || drivingStatus === 'false') query.drivingStatus = drivingStatus === 'true';
    if (currentVehicle) query.currentVehicle = { $regex: new RegExp(currentVehicle as string, 'i') };
    if (currentLocation) query.currentLocation = { $regex: new RegExp(currentLocation as string, 'i') };

    const drivers: DriverModel[] = await Driver.find(query);

    if (!drivers.length) {
      res.status(404).json({ message: 'No drivers found matching the search criteria' });
      return;
    }

    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
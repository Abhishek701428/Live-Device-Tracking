// controllers/dutyStatusSummaryReport/dutyStatusSummaryReport.ts
import { Request, Response } from 'express';
import DutyStatusModel, { IDriverStatus } from './dutyStatus.models';

class DriverStatusController {
  async getDriverStatus(req: Request, res: Response): Promise<void> {
    try {
      const driverStatuses: IDriverStatus[] = await DutyStatusModel.find();
      res.status(200).json(driverStatuses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getDriverStatusById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const driverStatus: IDriverStatus | null = await DutyStatusModel.findById(id);
      if (driverStatus) {
        res.status(200).json(driverStatus);
      } else {
        res.status(404).json({ message: 'Driver status not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createDriverStatus(req: Request, res: Response): Promise<void> {
    try {
      const newDriverStatus: IDriverStatus = req.body;
      const createdDriverStatus: IDriverStatus = await DutyStatusModel.create(newDriverStatus);
      res.status(201).json(createdDriverStatus);
    } catch (error) {
      console.error(error);
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ error: validationErrors });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async updateDriverStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedDriverStatus: IDriverStatus | null = await DutyStatusModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

      if (updatedDriverStatus) {
        res.status(200).json(updatedDriverStatus);
      } else {
        res.status(404).json({ message: 'Driver status not found' });
      }
    } catch (error) {
      console.error(error);
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ error: validationErrors });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async deleteDriverStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedDriverStatus: IDriverStatus | null = await DutyStatusModel.findByIdAndDelete(id);
      if (deletedDriverStatus) {
        res.status(200).json(deletedDriverStatus);
      } else {
        res.status(404).json({ message: 'Driver status not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new DriverStatusController();
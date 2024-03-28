import { Request, Response } from 'express';
import MaintenanceModel, {ServiceLog}  from './serviceLogs.models';

class MaintenanceController {
 //.................................................................................
  async create(req: Request, res: Response): Promise<void> {
    try {
      const maintenanceData: ServiceLog = req.body;
      const newMaintenanceRecord = new MaintenanceModel(maintenanceData);
      const savedRecord = await newMaintenanceRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      console.error('Error creating maintenance record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

//......................................................................................
  async readAll(req: Request, res: Response): Promise<void> {
    try {
      const maintenanceRecords = await MaintenanceModel.find();
      res.json(maintenanceRecords);
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //.....................................................................................
  async readById(req: Request, res: Response): Promise<void> {
    try {
      const maintenanceId = req.params.id;
      const maintenanceRecord = await MaintenanceModel.findById(maintenanceId);
      if (maintenanceRecord) {
        res.json(maintenanceRecord);
      } else {
        res.status(404).json({ error: 'Maintenance record not found' });
      }
    } catch (error) {
      console.error('Error fetching maintenance record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

//.......................................................................................
  async update(req: Request, res: Response): Promise<void> {
    try {
      const maintenanceId = req.params.id;
      const updatedData:ServiceLog = req.body;
      const updatedRecord = await MaintenanceModel.findByIdAndUpdate(maintenanceId, updatedData, {
        new: true,
      });
      if (updatedRecord) {
        res.json(updatedRecord);
      } else {
        res.status(404).json({ error: 'Maintenance record not found' });
      }
    } catch (error) {
      console.error('Error updating maintenance record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

//.....................................................................................
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const maintenanceId = req.params.id;
      const deletedRecord = await MaintenanceModel.findByIdAndDelete(maintenanceId);
      if (deletedRecord) {
        res.json(deletedRecord);
      } else {
        res.status(404).json({ error: 'Maintenance record not found' });
      }
    } catch (error) {
      console.error('Error deleting maintenance record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new MaintenanceController();

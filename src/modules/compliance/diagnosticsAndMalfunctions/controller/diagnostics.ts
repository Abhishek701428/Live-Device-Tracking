import { Request, Response } from 'express';
import DiagnosticsAndMalfunctions, { DiagnosticsAndMalfunctionsInterface } from '../models/diagnostics';

class DiagnosticsAndMalfunctionController {
    async create(req: Request, res: Response) {
        try {
          const newDiagnosticsAndMalfunction = new DiagnosticsAndMalfunctions(req.body);
          const savedDiagnosticsAndMalfunction = await newDiagnosticsAndMalfunction.save();
          res.status(201).json(savedDiagnosticsAndMalfunction);
        } catch (error) {
          if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((err: any) => err.message);
            res.status(400).json({ error: 'Bad Request', validationErrors });
          } else {
            res.status(400).json({ error: 'Bad Request' });
          }
        }
      }

  async getAll(req: Request, res: Response) {
    try {
      const diagnosticsAndMalfunctions = await DiagnosticsAndMalfunctions.find();
      res.json(diagnosticsAndMalfunctions);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
   async update(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const updatedDiagnosticsAndMalfunction = await DiagnosticsAndMalfunctions.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedDiagnosticsAndMalfunction) {
        return res.status(404).json({ error: 'Diagnostics and Malfunction not found' });
      }
      res.json(updatedDiagnosticsAndMalfunction);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedDiagnosticsAndMalfunction = await DiagnosticsAndMalfunctions.findByIdAndDelete(id);
      if (!deletedDiagnosticsAndMalfunction) {
        return res.status(404).json({ error: 'Diagnostics and Malfunction not found' });
      }
      res.json({ message: 'Diagnostics and Malfunction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  async getByStatus(req: Request, res: Response) {
    const { status } = req.query;
    try {
      const diagnosticsAndMalfunctions = await DiagnosticsAndMalfunctions.find({ status });
      res.json(diagnosticsAndMalfunctions);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default new DiagnosticsAndMalfunctionController();
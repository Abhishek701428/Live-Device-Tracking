import { Request, Response } from 'express';
import Violation, { IViolation } from '../models/violation.models';

// Create a new violation
export const createViolation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { driver, violationTime, days } = req.body;
    const violation: IViolation = new Violation({
      driver,
      violationTime,
      days
    });
    const newViolation: IViolation = await violation.save();
    res.status(201).json(newViolation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all violations
export const getAllViolations = async (req: Request, res: Response): Promise<void> => {
  try {
    const violations: IViolation[] = await Violation.find();
    res.status(200).json(violations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single violation by ID
export const getViolationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const violation: IViolation | null = await Violation.findById(req.params.id);
    if (!violation) {
      res.status(404).json({ message: 'Violation not found' });
      return;
    }
    res.status(200).json(violation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a violation by ID
export const updateViolationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedViolation: IViolation | null = await Violation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedViolation) {
      res.status(404).json({ message: 'Violation not found' });
      return;
    }
    res.status(200).json(updatedViolation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a violation by ID
export const deleteViolationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedViolation: IViolation | null = await Violation.findByIdAndDelete(req.params.id);
    if (!deletedViolation) {
      res.status(404).json({ message: 'Violation not found' });
      return;
    }
    res.status(200).json(deletedViolation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

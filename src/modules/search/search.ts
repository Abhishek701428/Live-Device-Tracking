import { Router, Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';

export const searchLogic = async (req: Request, res: Response) => {
    try {
        const collectionName = req.query.collection as string;
        const searchTerm = req.query.q as string;

        // Validation: Ensure collection name and search term are provided
        if (!collectionName || !searchTerm) {
            return res.status(400).json({ error: 'Collection name and search term are required' });
        }

        // Validation: Check if the collection exists in the database
        if (!mongoose.modelNames().includes(collectionName)) {
            return res.status(400).json({ error: 'Collection not found' });
        }

        // Get the Mongoose model corresponding to the collection name
        const Model = mongoose.model<Document>(collectionName);

        // Search in the specified collection
        const result = await Model.find({ name: { $regex: new RegExp(searchTerm, "i") } });

        res.json(result);
    } catch (err) {
        console.error('Error searching items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

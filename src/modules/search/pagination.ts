import { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';

// Get specific page of posts along with user data
export const pagination = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Page and limit parameters must be positive integers' });
        }

        const startIndex = (page - 1) * limit;

        const collectionName = req.params.collectionName;

        if (!collectionName) {
            return res.status(400).json({ message: 'Collection name is required' });
        }

        if (!mongoose.modelNames().includes(collectionName)) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        const Model = mongoose.model<Document>(collectionName);

        const results = await Model.aggregate([
            { $skip: startIndex },
            { $limit: limit }
        ]);

        res.json(results);
    } catch (error) {
        console.error('Error fetching paginated data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

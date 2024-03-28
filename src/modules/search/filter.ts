// controllers/filterData.ts
import { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';

export const filterData = async (req: Request, res: Response) => {
    try {
        const { collection, field } = req.query;

        // Validation: Ensure collection and field parameters are provided
        if (!collection || !field) {
            return res.status(400).json({ error: 'Collection name and filter field are required' });
        }

        // Validation: Ensure the provided collection name is a valid model
        if (!mongoose.modelNames().includes(collection.toString())) {
            return res.status(400).json({ error: 'Collection not found' });
        }

        // Validation: Ensure field exists in the model schema
        const Model = mongoose.model<Document>(collection);
        const schema = Model.schema;
        if (!schema.paths[field.toString()]) {
            return res.status(400).json({ error: 'Field not found in the collection schema' });
        }

        // Construct the filter object
        const filterObject = { [field as string]: req.query[field] };

        // Find documents based on filter criteria
        const result = await Model.find(filterObject);

        res.json(result);
    } catch (err) {
        console.error('Error filtering items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

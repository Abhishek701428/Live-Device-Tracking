import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import Device from '../models/deviceModal';

dotenv.config();
const flespiToken = process.env.FLESPI_TOKEN;
const flespiApiUrl = 'https://flespi.io/gw/devices/all';

let existingDeviceIds: Set<number> = new Set();

async function updateExistingDeviceIds() {
    const existingDevices = await Device.find({}, { id: 1 }); 
    existingDeviceIds = new Set(existingDevices.map(device => device.id));
}

updateExistingDeviceIds();

export const getAllDevices = async (req: Request, res: Response) => {
    try {
        const currentUser = (req as any).user;

        if (!currentUser) {
            return res.status(401).json({ error: 'User not authenticated.' });
        }

        const response = await axios.get(flespiApiUrl, {
            headers: {
                Authorization: `FlespiToken ${flespiToken}`,
            },
        });

        const userDevices = response.data.result.filter(device => {
            return currentUser.devicesId.includes(device.id);
        });

        const newDevices = userDevices.filter(device => {
            return !existingDeviceIds.has(device.id); 
        });

        if (newDevices.length > 0) {
            await Device.insertMany(newDevices);
            await updateExistingDeviceIds();
        }
        res.json(userDevices);
    } catch (error: any) {
        console.error('Error fetching devices:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
    }
};

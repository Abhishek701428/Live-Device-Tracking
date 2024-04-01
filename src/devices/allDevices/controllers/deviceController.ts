import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import DeviceSaved, { DeviceSaved as DeviceSavedInterface } from '../models/deviceModal';

dotenv.config();
const flespiToken = process.env.FLESPI_TOKEN;
const flespiApiUrl = 'https://flespi.io/gw/devices/all';

let existingDeviceIds: Set<number> = new Set();

async function updateExistingDeviceIds() {
    try {
        const existingDevices = await DeviceSaved.find({}, { id: 1 });
        existingDeviceIds = new Set(existingDevices.map(device => device.id));
    } catch (error) {
        console.error('Error updating existing device IDs:', error.message);
    }
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
            await DeviceSaved.insertMany(newDevices);
            await updateExistingDeviceIds();
        }
        res.json(userDevices);
    } catch (error: any) {
        console.error('Error fetching devices:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
    }
};

export const createDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        const existingDevice: DeviceSavedInterface | null = await DeviceSaved.findOne({ id });
        if (existingDevice) {
            return res.status(409).json({ message: 'Device with the given ID already exists' });
        }
        const newDevice: DeviceSavedInterface = new DeviceSaved(req.body);
        const savedDevice: DeviceSavedInterface = await newDevice.save();
        res.status(201).json(savedDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllDevicesSeved = async (_req: Request, res: Response): Promise<void> => {
    try {
        const devices: DeviceSavedInterface[] = await DeviceSaved.find();
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedDevice: DeviceSavedInterface | null = await DeviceSaved.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDevice) {
            res.status(404).json({ message: 'Device not found' });
            return;
        }
        res.status(200).json(updatedDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDevice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedDevice: DeviceSavedInterface | null = await DeviceSaved.findByIdAndDelete(id);
        if (!deletedDevice) {
            res.status(404).json({ message: 'Device not found' });
            return;
        }
        res.status(200).json(deletedDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

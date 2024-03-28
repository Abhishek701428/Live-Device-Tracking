import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const flespiToken = process.env.FLESPI_TOKEN;

const flespiApiUrl = 'https://flespi.io/gw/devices/';

export const getSpecificById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deviceId = req.params.id;
    const response = await axios.get(`${flespiApiUrl}${deviceId}`, {
      headers: {
        Authorization: `FlespiToken ${flespiToken}`,
      },
    });

    const specificData = response.data;
    res.json(specificData);
  } catch (error:any) {
    console.error('Error fetching specific data:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
  }
};
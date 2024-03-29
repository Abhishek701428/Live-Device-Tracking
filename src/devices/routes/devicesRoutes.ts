import express, { Request, Response } from 'express';
import { getAllDevices } from '../allDevices/controllers/deviceController';
import { getSpecificById } from '../allDevices/controllers/getSpecificDevicebyId';
import Subscription from '../webSocketServer/models/subscriptionModel';
const router = express.Router();
import { authenticateJWT } from '../../middleware/deviceMiddleware';

router.get('/devices', authenticateJWT, getAllDevices);
router.get('/devices/specificData/:id', getSpecificById);
router.get('/last-data', authenticateJWT, async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) { 
      return res.status(401).json({ error: 'Authentication failed: User not found.' });
    }
    const userDevices = (req as any).user.devicesId; 
    const allDevicesLastData = await Promise.all(userDevices.map(async (deviceId: string) => {
      try {
        const lastData = await Subscription.findOne({ deviceId }).sort({ nowTime: -1 }).limit(1);
        return lastData;
      } catch (error) {
        console.error(Error fetching last data for device ${deviceId}:, error);
        return null;
      }
    }));
    const filteredData = allDevicesLastData.filter(data => data !== null && data !== undefined);

    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching last data for user devices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

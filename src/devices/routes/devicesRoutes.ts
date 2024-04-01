import express, { Request, Response } from 'express';
const router = express.Router();
import * as Device from '../allDevices/controllers/deviceController';
import { getSpecificById } from '../allDevices/controllers/getSpecificDevicebyId';
import Subscription from '../webSocketServer/models/subscriptionModel';
import { authenticateJWT } from '../../middleware/deviceMiddleware';

// router.post('/devices/savedDevices', createDevice); 
router.get('/devices', authenticateJWT,Device. getAllDevices);
router.get('/devices/specificData/:id', getSpecificById);
router.post('/devices/savedDevices',Device.createDevice);
router.get('/devices/getAll',Device.getAllDevicesSeved);
router.put('/devices/update/:id',Device.updateDevice);
router.delete('/devices/delete/:id',Device.deleteDevice);
router.get('/last-data', authenticateJWT, async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      return res.status(401).json({ error: 'Authentication failed: User not found.' });
    }
    const user = (req as any).user;
    const userDevices = user.devicesId;
    const allDevicesLastData = await Promise.all(userDevices.map(async deviceId => {
      const lastData = await Subscription.aggregate([{ $match: { deviceId: deviceId } }, { $sort: { nowTime: -1 } }, { $limit: 1 }]);
      return lastData[0];
    }));
    res.json(allDevicesLastData.filter(data => data));
  } catch (error) {
    console.error('Error fetching last data for user devices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

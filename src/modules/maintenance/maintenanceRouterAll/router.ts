import express from 'express';
import MaintenanceController from '../serviceLog/serviceLogs.controller';
import { authenticateSuperAdminAndAdmin } from '../../../middleware/authMiddleware';
const router = express.Router();
 

// serviceLog
router.post('/create/serviceLog',authenticateSuperAdminAndAdmin, MaintenanceController.create);

router.get('/getAll/serviceLog', MaintenanceController.readAll);

router.get('/getById/serviceLog/:id',authenticateSuperAdminAndAdmin, MaintenanceController.readById);

router.put('/update/serviceLog/:id',authenticateSuperAdminAndAdmin, MaintenanceController.update);

router.delete('/delete/serviceLog/:id',authenticateSuperAdminAndAdmin,  MaintenanceController.delete);

export default router;

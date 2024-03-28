
import express from 'express';
import * as violatonsController from '../HOSvoiltation/controller/violation.controller';
import * as unassigned_hocController from '../unassignedHOS/controller/unassignedHOSReport.controller';
import DiagnosticsAndMalfunctionController from '../diagnosticsAndMalfunctions/controller/diagnostics';
import * as unassignedController from '../unassignedHOS/controller/unassignedHOSReport5120';
import driverStatusController from '../dutyStatusSummary/dutyStatus.controller';
import * as hoursOfServicsController from '../driversHOS/HoursOfServiceReport.controller';
import * as DriverHoursController from '../drivesHosEdit/DriverHoursOfServiceAuditReport.controller';
import { authenticateSuperAdminAndAdmin } from '../../../middleware/authMiddleware';
const router = express.Router();

//DriverHoursOfService Report 

router.post('/DriverHoursOfService/create',authenticateSuperAdminAndAdmin, DriverHoursController.createDriver);
router.get('/DriverHoursOfService/getAll', DriverHoursController.getAllDrivers);
router.get('/DriverHoursOfService/search',authenticateSuperAdminAndAdmin, DriverHoursController.getUserByIdDrivers);

router.put('/DriverHoursOfService/update/:id',authenticateSuperAdminAndAdmin, DriverHoursController.updateUserByIdDrivers);
router.delete('/DriverHoursOfService/delete/:id',authenticateSuperAdminAndAdmin, DriverHoursController.deleteUserByIdDrivers);


//Unassigned Page All Router

router.post('/unassigned/create',authenticateSuperAdminAndAdmin,unassignedController.createTrip);

router.get('/unassigned/getAll',unassignedController.getTrips);
router.put('/unassigned/update/:id', authenticateSuperAdminAndAdmin,unassignedController.updateTrip);
router.delete('/unassigned/delete/:id', authenticateSuperAdminAndAdmin,unassignedController.deleteTrip);

//unassigned_hoc Page All Router
router.post('/unassigned_hoc/create',authenticateSuperAdminAndAdmin,unassigned_hocController.createVehicle_hoc);

router.get('/unassigned_hoc/getAll',unassigned_hocController.getVehicles_hoc);
router.put('/unassigned_hoc/update/:id', authenticateSuperAdminAndAdmin,unassigned_hocController.updateVehicle_hoc);
router.delete('/unassigned_hoc/delete/:id', authenticateSuperAdminAndAdmin,unassigned_hocController.deleteVehicle_hoc);

//dutyStatusSummaryReport and Hours Of Service Report both are same data
router.post('/dutyStatus/create',authenticateSuperAdminAndAdmin, driverStatusController.createDriverStatus);
router.get('/dutyStatus/getAll', driverStatusController.getDriverStatus);
router.get('/dutyStatus/readById/:id',authenticateSuperAdminAndAdmin, driverStatusController.getDriverStatusById);
router.put('/dutyStatus/update/:id',authenticateSuperAdminAndAdmin, driverStatusController.updateDriverStatus);
router.delete('/dutyStatus/delete/:id',authenticateSuperAdminAndAdmin, driverStatusController.deleteDriverStatus);

//violatons Routes and MISSING CERTIFICATIONS both are same 

router.post('/violatons/create',authenticateSuperAdminAndAdmin, violatonsController.createViolation);
router.get('/violatons/getAll', violatonsController.getAllViolations);
router.put('/violatons/update/:id',authenticateSuperAdminAndAdmin, violatonsController.updateViolationById);
router.delete('/violatons/delete/:id',authenticateSuperAdminAndAdmin, violatonsController.deleteViolationById);


//ALL API diagnosticsAnd malfunctions
router.post('/diagnostics/createAll',authenticateSuperAdminAndAdmin, DiagnosticsAndMalfunctionController.create);
router.get('/diagnostics/getAll', DiagnosticsAndMalfunctionController.getAll);
router.put('/diagnostics/updateAll/:id',authenticateSuperAdminAndAdmin, DiagnosticsAndMalfunctionController.update);
router.delete('/diagnostics/deleteAll/:id',authenticateSuperAdminAndAdmin, DiagnosticsAndMalfunctionController.delete);


//Resolved API diagnosticsAnd malfunctions
router.get('/diagnostics/getStatusResolved/:id',DiagnosticsAndMalfunctionController.getByStatus);

//Active API diagnosticsAnd malfunctions


export default router;
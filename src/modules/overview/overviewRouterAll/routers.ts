
import express from 'express';
import * as driverController from '../drievers/drivers.controller';
import { UserController } from '../environment/controller/Environment.controller'; 
import * as vehiclesController from '../Assets/controller/vehicles.controller';
import * as trailersController from '../Assets/controller/trailers.controller';
import { authenticateSuperAdminAndAdmin } from '../../../middleware/authMiddleware';
const router = express.Router();


//Drivers
router.post('/create/DriversStatus',authenticateSuperAdminAndAdmin, driverController.createDriver);
router.get('/getAll/DriversStatus', driverController.getAllDrivers);
router.get('/search/DriversStatus',authenticateSuperAdminAndAdmin, driverController.searchDrivers);

router.put('/update/DriversStatus/:id',authenticateSuperAdminAndAdmin, driverController.updateDriver);
router.delete('/delete/DriversStatus/:id',authenticateSuperAdminAndAdmin, driverController.deleteDriver);

//environment Routes
router.post('/environment/create',authenticateSuperAdminAndAdmin, UserController.createUser);
router.get('/environment/all', UserController.getAllUsers);
router.get('/environment/filter',authenticateSuperAdminAndAdmin, UserController.filterEnvironments);

router.put('/environment/update/:userId',authenticateSuperAdminAndAdmin, UserController.updateUser);
router.delete('/environment/delete/:userId',authenticateSuperAdminAndAdmin, UserController.deleteUser);


//vihicles Routes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
router.post('/create/vihicles',authenticateSuperAdminAndAdmin,vehiclesController.createVehicle);
router.get('/getAll/vihicles', vehiclesController.getAllVehicles);
router.get('/get/vehiclesSearch/:name', vehiclesController.getVehicleByName);
router.put('/update/vihicles/:id',authenticateSuperAdminAndAdmin, vehiclesController.updateVehicleById);
router.delete('/delete/vihicles/:id',authenticateSuperAdminAndAdmin, vehiclesController.deleteVehicleById);

//trailers routes 
router.post('/create/trailers',authenticateSuperAdminAndAdmin, trailersController.createTrailer);
router.get('/getAll/trailers', trailersController.getAllTrailers);
router.put('/update/trailers/:id',authenticateSuperAdminAndAdmin, trailersController.updateTrailerById);
router.delete('/delete/trailers/:id',authenticateSuperAdminAndAdmin, trailersController.deleteTrailerById);



export default router;
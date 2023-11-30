import express from 'express';
import * as dataController from '../controllers/dataController.js';
import { verifyToken } from './middlewares/authenMiddlewares.js';

const router = express();

/**
 * @swagger
 * tags:
 *   name: IOT_Data
 *   description: SmartHome devices's data
 * */

/**
 * @openapi
 *  /api/data/currentTemperature:

 *  
 * */
router.get('/lastFan', dataController.lastFan);
router.get('/lastLed', dataController.lastLed);
router.post('/setFan', dataController.setFan);
router.post('/toggleLed', dataController.toggleLed);

export default router;

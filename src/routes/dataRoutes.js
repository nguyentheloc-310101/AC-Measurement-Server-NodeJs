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
router.get('/dataFan', dataController.dataFan);
router.get('/dataLed', dataController.dataLed);
router.post('/setFan', dataController.setFan);
router.post('/toggleLed', dataController.toggleLed);
router.get('/dataTemp', dataController.dataTemp);
router.get('/dataHumidity', dataController.dataHumid);

export default router;

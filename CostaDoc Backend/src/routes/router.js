import express from 'express';
import * as registerController from '../controllers/registerController.js';

const router = express.Router();

router.post('/registerCustomer', registerController.registerCustomer);
router.post('/registerProperty', registerController.registerProperty);

export default router;
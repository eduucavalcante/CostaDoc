import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.authenticateUser);
router.post('/signup', userController.createAccount);

export default router;
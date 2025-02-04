import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-up', userController.signUp);


export default router;
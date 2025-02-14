import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.get('/user', userController.getUser);


export default router;
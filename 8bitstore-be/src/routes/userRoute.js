import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.get('/user', authMiddleware, userController.getUser);


export default router;
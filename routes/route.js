import {Router} from 'express';
import { registerController , loginController , refreshController , logoutController , profileController} from '../controllers/userController.js';

export const router = new Router();

router.post('/register', registerController);
router.post('/login' , loginController);
router.post('/refreshtoken' , refreshController);
router.post('/logout' , logoutController);
router.post('/profile' , profileController);
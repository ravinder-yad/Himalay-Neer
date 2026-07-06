import express from 'express';
import { register, login, forgotPassword, updateProfile, updatePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/profile', protect, upload.single('profileImage'), updateProfile);
router.put('/password', protect, updatePassword);

export default router;

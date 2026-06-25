import express from 'express';
import { requestReset, verifyToken, resetPassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/request', requestReset);
router.get('/verify', verifyToken);
router.post('/reset', resetPassword);

export default router;
import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { create, list } from '../controllers/settlementController.js';

const router = express.Router();

router.post('/', authenticateToken, create);
router.get('/', authenticateToken, list);

export default router;
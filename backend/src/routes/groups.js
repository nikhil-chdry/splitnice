import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { create, list, getById } from '../controllers/groupController.js';

const router = express.Router();

router.post('/', authenticateToken, create);
router.get('/', authenticateToken, list);
router.get('/:id', authenticateToken, getById);

export default router;
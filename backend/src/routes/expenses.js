import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { create, list, getById, update, deleteExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', authenticateToken, create);
router.get('/', authenticateToken, list);
router.get('/:id', authenticateToken, getById);
router.put('/:id', authenticateToken, update);
router.delete('/:id', authenticateToken, deleteExpense);

export default router;
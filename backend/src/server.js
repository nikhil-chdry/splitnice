import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import groupRoutes from './routes/groups.js';
import expenseRoutes from './routes/expenses.js';
import settlementRoutes from './routes/settlements.js';
import passwordRoutes from './routes/password.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/settlements', settlementRoutes);
app.use('/api/password', passwordRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Splitnice API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
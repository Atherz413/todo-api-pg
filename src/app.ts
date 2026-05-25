import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todos';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/todos', todoRoutes);

export default app;
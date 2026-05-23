import { Request, Response } from 'express';
import db from '../db';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await db.query('SELECT * FROM todos ORDER BY id ASC');
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: 'title is required' });
    return;
  }
  try {
    const result = await db.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.status(201).json({ data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const { done } = req.body;
  try {
    const result = await db.query(
      'UPDATE todos SET done = $1 WHERE id = $2 RETURNING *',
      [done, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.json({ data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  try {
    const result = await db.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
import { Router } from 'express';
import * as todosController from '../controllers/todos.controller';

const router = Router();

router.get('/', todosController.getAllTodos);
router.post('/', todosController.createTodo);
router.patch('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);

export default router;
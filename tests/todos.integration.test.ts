import request from 'supertest';
import app from '../src/app';
import db from '../src/db';

afterAll(async () => {
  await db.end();
});

beforeEach(async () => {
  await db.query('DELETE FROM todos');
});

describe('POST /todos', () => {
  it('should create a todo and return 201', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Buy milk' });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('Buy milk');
    expect(res.body.data.id).toBeDefined();
  });

  it('should return 400 if title is empty', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /todos', () => {
  it('should return all todos', async () => {
    await db.query("INSERT INTO todos (title) VALUES ('Task A'), ('Task B')");

    const res = await request(app).get('/todos');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it('should return empty array if no todos', async () => {
    const res = await request(app).get('/todos');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });
});

describe('PATCH /todos/:id', () => {
  it('should mark todo as done', async () => {
    const insert = await db.query(
      "INSERT INTO todos (title) VALUES ('Fix bug') RETURNING id"
    );
    const id = insert.rows[0].id;

    const res = await request(app)
      .patch(`/todos/${id}`)
      .send({ done: true });

    expect(res.status).toBe(200);
    expect(res.body.data.done).toBe(true);
  });

  it('should return 404 if todo not found', async () => {
    const res = await request(app)
      .patch('/todos/99999')
      .send({ done: true });

    expect(res.status).toBe(404);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo and return 204', async () => {
    const insert = await db.query(
      "INSERT INTO todos (title) VALUES ('To delete') RETURNING id"
    );
    const id = insert.rows[0].id;

    const res = await request(app).delete(`/todos/${id}`);

    expect(res.status).toBe(204);
  });

  it('should return 404 if todo not found', async () => {
    const res = await request(app).delete('/todos/99999');

    expect(res.status).toBe(404);
  });
});
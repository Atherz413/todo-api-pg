// สร้าง mock แทน db module ทั้งอัน
jest.mock('../src/db', () => ({
  query: jest.fn(),
}));

import * as db from '../src/db';

describe('getTodo logic', () => {
  it('should return todo when found', async () => {
    // บอก mock ว่า "ถ้าถูกเรียก ให้คืนค่านี้"
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: 1, title: 'Buy milk', done: false }],
    });

    const result = await db.query('SELECT * FROM todos WHERE id = $1', [1]);
    
    expect(result.rows[0]).toEqual({ id: 1, title: 'Buy milk', done: false });
    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM todos WHERE id = $1',
      [1]
    );
  });

  it('should return empty when not found', async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

    const result = await db.query('SELECT * FROM todos WHERE id = $1', [999]);
    
    expect(result.rows).toHaveLength(0);
  });
});
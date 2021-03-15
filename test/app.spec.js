import supertest from 'supertest';
import app from '../src/app.js';

const request = supertest(app);

describe('Checking Status route in app.js', () => {
  it('Checking if response is okay', async () => {
    const res = await request.get('/status');
    expect(res.statusCode).toEqual(200);
  });
});

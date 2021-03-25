import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import config from '../src/config/index.js';

const request = supertest(app);

beforeAll((done) => {
  mongoose.connect(config.DATABASE_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, () => done());
});

afterAll((done) => {
  mongoose.connection.close(() => done());
});

describe('Checking Status route in app.js', () => {
  test('Checking if response is okay', async (done) => {
    const res = await request.get('/status');
    expect(res.status).toEqual(200);
    done();
  });
});

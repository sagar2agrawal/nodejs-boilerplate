import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import config from '../src/config/index.js';

const request = supertest(app);

beforeEach((done) => {
  mongoose.connect(config.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, () => done());
});

afterEach((done) => {
  mongoose.connection.close(() => done());
});

describe('Checking Status route in app.js', () => {
  test('Checking if response is okay', async () => {
    const res = await request.get('/status');
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async (done) => {
    done();
  });
});

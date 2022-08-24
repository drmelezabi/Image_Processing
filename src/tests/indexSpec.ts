import request from 'supertest';
import app from '../index';
import fs from 'fs/promises';
import path from 'path';
import sizeOf from 'image-size';
import { Stats } from 'fs';
import middleware from '../middlewares/index'

describe('server stats', () => {
  it('GET / with 200' , async () => {
    const result = await request(app).get('/');
    expect(result.status).toBe(200);
  });
});

describe('GET /convert', () => {
  it('responds with 400 if fetch without parameters', async () => {
    const result = await request(app).get('/convert');
    expect(result.status).toBe(400);
  });
  it('responds with 400 if fetch with a missing parameter', async () => {
    const result = await request(app).get('/convert?filename=ooo&height=100');
    expect(result.status).toBe(400);
  });
  it('responds with 404 if fetch correctly but image does not exist', async () => {
    const result = await request(app).get('/convert?filename=NoImg&height=100&width=100');
    expect(result.status).toBe(404);
  });
  it('responds with 200 if fetch correctly and image exist', async () => {
    const result = await request(app).get('/convert?filename=ooo&height=100&width=100');
    expect(result.status).toBe(200);
  });
  it('responds with 200 if fetch correctly and image is new', async () => {
    const result = await request(app).get('/convert?filename=ooo&height=150&width=150');
    expect(result.status).toBe(200);
  });

  
});

describe('image processing', () => {
  it('created a thumb version of the image', (done): void => {
    request(app)
        .get('/convert?filename=fjord&height=100&width=100')
        .then(() => {
            fs.stat(path.resolve(path.join(path.resolve('./'), 'thumbnail', `fjord_100x100.jpg`)))
            .then((fileStat: Stats) =>
                expect(fileStat).not.toBeNull(),
            );
            done();
        });
  });
  
  it('created a thumb version of the image with the correct height and width', (done): void => {
    request(app)
        .get('/convert?filename=fjord&height=100&width=150')
        .then(() => {
            const dimensions = sizeOf(path.resolve(path.join(path.resolve('./'), 'thumbnail','fjord_150x100.jpg')));
            expect(dimensions.height).toEqual(100);
            expect(dimensions.width).toEqual(150);
            done();
        });
  });
});

describe('Import the function and perform testing', () => {
it('Test create thumbnail dirctly using the function', (done): void => {
  middleware("fjord",250,250)
      .then(() => {
          fs.stat(path.resolve(path.join(path.resolve('./'), 'thumbnail', `fjord_250x250.jpg`)))
          .then((fileStat: Stats) =>
              expect(fileStat).not.toBeNull(),
          );
          done();
      });
  });
});
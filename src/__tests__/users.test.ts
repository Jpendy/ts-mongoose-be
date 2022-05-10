import request from 'supertest';
import app from '../lib/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import connect from '../lib/utils/connect';

describe('user tests', () => {
    let mongod: any;
    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        return connect(uri);
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(async () => {
        await mongod.stop()
        return mongoose.disconnect();
    })

    it('it inserts a user', () => {
        return request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'test'
            })
            .then((res) => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    email: 'test@test.com',
                })
            })
    })

})
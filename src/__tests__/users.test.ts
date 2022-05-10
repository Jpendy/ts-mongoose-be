import request from 'supertest';
import setupDB from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';

describe('user tests', () => {

    beforeEach(() => {
        return setupDB();
    });

    afterAll(() => {
        pool.end()
    })

    it('it inserts a user', () => {
        return request(app)
            .post('/api/v1/users/signup')
            .send({
                email: 'test@test.com',
                password: 'test'
            })
            .then(res => {
                expect(res.body).toEqual({
                    id: '1',
                    email: 'test@test.com',
                })
            })
    })

})
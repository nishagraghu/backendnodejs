const request = require('supertest');

var app = require('../../src/routes/index');


describe('Authorized route', () => {
    it('should return a 401 status code if user is not authenticated', async () => {
        const response = await request(app)
            .get('/api/authorized')
            .expect(401);
    });




});
describe('UnAuthorized route', () => {
    it('should return a 401 status code if user is not authenticated', async () => {
        const response = await request(app)
            .get('/auth')
            .expect(401);
    });




});  
const request = require('supertest');

var app = require('../../src/routes/index');

const { expect } = require('chai');



describe('Authorized route', () => {
    it('should return a 401 status code if user is not authenticated', async () => {
        const response = await request(app)
            .get('/api/authorized')
            .expect(401);
    });




});
describe('UnAuthorized route', () => {
    it('should return a 404 status code if user is not authenticated', async () => {
        const response = await request(app)
            .get('/auth')
            .expect(404);
    });
    it('should return msg Sorry, that route doesnt exist', async () => {
        const response = await request(app).get('/auth').expect(404);
        expect(response.body.error).to.equal('Sorry, that route doesn\'t exist');
        
    }
    );




});  
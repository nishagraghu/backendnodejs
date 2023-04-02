// write list controller test here
const app = require('../../src/routes/index');
const request = require('supertest');

const sinon = require('sinon');
const sequelize = require('../../src/models');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { expect } = chai;

require('dotenv').config();
const { TEST_TOKEN } = process.env;


describe('List controller', () => {




    it('should return 200 status code if user is authenticated', async () => {

        const response = await request(app)
            .get('/api/brants')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN);

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('value');

    });
    it('should return 200 status for modeinfo ', async () => {

        const response = await request(app)
            .get('/api/modeinfo/3')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN);

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('value');
    });

    it('should return 200 status for modeinfo ', async () => {

        const response = await request(app)
            .get('/api/yearofmake/2')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN);

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('value');
    });
    it('should return 200 status for modeinfo ', async () => {

        const response = await request(app)
            .get('/api/variants/2')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN);

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('value');
    });
   


});

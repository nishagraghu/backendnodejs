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


describe('Search controller', () => {




    it('should return 200 status code if user is authenticated', async () => {

        const response = await request(app)
            .get('/api/partsinfo')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN);

        expect(response.body.rows).to.be.an('array');
        expect(response.body.rows[0]).to.have.property('id');
        expect(response.body.rows[0]).to.have.property('partnumber');
        expect(response.body.rows[0]).to.have.property('partname');
        expect(response.body.rows[0]).to.have.property('partdiscription');
        expect(response.body.rows[0]).to.have.property('partprice');
        expect(response.body.rows[0]).to.have.property('partimage');
        expect(response.body.rows[0]).to.have.property('variant_id');


    });
    it('should return 200 status code if user is authenticated with based on variant_id', async () => {

        const response = await request(app)
            .get('/api/partsinfo/3')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN);

        expect(response.body.rows).to.be.an('array');
        expect(response.body.rows[0]).to.have.property('id');
        expect(response.body.rows[0]).to.have.property('partnumber');
        expect(response.body.rows[0]).to.have.property('partname');
        expect(response.body.rows[0]).to.have.property('partdiscription');
        expect(response.body.rows[0]).to.have.property('partprice');
        expect(response.body.rows[0]).to.have.property('partimage');
        expect(response.body.rows[0]).to.have.property('variant_id');


    });
    it('should return 200 status code if user is authenticated with based on partsinfobymodel', async () => {

        const response = await request(app)
            .get('/api/partsinfobymodel/2')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN);

        expect(response.body.rows).to.be.an('array');
        expect(response.body.rows[0]).to.have.property('id');
        expect(response.body.rows[0]).to.have.property('partnumber');
        expect(response.body.rows[0]).to.have.property('partname');
        expect(response.body.rows[0]).to.have.property('partdiscription');
        expect(response.body.rows[0]).to.have.property('partprice');
        expect(response.body.rows[0]).to.have.property('partimage');
        expect(response.body.rows[0]).to.have.property('variant_id');


    });
    
   


});
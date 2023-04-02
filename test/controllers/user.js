var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

const app = require('../../src/routes/index');

describe('POST /create', function(){
    it('it responds with 401 status code if bad username or password', function(done) {
        request(app)
            .post('/auth/create')
            .type('json')
            .send('{"mobilenumber":"8867460746"}')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).have.property('msg');
                done();
        });
    });
    it('it responds with 401 status code if bad username or password', function(done) {
        request(app)
            .post('/auth/login')
            .type('json')
            .send('{"mobilenumber":"8867460746", "otp": 689152}')
            .expect(401)
            .end(function(err, res) {
                expect(res.body.error).have.property('msg');

                done();
        });
    });

//     it('it responds with 200 status code if good username or password', function(done) {
//         request(app)
//             .post('/login')
//             .type('json')
//             .send('{"username":"admin","password":"admin"}')
//             .expect(200)
//             .end(function(err, res) {
//                 if (err) return done(err);
//                 done();
//         });
//     });

//     it('it returns JWT token if good username or password', function(done) {
//         request(app)
//             .post('/login')
//             .type('json')
//             .send('{"username":"admin","password":"admin"}')
//             .end(function(err, res) {
//                 if (err) return done(err);

//                 expect(res.body).have.property('jwt');

//                 done();
//         });
//     });
 });

const chai = require('chai');
const expect = require('chai').expect
const chaiHttp = require('chai-http');
const app = require('./../../server.js');
chai.use(chaiHttp);

describe('API', function () {
    describe('info', function () {
        it('should return server info without error', function (done) {
            chai.request(app)
                .get('/api/v1/info')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done()
                });
        });
    });
    // describe('Studenthouse', function () {
    //     describe('#UC-201 - Create studenthouse', function () {
    //         it('should create a studenthouse without error', function (done) {
    //             chai.request(app)
    //                 .get('/')
    //                 .end((err, res) => {
    //                     expect(res).to.have.status(200);
    //                     done()
    //                 });
    //         });
    //     });
    // });
});


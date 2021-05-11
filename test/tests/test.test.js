const app = require('./../../server.js');
const chai = require('chai');
const expect = require('chai').expect
chai.use(require('chai-http'));

const collectedData = {};

describe('API', function () {
    describe('info', function () {
        it('should return server info without error', function (done) {
            chai.request(app)
                .get('/api/info')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done()
                });
        });
    });
    describe('Studenthouse', function () {
        describe('#UC-201- Create studenthouse', function () {
            it('#UC-201-1 should create a studenthouse without error', function (done) {
                chai.request(app)
                    .post('/api/studenthome')
                    .type('form')
                    .send({
                        'name': 'Studenthouse 1',
                        'street': 'Street',
                        'housenumber': 32,
                        'postalcode': '4811AC',
                        'city': 'Breda',
                        'phonenumber': '0622467104'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('id');
                        collectedData.createdHouseId = res.body.id;
                        done()
                    });
            });
        });
        describe('#UC-202- List studenthouses', function () {
            it('#UC-202-1 should list all student houses', function (done) {
                chai.request(app)
                    .get('/api/studenthome')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('houses');
                        collectedData.listHouses = res.body.houses;
                        done()
                    });
            });
        });
        describe('#UC-203- Details of a studenthouse', function () {
            it('#UC-203-1 should list details of a studenthouse', function (done) {
                chai.request(app)
                    .get(`/api/studenthome/${collectedData.createdHouseId}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('house');
                        collectedData.houseDetails = res.body.house;
                        done()
                    });
            });
        });
        describe('#UC-204- Update of a studenthouse', function () {
            it('#UC-204-1 should update a studenthouse', function (done) {
                chai.request(app)
                    .put(`/api/studenthome/${collectedData.createdHouseId}`)
                    .type('form')
                    .send({
                        'name': 'Studenthouse 1',
                        'street': 'Street',
                        'housenumber': 32,
                        'postalcode': '4811AC',
                        'city': 'Breda',
                        'phonenumber': '0622467104'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(202);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('house');
                        collectedData.updatedHouse = res.body.house;
                        done()
                    });
            });
        });
        describe('#UC-205- Delete a studenthouse', function () {
            it('#UC-205-1 should delete a studenthouse', function (done) {
                chai.request(app)
                    .del(`/api/studenthome/${collectedData.createdHouseId}`)
                    .end((err, res) => {
                        expect(res).to.have.status(202);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('id');
                        collectedData.deleteHouse = res.body.id;
                        done()
                    });
            });
        });
    });
});


const app = require('./../../server.js');
const chai = require('chai');
const expect = require('chai').expect
const faker = require('faker/locale/nl');
chai.use(require('chai-http'));

const collectedData = {};
const alsoDelete = true;

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
    describe('#UC-101- Register', function () {
        it('#TC-101-1 should register a user without error', function (done) {
            const register_data = {
                'firstname': faker.name.firstName(undefined),
                'lastname': faker.name.lastName(false),
                'studentnumber': faker.datatype.number(),
                'email_address': faker.internet.email(undefined),
                'password': faker.internet.password()
            };
            chai.request(app)
                .post('/api/register')
                .type('form')
                .send(register_data)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                    expect(res).to.have.property('body').to.have.property('token');
                    collectedData.authToken = res.body.token;
                    collectedData.userId = res.body.user_id;
                    collectedData.registerData = register_data;
                    done()
                });
        });
    });
    describe('User management', function () {
        describe('#UC-101- Register', function () {
            it('#TC-101-1 should register a user', function (done) {
                const register_data = {
                    'firstname': faker.name.firstName(undefined),
                    'lastname': faker.name.lastName(false),
                    'studentnumber': faker.datatype.number(),
                    'email_address': faker.internet.email(undefined),
                    'password': faker.internet.password()
                };
                chai.request(app)
                    .post('/api/register')
                    .type('form')
                    .send(register_data)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('token');
                        collectedData.authToken = res.body.token;
                        collectedData.userId = res.body.user_id;
                        collectedData.registerData = register_data;
                        done()
                    });
            });
        });
    });
    describe('#UC-102- login', function () {
        it('#TC-102-1 should login a user', function (done) {
            chai.request(app)
                .post('/api/login')
                .type('form')
                .send({
                    'email_address': collectedData.registerData.email_address,
                    'password': collectedData.registerData.password
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                    expect(res).to.have.property('body').to.have.property('token');
                    collectedData.authToken = res.body.token;
                    done()
                });
        });
    });
    describe('Studenthouse', function () {
        describe('#UC-201- Create studenthouse', function () {
            it('#TC-201-1 should create a studenthouse', function (done) {
                const house_data = {
                    'name': faker.company.companyName(undefined),
                    'street': faker.address.streetName(false),
                    'housenumber': faker.datatype.number(),
                    'postalcode': faker.address.zipCode(undefined),
                    'city': faker.address.city(),
                    'phonenumber': faker.phone.phoneNumber(undefined)
                };
                chai.request(app)
                    .post('/api/studenthome')
                    .type('form')
                    .set({"Authorization": `Bearer ${collectedData.authToken}`})
                    .send(house_data)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('id');
                        collectedData.createdHouse = house_data;
                        collectedData.createdHouseId = res.body.id;
                        done()
                    });
            });
        });
        describe('#UC-202- List studenthouses', function () {
            it('#TC-202-1 should list all student houses', function (done) {
                chai.request(app)
                    .get('/api/studenthome')
                    .set({"Authorization": `Bearer ${collectedData.authToken}`})
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
            it('#TC-203-1 should list details of a studenthouse', function (done) {
                chai.request(app)
                    .get(`/api/studenthome/${collectedData.createdHouseId}`)
                    .set({"Authorization": `Bearer ${collectedData.authToken}`})
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('house').own.include(collectedData.createdHouse);
                        collectedData.houseDetails = res.body.house;
                        done()
                    });
            });
        });
        describe('#UC-204- Update of a studenthouse', function () {
            it('#TC-204-1 should update a studenthouse', function (done) {
                const house_data = {
                    'name': faker.company.companyName(undefined),
                    'street': faker.address.streetName(false),
                    'housenumber': faker.datatype.number(),
                    'postalcode': faker.address.zipCode(undefined),
                    'city': faker.address.city(),
                    'phonenumber': faker.phone.phoneNumber(undefined)
                };
                chai.request(app)
                    .put(`/api/studenthome/${collectedData.createdHouseId}`)
                    .set({"Authorization": `Bearer ${collectedData.authToken}`})
                    .type('form')
                    .send(house_data)
                    .end((err, res) => {
                        expect(res).to.have.status(202);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('house').own.include(house_data);
                        collectedData.updatedHouse = res.body.house;
                        done()
                    });
            });
        });
        describe('#UC-205- Delete a studenthouse', function () {
            if (alsoDelete) {
                it('#TC-205-1 should delete a studenthouse', function (done) {
                    chai.request(app)
                        .del(`/api/studenthome/${collectedData.createdHouseId}`)
                        .set({"Authorization": `Bearer ${collectedData.authToken}`})
                        .end((err, res) => {
                            expect(res).to.have.status(202);
                            expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                            expect(res).to.have.property('body').to.have.property('id').to.equal(collectedData.createdHouseId);
                            collectedData.deleteHouse = res.body.id;
                            done()
                        });
                });
            }
        });
        describe('#UC-301 Creation of a meal', function () {
            // Create a student house for testing
            it('#TC-201-1 should create a studenthouse', function (done) {
                const house_data = {
                    'name': faker.company.companyName(undefined),
                    'street': faker.address.streetName(false),
                    'housenumber': faker.datatype.number(),
                    'postalcode': faker.address.zipCode(undefined),
                    'city': faker.address.city(),
                    'phonenumber': faker.phone.phoneNumber(undefined)
                };
                chai.request(app)
                    .post('/api/studenthome')
                    .type('form')
                    .set({"Authorization": `Bearer ${collectedData.authToken}`})
                    .send(house_data)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('id');
                        collectedData.createdHouse = house_data;
                        collectedData.createdHouseId = res.body.id;
                        done()
                    });
            });

            it('#TC-301-1 Should create a meal', function (done) {
                const date = faker.date.past(undefined, undefined);
                date.setMilliseconds(0);
                const meal_data = {
                    'name': faker.commerce.productName(),
                    'description': faker.commerce.productDescription(),
                    'price': faker.datatype.number(),
                    'allergies': JSON.stringify([faker.commerce.productMaterial(), faker.commerce.productMaterial()]),
                    'ingredients': JSON.stringify([faker.animal.cow(), faker.animal.horse(), faker.animal.fish(), faker.animal.rabbit()]),
                    'offered_since': date.toISOString()
                };
                chai.request(app)
                    .post(`/api/studenthome/${collectedData.createdHouseId}/meal/`)
                    .set({"Authorization": `Bearer ${collectedData.authToken}`})
                    .type('form')
                    .send(meal_data)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('meal').own.include(meal_data);
                        collectedData.createdMeal = res.body.meal;
                        done()
                    });
            });
        });
        describe('#UC-302 update of a meal', function () {
            it('#TC-302-1 Should update a meal', function (done) {
                const date = faker.date.past(undefined, undefined);
                date.setMilliseconds(0);
                const meal_data = {
                    'name': faker.commerce.productName(),
                    'description': faker.commerce.productDescription(),
                    'price': faker.datatype.number(),
                    'allergies': JSON.stringify([faker.commerce.productMaterial(), faker.commerce.productMaterial()]),
                    'ingredients': JSON.stringify([faker.animal.cow(), faker.animal.horse(), faker.animal.fish(), faker.animal.rabbit()]),
                    'offered_since': date.toISOString()
                };
                chai.request(app)
                    .put(`/api/studenthome/${collectedData.createdHouseId}/meal/${collectedData.createdMeal.id}`)
                    .set({"Authorization": `Bearer ${collectedData.authToken}`})
                    .type('form')
                    .send(meal_data)
                    .end((err, res) => {
                        expect(res).to.have.status(202);
                        expect(res).to.have.property('body').to.have.property('success').to.equal(true);
                        expect(res).to.have.property('body').to.have.property('meal').own.include(meal_data);
                        collectedData.createdMeal = res.body.meal;
                        done()
                    });
            });
        });
    });
});


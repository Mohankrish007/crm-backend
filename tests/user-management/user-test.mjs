// Define test cases
const supertest = require('supertest');
const testApp = require('..//../tests/set-up.js');

let expect;
(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();

describe('/users routes', () => {
    // Test GET /users route
    it('GET /users should return all users', async () => {
        const res = await supertest(testApp).get('/users');
        expect(res.status).to.equal(200);
        // Add more assertions to check the response body
    });

    // Test POST /users route
    it('POST /users should create a new user', async () => {
        // Mock user data for testing
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            roles: ['R1', 'R2'] // Assuming these are ObjectIDs of existing roles
        };

        // Make a POST request to create a new user
        const response = await supertest(testApp)
            .post('/users')
            .send(userData);

        // Assertions
        expect(response.status).to.equal(201); // Expecting status code 201 (Created)
        expect(response.body).to.have.property('id'); // Expecting the response to contain an ID
        expect(response.body.username).to.equal(userData.username); // Expecting username to match
        expect(response.body.email).to.equal(userData.email); // Expecting email to match
        // You can add more assertions based on your application's response format
    });
});

import { request } from '../test-setup.mjs';

describe('GET /actions', () => {
    it('should return all users', function(done) {
        request
            .get('/actions')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.error('Error during request:', err);
                    return done(err); // Pass error to Mocha
                }

                // Add assertions for response body or headers if needed
                // For example:
                // assert(res.body.length > 0, 'Expected users array');

                done(); // Call done to signal completion
            });
    }).timeout(60000); // Increase timeout further if needed
});

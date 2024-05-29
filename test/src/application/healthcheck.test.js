const request = require('supertest');
const app = require('../../../config/app');

describe('GET /healthcheck', () => {
    it('should respond with Healthcheck Response', async () => {
        const response = await request(app).get('/healthcheck').set('Accept', 'application/json)');
        expect(response.statusCode).toBe(200);
        const responseText = JSON.parse(response.text);
        expect(responseText.message).toBe('OK');
        expect(responseText).toHaveProperty('uptime');
        expect(responseText).toHaveProperty('timestamp');
        expect(responseText).toHaveProperty('version');
        expect(responseText).toHaveProperty('memoryUsage');
        expect(responseText).toHaveProperty('os');
        expect(responseText.os).toHaveProperty('type');
        expect(responseText.os).toHaveProperty('platform');
        expect(responseText.os).toHaveProperty('release');
        expect(responseText.os).toHaveProperty('uptime');
        expect(responseText.os).toHaveProperty('loadavg');
        expect(responseText.os).toHaveProperty('totalmem');
        expect(responseText.os).toHaveProperty('freemem');
    });
});

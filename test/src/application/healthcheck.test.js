const request = require('supertest');
const app = require('../../../config/app');
jest.mock('../../../src/infrastructure/repositories/sprockets/sequelize/models/sprocket.model', () => ({
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    bulkCreate: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../../../src/infrastructure/repositories/settings/sequelizeConnection', () => {
    return class SequelizeConnection {
        constructor() {
            this.sequelize = {
                define: jest.fn().mockReturnThis(),
                sync: jest.fn()
            };

        }
    };
});
jest.mock('../../../src/infrastructure/repositories/factories/sequelize/models/factory.model', () => ({
    hasMany: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn()
}));
jest.mock('../../../src/infrastructure/repositories/factories/sequelize/models/chartData.model', () => ({
    findOne: jest.fn()
}));

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

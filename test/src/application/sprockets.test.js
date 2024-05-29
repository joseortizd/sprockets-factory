const request = require('supertest');
const app = require('../../../config/app');

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

jest.mock('../../../src/infrastructure/repositories/sprockets/sequelize/models/sprocket.model', () => ({
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    bulkCreate: jest.fn(),
    update: jest.fn(),
}));
jest.mock('../../../src/infrastructure/repositories/factories/sequelize/models/factory.model', () => ({
    hasMany: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn()
}));
jest.mock('../../../src/infrastructure/repositories/factories/sequelize/models/chartData.model', () => ({
    findOne: jest.fn()
}));

describe('GET /sprocket', () => {
    it('should return a empty sprocket list', async () => {
        const response = await request(app).get('/sprocket').set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
        expect(response.body.pagination).toHaveProperty('total_pages');
        expect(response.body.pagination).toHaveProperty('total_items');
        expect(response.body.pagination).toHaveProperty('current_page');
        expect(response.body.pagination.current_page).toBe(1);
        expect(response.body.pagination.page_size).toBe(10);

    });
})

describe('POST /sprocket', () => {
    it('should return a new sprocket', async () => {
        const response = await request(app).post('/sprocket').set('Accept', 'application/json').send({
            "teeth": 5,
            "pitch_diameter": 5,
            "outside_diameter": 6,
            "pitch": 1
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('teeth');
        expect(response.body).toHaveProperty('pitch_diameter');
        expect(response.body).toHaveProperty('outside_diameter');
        expect(response.body).toHaveProperty('pitch');
        expect(response.body).toHaveProperty('id');
        expect(response.body.teeth).toBe(5);
        expect(response.body.pitch_diameter).toBe(5);
        expect(response.body.outside_diameter).toBe(6);
        expect(response.body.pitch).toBe(1);
    });

    it('Should save an array of sprockets', async () => {
        const response = await request(app).post('/sprocket').set('Accept', 'application/json').send({
                "sprockets": [
                    {
                        "teeth": 5,
                        "pitch_diameter": 5,
                        "outside_diameter": 6,
                        "pitch": 1
                    },
                    {
                        "teeth": 5,
                        "pitch_diameter": 5,
                        "outside_diameter": 6,
                        "pitch": 1
                    },
                    {
                        "teeth": 5,
                        "pitch_diameter": 5,
                        "outside_diameter": 6,
                        "pitch": 1
                    }
                ]
            }
        );
        expect(response.statusCode).toBe(201);
        expect(response.body[0]).toHaveProperty('pitch_diameter');
        expect(response.body[0]).toHaveProperty('outside_diameter');
        expect(response.body[0]).toHaveProperty('pitch');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].teeth).toBe(5);
        expect(response.body[0].pitch_diameter).toBe(5);
        expect(response.body[0].outside_diameter).toBe(6);
        expect(response.body[0].pitch).toBe(1);
    });
});


describe('POST /sprocket + GET /sprocket', () => {
    it('should return a new sprocket', async () => {
        const responseCreation = await request(app).post('/sprocket').set('Accept', 'application/json').send({
            "teeth": 5,
            "pitch_diameter": 5,
            "outside_diameter": 6,
            "pitch": 1
        });
        expect(responseCreation.statusCode).toBe(201);
        expect(responseCreation.body).toHaveProperty('teeth');
        expect(responseCreation.body).toHaveProperty('pitch_diameter');
        expect(responseCreation.body).toHaveProperty('outside_diameter');
        expect(responseCreation.body).toHaveProperty('pitch');
        expect(responseCreation.body).toHaveProperty('id');
        expect(responseCreation.body.teeth).toBe(5);
        expect(responseCreation.body.pitch_diameter).toBe(5);
        expect(responseCreation.body.outside_diameter).toBe(6);
        expect(responseCreation.body.pitch).toBe(1);
        expect(responseCreation.body.id).toBeGreaterThan(3);
        const responseGet = await request(app).get('/sprocket').set('Accept', 'application/json');
        expect(responseGet.statusCode).toBe(200);
        expect(responseGet.body).toHaveProperty('data');
        expect(responseGet.body).toHaveProperty('pagination');
        expect(responseGet.body.data.length).toBeGreaterThan(0);
        expect(Array.isArray(responseGet.body.data)).toBe(true);
    });
});

describe('POST /sprocket + GET /sprocket/:id', () => {
    it('should return a new sprocket', async () => {
        const responseCreation = await request(app).post('/sprocket').set('Accept', 'application/json').send({
            "teeth": 2,
            "pitch_diameter": 3,
            "outside_diameter": 7,
            "pitch": 1
        });
        expect(responseCreation.statusCode).toBe(201);
        expect(responseCreation.body).toHaveProperty('teeth');
        expect(responseCreation.body).toHaveProperty('pitch_diameter');
        expect(responseCreation.body).toHaveProperty('outside_diameter');
        expect(responseCreation.body).toHaveProperty('pitch');
        expect(responseCreation.body).toHaveProperty('id');
        expect(responseCreation.body.teeth).toBe(2);
        expect(responseCreation.body.pitch_diameter).toBe(3);
        expect(responseCreation.body.outside_diameter).toBe(7);
        expect(responseCreation.body.pitch).toBe(1);
        expect(responseCreation.body.id).toBeGreaterThan(3);
        const responseGet = await request(app).get(`/sprocket/${responseCreation.body.id}`).set('Accept', 'application/json');
        expect(responseGet.statusCode).toBe(200);
        expect(responseGet.body).toHaveProperty('teeth');
        expect(responseGet.body).toHaveProperty('pitch_diameter');
        expect(responseGet.body).toHaveProperty('outside_diameter');
        expect(responseGet.body).toHaveProperty('pitch');
        expect(responseGet.body).toHaveProperty('id');
        expect(responseGet.body.teeth).toBe(2);
        expect(responseGet.body.pitch_diameter).toBe(3);
        expect(responseGet.body.outside_diameter).toBe(7);
        expect(responseGet.body.pitch).toBe(1);
        expect(responseGet.body.id).toBe(responseCreation.body.id);
    });
});

describe('PATCH /sprocket/:id', () => {
    it('should update a sprocket', async () => {
        const responseCreation = await request(app).post('/sprocket').set('Accept', 'application/json').send({
            "teeth": 2,
            "pitch_diameter": 3,
            "outside_diameter": 7,
            "pitch": 1
        });
        expect(responseCreation.statusCode).toBe(201);
        expect(responseCreation.body).toHaveProperty('teeth');
        expect(responseCreation.body).toHaveProperty('pitch_diameter');
        expect(responseCreation.body).toHaveProperty('outside_diameter');
        expect(responseCreation.body).toHaveProperty('pitch');
        expect(responseCreation.body).toHaveProperty('id');
        expect(responseCreation.body.teeth).toBe(2);
        expect(responseCreation.body.pitch_diameter).toBe(3);
        expect(responseCreation.body.outside_diameter).toBe(7);
        expect(responseCreation.body.pitch).toBe(1);
        expect(responseCreation.body.id).toBeGreaterThan(3);
        const responseUpdate = await request(app).patch(`/sprocket/${responseCreation.body.id}`).set('Accept', 'application/json').send({
            "teeth": 3,
            "pitch_diameter": 4,
            "outside_diameter": 8,
            "pitch": 2
        });
        expect(responseUpdate.statusCode).toBe(200);
        expect(responseUpdate.body).toHaveProperty('teeth');
        expect(responseUpdate.body).toHaveProperty('pitch_diameter');
        expect(responseUpdate.body).toHaveProperty('outside_diameter');
        expect(responseUpdate.body).toHaveProperty('pitch');
        expect(responseUpdate.body).toHaveProperty('id');
        expect(responseUpdate.body.teeth).toBe(3);
        expect(responseUpdate.body.pitch_diameter).toBe(4);
        expect(responseUpdate.body.outside_diameter).toBe(8);
        expect(responseUpdate.body.pitch).toBe(2);
        expect(responseUpdate.body.id).toBe(responseCreation.body.id);
    });
});


const request = require('supertest');
const app = require('../../../config/app');

describe('GET /factory', () => {
    it('should return a empty factory list', async () => {
        const response = await request(app).get('/factory').set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
        expect(response.body.pagination).toHaveProperty('total_pages');
        expect(response.body.pagination).toHaveProperty('total_items');
        expect(response.body.pagination).toHaveProperty('current_page');
        expect(response.body.pagination.current_page).toBe(1);
        expect(response.body.pagination.page_size).toBe(10);
        expect(response.body.pagination.total_items).toBe(3);
        expect(response.body.pagination.total_pages).toBe(1);
    });
});


describe('GET by id /factory', () => {
    it('should return a factory by id', async () => {
        const response = await request(app).get('/factory/1').set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });
})

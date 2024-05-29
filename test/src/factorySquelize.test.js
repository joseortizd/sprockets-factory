const { FactoriesSequelizeRepository } = require('../../src/infrastructure/repositories/factories/sequelize/factoriesSequelize.repository');
const Factory = require('../../src/infrastructure/repositories/factories/sequelize/models/factory.model');

jest.mock('../../src/infrastructure/repositories/settings/sequelizeConnection', () => {
    return class SequelizeConnection {
        constructor() {
            this.sequelize = {
                define: jest.fn().mockReturnThis(),
                sync: jest.fn()
            };

        }
    };
});
jest.mock('../../src/infrastructure/repositories/factories/sequelize/models/factory.model', () => ({
    hasMany: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn()
}));
jest.mock('../../src/infrastructure/repositories/factories/sequelize/models/chartData.model');

describe('FactoriesSequelizeRepository', () => {
    let repository;

    beforeEach(() => {
        repository = new FactoriesSequelizeRepository();
    });

    describe('getFactories', () => {
        it('should return paginated list of factories', async () => {
            const mockFactoryData = [
                {
                    factoryId: 1,
                    chart_data: {
                        sprocket_production_actual: [32, 29],
                        sprocket_production_goal: [32, 30],
                        time: [1611194818, 1611194878]
                    }
                }
            ];

            const mockResponse = {
                count: 1,
                rows: mockFactoryData
            };

            Factory.findAndCountAll.mockResolvedValue(mockResponse);

            const result = await repository.getFactories(1, 10);

            expect(result.pagination.total_items).toBe(1);
            expect(result.pagination.total_pages).toBe(1);
            expect(result.pagination.current_page).toBe(1);
            expect(result.pagination.page_size).toBe(10);
            expect(result.data).toEqual(mockFactoryData.map(factory => repository.convertPropertiesToSnakeCase(factory)));
        });

        it('should throw an error if database query fails', async () => {
            Factory.findAndCountAll.mockRejectedValueOnce({ name: 'SequelizeDatabaseError' });

            await expect(repository.getFactories(1, 10)).rejects.toThrow('DatabaseError');
        });
    });

    describe('getFactoryById', () => {
        it('should return a factory by id', async () => {
            const mockFactory = {
                factoryId: 1,
                chart_data: {
                    sprocket_production_actual: [32, 29],
                    sprocket_production_goal: [32, 30],
                    time: [1611194818, 1611194878]
                }
            };

            Factory.findByPk.mockResolvedValue(mockFactory);

            const result = await repository.getFactoryById(1);

            expect(result).toEqual(mockFactory);
        });

        it('should throw NotFoundError if factory is not found', async () => {
            Factory.findByPk.mockResolvedValue(null);

            await expect(repository.getFactoryById(1)).rejects.toThrow('NotFoundError');
        });

        it('should throw DatabaseError on other errors', async () => {
            Factory.findByPk.mockRejectedValue(new Error('SomeDatabaseError'));

            await expect(repository.getFactoryById(1)).rejects.toThrow('DatabaseError');
        });
    });
});

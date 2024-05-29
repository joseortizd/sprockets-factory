const { SprocketsSequelizeRepository } = require('../../src/infrastructure/repositories/sprockets/sequelize/sprocketsSequelize.repository');
const SprocketModel = require('../../src/infrastructure/repositories/sprockets/sequelize/models/sprocket.model');

jest.mock('../../src/infrastructure/repositories/sprockets/sequelize/models/sprocket.model', () => ({
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    bulkCreate: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../../src/infrastructure/repositories/settings/sequelizeConnection', () => ({}));

describe('SprocketsSequelizeRepository', () => {
    let repository;

    beforeEach(() => {
        repository = new SprocketsSequelizeRepository();
    });

    describe('getSprockets', () => {
        it('should return sprockets with pagination information', async () => {
            const mockSprockets = [
                {
                    "id": 1,
                    "teeth": 5,
                    "pitch_diameter": 5,
                    "outside_diameter": 6,
                    "pitch": 1
                 },
                {
                    "id": 2,
                    "teeth": 5,
                    "pitch_diameter": 5,
                    "outside_diameter": 6,
                    "pitch": 1
                }];
            const pageSize = 10;
            const page = 1;
            const count = 2;
            SprocketModel.findAndCountAll.mockResolvedValue({ count, rows: mockSprockets });

            const result = await repository.getSprockets(page, pageSize);

            expect(result.pagination.total_items).toBe(count);
            expect(result.pagination.total_pages).toBe(1);
            expect(result.pagination.current_page).toBe(page);
            expect(result.pagination.page_size).toBe(pageSize);
            expect(result.data).toEqual(mockSprockets);
        });

        it('should throw error if database operation fails', async () => {
            SprocketModel.findAndCountAll.mockRejectedValue(new Error('Database error'));

            await expect(repository.getSprockets(1, 10)).rejects.toThrow('DatabaseError');
        });
    });

    describe('getSprocketById', () => {
        it('should return sprocket if found', async () => {
            const mockSprocket = {
                "id": 1,
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            };
            const id = 1;
            SprocketModel.findByPk.mockResolvedValue(mockSprocket);

            const result = await repository.getSprocketById(id);

            expect(result).toEqual(mockSprocket);
        });

        it('should throw NotFoundError if sprocket not found', async () => {
            const id = 1;
            SprocketModel.findByPk.mockResolvedValue(null);

            await expect(repository.getSprocketById(id)).rejects.toThrow('NotFoundError');
        });

        it('should throw BadRequestError if validation error occurs', async () => {
            const id = 1;
            SprocketModel.findByPk.mockRejectedValue({ name: 'SequelizeValidationError' });

            await expect(repository.getSprocketById(id)).rejects.toThrow('BadRequestError');
        });

        it('should throw DatabaseError for other errors', async () => {
            const id = 1;
            SprocketModel.findByPk.mockRejectedValue(new Error('Database error'));

            await expect(repository.getSprocketById(id)).rejects.toThrow('DatabaseError');
        });
    });

    describe('updateSprocket', () => {
        it('should update and return the updated sprocket', async () => {
            const sprocketToUpdate = { "teeth": 5 };
            const id = 1;
            const updatedSprocket =  {
                "id": 1,
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            };
            const mockSprocketToUpdate = {
                update: jest.fn().mockResolvedValue({ dataValues: updatedSprocket })
            };
            SprocketModel.findByPk.mockResolvedValueOnce(mockSprocketToUpdate);
            SprocketModel.update.mockResolvedValueOnce({"dataValues": updatedSprocket});

            const result = await repository.updateSprocket(sprocketToUpdate, id);

            expect(result).toEqual(updatedSprocket);
        });

        it('should throw NotFoundError if sprocket to update not found', async () => {
            const id = 1;
            SprocketModel.findByPk.mockResolvedValueOnce(null);

            await expect(repository.updateSprocket({}, id)).rejects.toThrow('NotFoundError');
        });

        it('should throw BadRequestError if validation error occurs', async () => {
            const id = 1;
            const mockSprocketToUpdate = {
                update: jest.fn().mockResolvedValue({ dataValues: {} })
            };
            SprocketModel.findByPk.mockRejectedValueOnce({ name: 'SequelizeValidationError' });

            await expect(repository.updateSprocket({}, id)).rejects.toThrow('BadRequestError');
        });

        it('should throw DatabaseError for other errors', async () => {
            const id = 1;
            SprocketModel.findByPk.mockRejectedValueOnce(new Error('Database error'));

            await expect(repository.updateSprocket({}, id)).rejects.toThrow('DatabaseError');
        });
    });

    describe('saveSprocket', () => {
        it('should save and return the created sprocket', async () => {
            const sprocketToSave = {
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            };
            const createdSprocket = {
                "id": 1,
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            };

            SprocketModel.create.mockResolvedValueOnce(createdSprocket);

            const result = await repository.saveSprocket(sprocketToSave);

            expect(result).toBeDefined();
        });

        it('should throw BadRequestError if validation error occurs', async () => {
            const sprocketToSave =     {
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            };
            SprocketModel.create.mockRejectedValueOnce({ name: 'SequelizeDatabaseError' });

            await expect(repository.saveSprocket(sprocketToSave)).rejects.toThrow('BadRequestError');
        });

        it('should throw DatabaseError for other errors', async () => {
            const sprocketToSave =     {
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            };
            SprocketModel.create.mockRejectedValueOnce(new Error('Database error'));

            await expect(repository.saveSprocket(sprocketToSave)).rejects.toThrow('DatabaseError');
        });
    });

    describe('saveSprockets', () => {
        it('should save sprockets and return created sprockets', async () => {
            const sprocketsToSave =  [
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
                }];
            const createdSprockets = [
                [
                    {
                        "id": 1,
                        "teeth": 5,
                        "pitch_diameter": 5,
                        "outside_diameter": 6,
                        "pitch": 1
                    },
                    {
                        "id": 2,
                        "teeth": 5,
                        "pitch_diameter": 5,
                        "outside_diameter": 6,
                        "pitch": 1
                    }]
            ];

            SprocketModel.bulkCreate.mockResolvedValueOnce(createdSprockets);

            const result = await repository.saveSprockets(sprocketsToSave);

            expect(result).toEqual(createdSprockets);
        });

        it('should throw BadRequestError if validation error occurs', async () => {
            const sprocketsToSave = [
                {
                    "teeth": "abc",
                    "pitch_diameter": 5,
                    "outside_diameter": 6,
                    "pitch": 1
                },
                {
                    "teeth": "fjd",
                    "pitch_diameter": 5,
                    "outside_diameter": 6,
                    "pitch": 1
                }
            ];
            SprocketModel.bulkCreate.mockRejectedValueOnce({ name: 'SequelizeDatabaseError' });

            await expect(repository.saveSprockets(sprocketsToSave)).rejects.toThrow('BadRequestError');
        });

        it('should throw DatabaseError for other errors', async () => {
            const sprocketsToSave = [ [
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
                }]];
            SprocketModel.bulkCreate.mockRejectedValueOnce(new Error('Database error'));

            await expect(repository.saveSprockets(sprocketsToSave)).rejects.toThrow('DatabaseError');
        });
    });

});

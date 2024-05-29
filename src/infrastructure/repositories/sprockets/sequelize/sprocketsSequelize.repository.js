const { SprocketsRepository } = require('../../../../domain/repository/sprockets/sprockets.repository');
const SprocketModel = require('./models/sprocket.model');
const { ValidationError } = require('sequelize');

class SprocketsSequelizeRepository extends SprocketsRepository {
    constructor() {
        super();
    }

    async getSprockets(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await SprocketModel.findAndCountAll({
                offset,
                limit: pageSize,
                attributes: { exclude: ['createdAt', 'updatedAt']}
            });

            const totalPages = Math.ceil(count / pageSize);

            return {
                pagination: {
                    total_items: count,
                    total_pages: totalPages,
                    current_page: Number(page),
                    page_size: Number(pageSize)
                },
                data: rows
            };
        } catch (error) {
            console.error('Error getting sprockets: ', error);
            throw new Error('DatabaseError');
        }
    }

    async getSprocketById(id) {
        try {
            const sprocket = await SprocketModel.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt']} });
            if (!sprocket) {
                throw new Error('NotFoundError');
            }
            return sprocket;
        } catch (error) {
            console.error('Error getting sprocket by id: ', error);
            if (error.message === 'NotFoundError') {
                throw new Error('NotFoundError');
            }
            if (error.name === 'SequelizeValidationError') {
                throw new Error('BadRequestError');
            }
            throw new Error('DatabaseError');
        }
    }

    async updateSprocket(sprocket, id) {
        try {
            const sprocketToUpdate = await SprocketModel.findByPk(id);
            if (!sprocketToUpdate) {
                throw new Error('NotFoundError');
            }
            let sprocketUpdated = await sprocketToUpdate.update(this.camelToSnake(sprocket), {
                returning: true
            });
            return this.camelToSnake(sprocketUpdated.dataValues)
        } catch (error) {
            console.error('Error updating sprocket: ', error);
            if (error.message === 'NotFoundError') {
                throw new Error('NotFoundError');
            }
            if (error.name === 'SequelizeValidationError'  || error.name === 'SequelizeDatabaseError') {
                throw new Error('BadRequestError');
            }
            throw new Error('DatabaseError');
        }
    }


    async saveSprocket(sprocket) {
        try {
            const sprocketCreated =  await SprocketModel.create(this.camelToSnake(sprocket));
            return this.camelToSnake(sprocketCreated.dataValues);
        } catch (error) {
            console.error('Error saving sprockets: ', error);
            if (error instanceof ValidationError || error.name === 'SequelizeDatabaseError') {
                throw new Error('BadRequestError');
            }
            throw new Error('DatabaseError');
        }
    }

    async saveSprockets(sprockets) {
        try {
            return await SprocketModel.bulkCreate(sprockets.map(sprocket => this.camelToSnake(sprocket)));
        } catch (error) {
            console.error('Error saving sprockets:', error.name);
            if (error instanceof ValidationError  || error.name === 'SequelizeDatabaseError') {
                throw new Error('BadRequestError');
            }
            throw new Error('DatabaseError');
        }
    }

    camelToSnake(obj) {
        const snakeObj = {};
        for (let key in obj) {
            const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            snakeObj[snakeKey] = obj[key];
        }
        return snakeObj;
    }
}

module.exports = { SprocketsSequelizeRepository };

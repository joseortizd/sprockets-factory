const { SprocketsRepository } = require('../../../../domain/repository/sprockets/sprockets.repository');
const Model = require('./models/sprocket.model');

class SprocketsSequelizeRepository extends SprocketsRepository {
    constructor() {
        super();
    }

    async getSprockets(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await Model.findAndCountAll({
                offset,
                limit: pageSize,
                attributes: { exclude: ['createdAt', 'updatedAt']}
            });

            const totalPages = Math.ceil(count / pageSize);

            return {
                pagination: {
                    total_items: count,
                    total_pages: totalPages,
                    current_page: page,
                    page_size: pageSize
                },
                data: rows
            };
        } catch (error) {
            console.error('Error getting sprockets: ', error);
            return [];
        }
    }

    async saveSprocket(sprocket) {
        try {
            return await Model.create(this.camelToSnake(sprocket));
        } catch (error) {
            console.error('Error saving sprockets: ', error);
            return null;
        }
    }

    async saveSprockets(sprockets) {
        try {
            const savedSprockets = await Model.bulkCreate(sprockets.map(sprocket => this.camelToSnake(sprocket)));
            return savedSprockets;
        } catch (error) {
            console.error('Error saving sprockets:', error);
            return [];
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

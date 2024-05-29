const { SprocketsRepository } = require('../../../../domain/repository/sprockets/sprockets.repository');
const { SprocketsData } = require('./sprocetsData');

class SprocketsMemoryRepository extends SprocketsRepository {
    constructor() {
        super();
        this.sprockets = SprocketsData;
    }

    async getSprockets(page, pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const slicedSprockets = this.sprockets.slice(startIndex, endIndex);
        const totalItems = this.sprockets.length;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            pagination: {
                total_items: totalItems,
                total_pages: totalPages,
                current_page: page,
                page_size: pageSize
            },
            data: slicedSprockets.map(s => this.camelToSnake(s))
        };
    }

    async getSprocketById(id) {
        return this.camelToSnake(this.sprockets.find(s => s.id == id));
    }

    async updateSprocket(sprocket, id) {
        const index = this.sprockets.findIndex(s => s.id == id);
        if (index === -1) {
            return null;
        }

        this.sprockets[index] = Object.assign({}, this.sprockets[index], sprocket);;
        return this.camelToSnake(this.sprockets[index]);
    }

    async saveSprocket(sprocket) {
        const newSprocket = {...sprocket, id: this.sprockets.length+1};
        this.sprockets.push(newSprocket);
        return this.camelToSnake(newSprocket);
    }

    async saveSprockets(sprockets) {
        let sprocketsWithId = sprockets.map((s, i) => ({...s, id: this.sprockets.length+i+1}));
        this.sprockets = [...this.sprockets,...sprocketsWithId];
        return this.sprockets.map(s => this.camelToSnake(s));
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

module.exports = { SprocketsMemoryRepository };

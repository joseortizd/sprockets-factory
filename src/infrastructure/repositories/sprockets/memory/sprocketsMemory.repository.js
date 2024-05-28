const { SprocketsRepository } = require('../../../../domain/repository/sprockets/sprockets.repository');

class SprocketsMemoryRepository extends SprocketsRepository {
    constructor() {
        super();
        this.sprockets = [];
    }

    async getSprockets(page = 1, pageSize = 10) {
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
            data: slicedSprockets
        };
    }

    async saveSprocket(sprocket) {
        this.sprockets.push(sprocket);
        console.log(this.sprockets)
        return sprocket;
    }

    async saveSprockets(sprockets) {
        this.sprockets = [...this.sprockets,...sprockets];
        return sprockets;
    }
}

module.exports = { SprocketsMemoryRepository };

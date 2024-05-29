const { FactoriesRepository } = require('../../../../domain/repository/factories/factories.repository');
const { FactoriesData } = require('./factoriesData');

class FactoriesMemoryRepository extends FactoriesRepository {
    constructor() {
        super();
        this.factories = FactoriesData;
    }

    async getFactories(page, pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const slicedFactories = this.factories.slice(startIndex, endIndex);
        const totalItems = this.factories.length;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            pagination: {
                total_items: totalItems,
                total_pages: totalPages,
                current_page: page,
                page_size: pageSize
            },
            data: slicedFactories
        };
    }

    async getFactoryById(id) {
        return this.factories.find(f => f.factory.id == id);
    }
}

module.exports = { FactoriesMemoryRepository };

const { SprocketsMemoryRepository } = require('../../infrastructure/repositories/sprockets/memory/sprocketsMemory.repository');
const { SprocketsSequelizeRepository } = require('../../infrastructure/repositories/sprockets/sequelize/sprocketsSequelize.repository');

class SprocketRepositoryFactory {
    static createRepository() {
        const strategy = process.env.SPROCKETS_STRATEGY ?? 'MEMORY';
        switch (strategy) {
            case 'MEMORY':
                return new SprocketsMemoryRepository();
            case 'SEQUELIZE':
                return new SprocketsSequelizeRepository();
            default:
                throw new Error(`Invalid SPROCKETS_STRATEGY: ${strategy}`);
        }
    }
}

module.exports = { SprocketRepository : SprocketRepositoryFactory };

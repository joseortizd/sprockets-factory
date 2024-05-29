const { FactoriesMemoryRepository } = require('../../infrastructure/repositories/factories/memory/factoriesMemory.repository');
const { FactoriesSequelizeRepository } = require('../../infrastructure/repositories/factories/sequelize/factoriesSequelize.repository');

class FactoriesRepositoryFactory {
    static createRepository() {
        const strategy = process.env.FACTORIES_STRATEGY ?? 'MEMORY';
        switch (strategy) {
            case 'MEMORY':
                return new FactoriesMemoryRepository();
            case 'SEQUELIZE':
                return new FactoriesSequelizeRepository();
            default:
                throw new Error(`Invalid FACTORIES_STRATEGY: ${strategy}`);
        }
    }
}

module.exports = { FactoryRepository : FactoriesRepositoryFactory };

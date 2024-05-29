class FactoryService {
  constructor(repository) {
    this.repository = repository;
  }

  async getFactories(page = 1, pageSize = 10) {
    let result = await this.repository.getFactories(page, pageSize);
    return result;
  }

  async getFactoryById(id) {
    return await this.repository.getFactoryById(id);
  }
}

module.exports = { FactoriesService: FactoryService };

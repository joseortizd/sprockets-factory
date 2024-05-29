class SprocketService {
    constructor(repository) {
        this.repository = repository;
    }

    async getSprockets(page = 1, pageSize = 10) {
        let result = await this.repository.getSprockets(page, pageSize);
        return result;
    }

    async getSprocketById(id) {
        return await this.repository.getSprocketById(id);
    }

    async updateSprocket(sprocket, id) {
        return await this.repository.updateSprocket(sprocket, id);
    }

    async saveSprocket(sprocket) {
        return await this.repository.saveSprocket(sprocket);
    }

    async saveSprockets(sprockets) {
        return await this.repository.saveSprockets(sprockets);
    }
}

module.exports = { SprocketService };

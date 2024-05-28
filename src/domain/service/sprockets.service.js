class SprocketService {
    constructor(repository) {
        this.repository = repository;
    }

    async getSprockets() {
        let result = await this.repository.getSprockets();
        return result;
    }

    async saveSprocket(sprocket) {
        return await this.repository.saveSprocket(sprocket);
    }

    async saveSprockets(sprockets) {
        return await this.repository.saveSprockets(sprockets);
    }
}

module.exports = { SprocketService };

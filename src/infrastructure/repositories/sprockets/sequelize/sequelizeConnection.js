const { Sequelize } = require('sequelize');

class SequelizeConnection {
    constructor() {
        if (!SequelizeConnection.instance) {
            this.sequelize = new Sequelize(process.env.CONNECTION_STRING, {
                logging: false
            });
            SequelizeConnection.instance = this;
        }
        return SequelizeConnection.instance;
    }
}

module.exports = SequelizeConnection;

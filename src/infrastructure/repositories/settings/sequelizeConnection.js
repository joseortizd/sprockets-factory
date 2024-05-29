const { Sequelize } = require('sequelize');

class SequelizeConnection {
    constructor() {
        if (!SequelizeConnection.instance) {
            this.sequelize = new Sequelize(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
                logging: false
            });
            SequelizeConnection.instance = this;
        }
        return SequelizeConnection.instance;
    }
}

module.exports = SequelizeConnection;

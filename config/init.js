require('dotenv').config()
const { Sequelize } = require('sequelize');
const Factory = require('../src/infrastructure/repositories/factories/sequelize/models/factory.model');
const ChartData = require('../src/infrastructure/repositories/factories/sequelize/models/chartData.model');
const Sprocket = require('../src/infrastructure/repositories/sprockets/sequelize/models/sprocket.model');
let alreadyCreated = false;

const createDatabase = async () => {
    let sequelize = await new Sequelize("", process.env.DB_USER, process.env.DB_PASSWORD, {
        dialect: 'postgres'
    });

    try {
        let createDatabaseResult = await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        if (createDatabaseResult) console.log('Database created');
    } catch (error) {
        if (error.name === 'SequelizeDatabaseError') {
            console.log('Database already exists');
            console.log('Skipping database creation');
            alreadyCreated = true;
        } else {
            throw error;
        }
    }
}

const inicialize = async () => {
    if (alreadyCreated) return;
    const SequelizeConnection = require("../src/infrastructure/repositories/settings/sequelizeConnection");
    let sequelize = new SequelizeConnection().sequelize;
    await sequelize.sync();
    console.log('Database synchronized');
}

const main = async () => {
    await createDatabase();
    await inicialize();
}

main()

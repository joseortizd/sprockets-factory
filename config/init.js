/* eslint-disable */
require('dotenv').config()
const { Sequelize } = require('sequelize');
const Factory = require('../src/infrastructure/repositories/factories/sequelize/models/factory.model');
const ChartData = require('../src/infrastructure/repositories/factories/sequelize/models/chartData.model');
const SprocketModel = require('../src/infrastructure/repositories/sprockets/sequelize/models/sprocket.model');
let alreadyCreated = false;

const createDatabase = async () => {
    try {
        await sleep(10000)
        let sequelize = await new Sequelize("", process.env.DB_USER, process.env.DB_PASSWORD, {
            dialect: 'postgres'
        });
        let createDatabaseResult = await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        if (createDatabaseResult) console.log('Database created');
    } catch (error) {
        if (error.name === 'SequelizeDatabaseError') {
            console.log('Database already exists');
            console.log('Skipping database creation');
            alreadyCreated = true;
        } else {
            console.log(error)
        }
    }
}

const inicialize = async () => {
    const SequelizeConnection = require("../src/infrastructure/repositories/settings/sequelizeConnection");
    let sequelize = new SequelizeConnection().sequelize;
    await sequelize.sync();
    await SprocketModel.bulkCreate(
        [
            {
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            },
            {
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            },
            {
                "teeth": 5,
                "pitch_diameter": 5,
                "outside_diameter": 6,
                "pitch": 1
            }
        ]
    )
    console.log('Database synchronized');
}

const main = async () => {
    await createDatabase();
    await inicialize();
}


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
main()
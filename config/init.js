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
    try {
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
        await sequelize.query(
            'INSERT INTO factories (factory_id, created_at, updated_at) VALUES \n' +
            '(1, now(), now()), \n' +
            '(2, now(), now()), \n' +
            '(3, now(), now())'
        )

        await sequelize.query(
            'INSERT INTO chart_data (id, sprocket_production_actual, sprocket_production_goal, time, created_at, updated_at, factory_factory_id) VALUES \n' +
            '(1, \'{32,29,31,30,32,32,29,31,30,32,32,29,31,30,32,32,29,31,30,32}\', \'{32,30,31,29,32,32,30,31,29,32,32,30,31,29,32,32,30,31,29,32}\', \'{1611194818,1611194878,1611194938,1611194998,1611195058,1611195118,1611195178,1611195238,1611195298,1611195358,1611195418,1611195478,1611195538,1611195598,1611195658,1611195718,1611195778,1611195838,1611195898,1611195958}\', now(), now(), 1), \n' +
            '(2, \'{32,28,31,30,30,32,29,28,30,32,32,29,31,30,31,32,29,29,33,30}\', \'{31,33,29,29,32,30,30,31,29,31,31,30,28,29,32,29,30,31,28,32}\', \'{1611204818,1611204878,1611204938,1611204998,1611205058,1611205118,1611205178,1611205238,1611205298,1611205358,1611205418,1611205478,1611205538,1611205598,1611205658,1611205718,1611205778,1611205838,1611205898,1611205958}\', now(), now(), 2), \n' +
            '(3, \'{32,29,31,30,30,32,29,29,30,32,32,29,31,30,30,32,29,29,33,31}\', \'{31,31,29,30,32,30,30,31,29,31,30,30,28,29,32,29,31,31,28,32}\', \'{1611304818,1611304878,1611304938,1611304998,1611305058,1611305118,1611305178,1611305238,1611305298,1611305358,1611305418,1611305478,1611305538,1611305598,1611305658,1611305718,1611305778,1611305838,1611305898,1611305958}\', now(), now(), 3)\n'
        )
    } catch (e) {
        console.log('Database already have data');
    }

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

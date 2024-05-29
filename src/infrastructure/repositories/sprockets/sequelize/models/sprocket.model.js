const { DataTypes } = require('sequelize');
const SequelizeConnection = require("../../../settings/sequelizeConnection");

let sequelize = new SequelizeConnection().sequelize;

const SprocketModel = sequelize.define('Sprocket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teeth: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pitch_diameter: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    outside_diameter: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    pitch: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { underscored: true, timestamps: true });

module.exports = SprocketModel;

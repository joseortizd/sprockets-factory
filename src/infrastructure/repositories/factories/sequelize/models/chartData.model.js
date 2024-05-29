const { DataTypes } = require('sequelize');
const SequelizeConnection = require("../../../settings/sequelizeConnection");
let sequelize = new SequelizeConnection().sequelize;

const ChartData = sequelize.define('ChartData', {
    sprocket_production_actual: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    sprocket_production_goal: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    },
    time: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    }
}, { tableName: 'chart_data', underscored: true });


module.exports = ChartData;


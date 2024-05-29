const { DataTypes } = require('sequelize');
const SequelizeConnection = require("../../../settings/sequelizeConnection");
const ChartData = require('./chartData.model');

let sequelize = new SequelizeConnection().sequelize;

const Factory = sequelize.define('Factory', {
    factoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }}, {
    underscored: true,
});



Factory.hasMany(ChartData);
ChartData.belongsTo(Factory);
/**

(async () => {
    await sequelize.sync({ force: true });
    console.log("Modelos sincronizados correctamente");
})();
**/

module.exports = Factory;

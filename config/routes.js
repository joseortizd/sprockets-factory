const healthRoutes = require('../src/application/routes/health.route');
const sprocketRoutes = require('../src/application/routes/sprocket.route');
const factoryRoutes = require('../src/application/routes/factory.route');

const setRoutes = (app) => {
    app.use('/', healthRoutes);
    app.use('/', sprocketRoutes);
    app.use('/', factoryRoutes);
};

module.exports = { setRoutes }

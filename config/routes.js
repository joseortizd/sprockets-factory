const healthRoutes = require('../src/application/routes/health.route');
const sprocketRoutes = require('../src/application/routes/sprocket.route');

const setRoutes = (app) => {
    app.use('/', healthRoutes);
    app.use('/', sprocketRoutes);
};

module.exports = { setRoutes }

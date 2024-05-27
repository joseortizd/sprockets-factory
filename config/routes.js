const healthRoutes = require('../src/client/routes/health');

const setRoutes = (app) => {
    app.use('/', healthRoutes);
};

module.exports = { setRoutes }

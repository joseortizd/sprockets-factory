const express = require('express');
const os = require('os');
const router = express.Router();
const packageJson = require('../../../package.json');

router.get('/healthcheck', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        version: packageJson.version,
        memoryUsage: process.memoryUsage(),
        os: {
            type: os.type(),
            platform: os.platform(),
            release: os.release(),
            uptime: os.uptime(),
            loadavg: os.loadavg(),
            totalmem: os.totalmem(),
            freemem: os.freemem(),
        }
    };
    res.status(200).json(healthcheck);
});

module.exports = router;

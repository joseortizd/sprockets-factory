const express = require('express');
const router = express.Router();
const decamelcaseKeys = require('decamelcase-keys');
const { SprocketService } = require('../../domain/service/sprockets.service');
const { Sprocket } = require('../../domain/models/sprocket.model');
const { SprocketRepository } = require('../../domain/repository/sprockets.factory');

const sprocketsService = new SprocketService(SprocketRepository.createRepository());

router.post('/sprocket', async (req, res) => {
    const sprocket = req.body;
    let response = {};
    if (sprocket?.sprockets && Array.isArray(sprocket.sprockets)) {
        const sprockets = sprocket.sprockets.map(s => Sprocket.fromJSON(s));
        response = await sprocketsService.saveSprockets(sprockets, res);
    } else {
        const sprocket = Sprocket.fromJSON(req.body);
        response = await sprocketsService.saveSprocket(sprocket, res);
    }
    res.status(201).json(response);
});

router.get('/sprocket', async (req, res) => {
    let response = await sprocketsService.getSprockets();
    res.status(200).json(response);
})

module.exports = router;

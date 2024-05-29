const express = require('express');
const router = express.Router();
const { SprocketService } = require('../../domain/service/sprockets.service');
const { Sprocket } = require('../../domain/models/sprocket.model');
const { SprocketRepository } = require('../../domain/repository/sprockets.factory');

const sprocketsService = new SprocketService(SprocketRepository.createRepository());

router.post('/sprocket', async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }

});

router.get('/sprocket', async (req, res, next) => {
    try {
        let page = req.query.page;
        let pageSize = req.query.pageSize;
        let response = await sprocketsService.getSprockets(page, pageSize);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})

router.get('/sprocket/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let response = await sprocketsService.getSprocketById(id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.patch('/sprocket/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let sprocket = Sprocket.fromJSON(req.body);
        let response = await sprocketsService.updateSprocket(sprocket, id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

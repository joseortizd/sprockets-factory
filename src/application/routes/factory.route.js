const express = require('express');
const router = express.Router();
const { FactoriesService } = require('../../domain/service/factory.service');
const { FactoryRepository } = require('../../domain/repository/factories.factory');

const factoriesService = new FactoriesService(FactoryRepository.createRepository());

router.get('/factory', async (req, res, next) => {
    try {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const response = await factoriesService.getFactories(page, pageSize);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/factory/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await factoriesService.getFactoryById(id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

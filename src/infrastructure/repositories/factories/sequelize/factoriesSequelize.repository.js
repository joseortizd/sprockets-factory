const { FactoriesRepository } = require('../../../../domain/repository/factories/factories.repository');
const Factory = require('./models/factory.model');
const ChartData = require('./models/chartData.model');

class FactoriesSequelizeRepository extends FactoriesRepository {
    constructor() {
        super();
    }

    async getFactories(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await Factory.findAndCountAll({
                offset,
                limit: pageSize,
                attributes: { exclude: ['createdAt', 'updatedAt']},
                include: [
                    {
                        model: ChartData,
                        as: 'ChartData',
                        attributes: { exclude: ['id', 'FactoryFactoryId', 'createdAt', 'updatedAt'] } // Excluir campos no deseados de ChartData
                    }
                ]
            });

            const totalPages = Math.ceil(count / pageSize);

            return {
                pagination: {
                    total_items: count,
                    total_pages: totalPages,
                    current_page: Number(page),
                    page_size: Number(pageSize)
                },
                data: rows.map(factory => this.convertPropertiesToSnakeCase(factory))
            };
        } catch (error) {
            console.error('Error getting factories: ', error);
            throw new Error('DatabaseError');
        }
    }

    async getFactoryById(id) {
        try {
            const factory = await Factory.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt']} });
            if (!factory) {
                throw new Error('NotFoundError');
            }
            const chartData = await ChartData.findOne({
                where: {
                    factory_factory_id: id
                },
                attributes: { exclude: ['id', 'FactoryFactoryId', 'createdAt', 'updatedAt'] }
            });
            return {id: id,...chartData.dataValues};
        } catch (error) {
            console.error('Error getting factory by id: ', error);
            if (error.message === 'NotFoundError') {
                throw new Error('NotFoundError');
            }
            if (error.name === 'SequelizeValidationError') {
                throw new Error('BadRequestError');
            }
            throw new Error('DatabaseError');
        }
    }

    convertPropertiesToSnakeCase(obj) {
        let newObj = {};
        newObj.factory_id = obj.factoryId;
        newObj.chart_data = obj.ChartData;
        return newObj;
    }
}



module.exports =  { FactoriesSequelizeRepository };

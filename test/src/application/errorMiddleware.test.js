const { ErrorHandler } = require('../../../src/application/middlewares/errorHandler.middleware');

describe('ErrorHandler middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    test('should handle BadRequestError', () => {
        const err = new Error('BadRequestError');
        ErrorHandler(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Bad Request' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle NotFoundError', () => {
        const err = new Error('NotFoundError');
        ErrorHandler(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle other errors', () => {
        const err = new Error('Some other error');
        ErrorHandler(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        expect(next).not.toHaveBeenCalled();
    });
});

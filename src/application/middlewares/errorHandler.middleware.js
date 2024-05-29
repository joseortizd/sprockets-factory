// eslint-disable-next-line no-unused-vars
const ErrorHandler = (err, req, res, next) => {
    if (err.message === 'BadRequestError') {
        return res.status(400).json({ error: 'Bad Request' });
    }
    if (err.message === 'NotFoundError') {
        return res.status(404).json({ error: 'Not Found' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = { ErrorHandler };

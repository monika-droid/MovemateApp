class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.error(err);
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token. Authorization denied';
        error = new ErrorResponse(message, 401);
    }
    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired. Please log in again';
        error = new ErrorResponse(message, 401);
    }

    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Server Error';

    res.status(error.statusCode).json({
        success: false,
        message: error.message
    });
};

module.exports = {
    errorHandler,
    ErrorResponse
};

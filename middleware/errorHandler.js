
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const errorResponse = {
        error: {
            message: err.message || "Error interno en el servidor",
            code: err.code || "Internal_error",
        },
    };
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
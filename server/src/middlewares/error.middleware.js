export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const messasge = err.message || "BACKEND ERROR";
    // const extraDetails = err.extraDetails || "Error from Backend"

    return res.status(statusCode).json({ messasge })
}



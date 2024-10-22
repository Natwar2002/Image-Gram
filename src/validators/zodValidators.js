export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            console.log(req.body);
            schema.parse(req.body);
            next();
        } catch (error) {
            console.log(error.errors);
            
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors
            });
        }
    }
}
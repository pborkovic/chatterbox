const validateUser = (req, res, next) => {
    const { login, firstName, lastName, email, password } = req.body;

    if (!login || !firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields'
        });
    }

    if (email && !email.includes('@')) {
        return res.status(400).json({
            success: false,
            error: 'Invalid email format'
        });
    }

    next();
};

module.exports = { validateUser };
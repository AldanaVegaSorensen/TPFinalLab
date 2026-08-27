const authService = require("../services/auth.service");

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        // Validar nombre
        if (
            typeof name !== "string" ||
            name.trim().length < 2
        ) {
            const error = new Error(
                "El nombre debe tener al menos 2 caracteres."
            );
            error.statusCode = 422;
            throw error;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            typeof email !== "string" ||
            !emailRegex.test(email)
        ) {
            const error = new Error(
                "El email no es válido."
            );
            error.statusCode = 422;
            throw error;
        }

        // Validar contraseña
        if (
            typeof password !== "string" ||
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password)
        ) {
            const error = new Error(
                "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número."
            );
            error.statusCode = 422;
            throw error;
        }

        const result = await authService.register(
            name.trim(),
            email.trim(),
            password
        );

        res.status(201).json(result);

    } catch (error) {
        console.error("Error registrando usuario:", error);
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // Validar email
        if (
            typeof email !== "string" ||
            !email.trim()
        ) {
            const error = new Error(
                "El email es obligatorio."
            );
            error.statusCode = 422;
            throw error;
        }

        // Validar contraseña
        if (
            typeof password !== "string" ||
            !password
        ) {
            const error = new Error(
                "La contraseña es obligatoria."
            );
            error.statusCode = 422;
            throw error;
        }

        const result = await authService.login(
            email.trim(),
            password
        );

        res.status(200).json(result);

    } catch (error) {
        console.error("Error iniciando sesión:", error);
        next(error);
    }
}

module.exports = {
    register,
    login
};
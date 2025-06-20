const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

async function generateToken(payload) {
    try {
        if (!SECRET_KEY) {
            throw new Error("JWT secret key is missing");
        }

        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: process.env.TIME,
            issuer: process.env.ISSUER,
        });

        return token;
    } catch (error) {
        throw new Error("Token generation failed");
    }
}

async function verifyToken(token) {
    try {
        if (!SECRET_KEY) {
            throw new Error("JWT secret key is missing");
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
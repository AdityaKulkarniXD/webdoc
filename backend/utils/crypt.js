const bcrypt = require("bcrypt");
require("dotenv").config();

class Encrypt {
    static async hashPassword(password) {
        try {
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            const hashed = await bcrypt.hash(password, saltRounds);
            return hashed;
        } catch (error) {
            throw new Error("Password hashing failed");
        }
    }

    static async hashID(details) {
        try {
            const saltRounds = parseInt(process.env.SALT_ROUNDS_PERSONAL);
            const hashed = await bcrypt.hash(details, saltRounds);
            return hashed;
        } catch (error) {
            throw new Error("Data hasing failed");
        }
    }

    static async comparePassword(password, hashedPassword) {
        try {
            const isPasswordValid = await bcrypt.compare(
                password,
                hashedPassword
            );
            return isPasswordValid;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async comparePass(password, extractedPassword) {
        try {
            return password === extractedPassword;
        } catch (error) {
            throw new Error("Admin password comparison failed");
        }
    }
}

module.exports = Encrypt;
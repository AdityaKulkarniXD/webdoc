const { verifyToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization token missing or malformed" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = await verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        req.hospital = decoded;

        next();
    } catch (error) {
        console.error("Authentication middleware error:", error.message);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authenticate;
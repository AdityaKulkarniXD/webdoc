const { verifyToken } = require("../utils/jwt");

async function authenticateDoctor(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization token required" });
        }

        const token = authHeader.split(" ")[1]; // Expecting format: "Bearer <token>"

        let verifiedToken;
        try {
            verifiedToken = await verifyToken(token);
        } catch (err) {
            return res.status(401).json({
                message: "Invalid or expired token",
                error: err.message,
            });
        }

        if (verifiedToken && verifiedToken.doctorId) {
            req.body = {
                ...req.body,
                doctorId: verifiedToken.doctorId,
            };
            next();
        } else {
            return res.status(401).json({ message: "Invalid token structure" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
    }
}

module.exports = authenticateDoctor;
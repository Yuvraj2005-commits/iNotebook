import jwt from "jsonwebtoken";

// Use the same JWT_SECRET as your auth routes
const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret-key";

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        // Use the same secret that was used to sign the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

export default fetchuser;

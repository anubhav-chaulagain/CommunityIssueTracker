import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookie

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify JWT
        req.user = verified; // Attach decoded data to request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};
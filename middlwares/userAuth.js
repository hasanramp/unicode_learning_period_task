import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


export default async function userAuth(req, res, next) {
    const authHeader = req.headers['Authorization'];

    if (!authHeader) {
        return res.status(403).send("No token provided");
    }

    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).send("Token missing");
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid token");
        req.user = user;
        next()
    })
}

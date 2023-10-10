import JWT from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import user from '../_models/user.model.js';

export const auth = (req, res, next) => {
    if (req.headers.token) {
        JWT.verify(req.headers.token, "privateKey", (error, payload) => {
            if (error) {
                res.status(409).json({ error: true, message: "Invalid Token." })
            } else {
                user.findOne({ _id: new ObjectId(payload.user._id) }).then((userFound) => {
                    if (userFound != null) {
                        next()
                    } else {
                        res.status(401).json({ error: true, message: "Unauthorized." });
                    }
                }).catch((error) => {
                    res.status(401).json({ error: true, message: "Unauthorized." });
                });
            }
        });
    } else {
        res.status(401).json({ error: true, message: "Token is Required." });
    }
}
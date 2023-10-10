import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { IncomingForm } from 'formidable';
import { ObjectId } from 'mongodb';
import User from '../_models/user.model.js';

export const signup = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (error, fields, files) => {
        User.findOne({ email: fields.email }).then(userFound => {
            if (userFound) {
                res.status(500).json({ error: true, message: "Email Already Exist." });
            } else {
                bcryptjs.hash(fields.password[0], 10).then(hashed => {
                    const newUser = new User({
                        name: fields.name[0],
                        email: fields.email[0],
                        password: hashed
                    });
                    newUser.save().then(created => {
                        if (created == null) {
                            res.status(500).json({ error: true, message: "An error occurred, Please try again." });
                        } else {
                            const token = jsonwebtoken.sign({ user: created }, 'privateKey');
                            res.status(201).json({ error: false, message: "Account created successfully.", token });
                        }
                    }).catch(error => {
                        res.status(500).json({ error: true, message: "Invalid Email." });
                    });
                }).catch(error => {
                    res.status(500).json({ error: true, message: "Invalid Password." });
                });
            }
        }).catch(error => {
            res.status(500).json({ error: true, message: "Invalid Email." });
        });
    });
};
export const login = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (error, fields, files) => {
        User.findOne({ email: fields.email }).then(userFound => {
            if (userFound !== null) {
                bcryptjs.compare(fields.password[0], userFound.password).then(compared => {
                    if (compared) {
                        const token = jsonwebtoken.sign({ user: userFound }, 'privateKey');
                        res.status(200).json({ error: false, message: "Sign in successfully.", token });
                    } else {
                        res.status(500).json({ error: true, message: "Incorrect password." });
                    }
                }).catch(error => {
                    res.status(500).json({ error: true, message: "Incorrect password." });
                });
            } else {
                res.status(500).json({ error: true, message: "Account not found." });
            }
        }).catch(error => {
            res.status(500).json({ error: true, message: "Invalid Email" });
        });
    });
};
export const getByUserId = (req, res) => {
    User.findOne({ _id: new ObjectId(req.params.userId) }).then(found => {
        if (found == null) {
            res.status(500).json({ error: true, message: "Account not found." });
        } else {
            res.status(200).json({ error: false, message: "Find successfully", user: found });
        }
    }).catch(error => {
        res.status(500).json({ error: true, message: "Invalid userId." });
    });
};
export const changePassword = (req, res) => {
    User.findOne({ _id: new ObjectId(fields.userId) }).then(found => {
        if (found !== null) {
            bcryptjs.compare(fields.oldPassword, found.password).then(compared => {
                if (compared) {
                    bcryptjs.hash(fields.password, 10).then(hashed => {
                        User.updateOne({ _id: new ObjectId(found._id) }, { $set: { password: hashed } }).then(updated => {
                            if (updated.modifiedCount === 1) {
                                res.status(200).json({ error: false, message: "Password has been successfully changed." });
                            } else {
                                res.status(403).json({ error: true, message: "Password not set." });
                            }
                        }).catch(error => {
                            res.status(500).json({ error: true, message: "Password not set." });
                        });
                    }).catch(error => {
                        res.status(500).json({ error: true, message: "Password not set." });
                    });
                } else {
                    res.status(401).json({ error: true, message: "Old password is incorrect." });
                }
            }).catch(error => {
                res.status(500).json({ error: true, message: "Please provide old password" });
            });
        } else {
            res.status(500).json({ error: true, message: "user does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: true, message: "Invalid userId" });
    });
};

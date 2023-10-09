const formidable = require('formidable');
const ObjectID = require('mongodb').ObjectId;
const feedback = require('../_models/feedback.model');
const cloudinary = require('../_helpers/cloudinary.helper');

exports.add = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (files.thumbnail) {
            cloudinary.upload(files).then((uploaded) => {
                let ins = new feedback({
                    name: fields.name[0],
                    title: fields.title[0],
                    description: fields.description[0],
                    thumbnail: uploaded
                });
                ins.save().then((created) => {
                    if (created == null) {
                        res.status(500).json({ error: true, message: "An error occurred, Please try again." });
                    } else {
                        res.status(201).json({ error: false, message: "Feedback successfully added.", created: created });
                    }
                }).catch((error) => {
                    res.status(500).json({ error: true, message: "Something went wrong." });
                });
            }).catch((error) => {
                res.status(500).json({ error: true, message: error });
            })
        } else {
            res.status(500).json({ error: true, message: "Please attached file." });
        }
    })
}
exports.update = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        feedback.findOne({ _id: new ObjectID(fields.id[0]) }).then((founded) => {
            if (founded) {
                let name = founded.name
                let title = founded.title
                let description = founded.description
                if (fields.name) {
                    name = fields.name[0]
                }
                if (fields.title) {
                    title = fields.title[0]
                }
                if (fields.description) {
                    description = fields.description[0]
                }
                if (files.thumbnail) {
                    cloudinary.upload(files).then((uploaded) => {
                        feedback.findOneAndUpdate({ _id: new ObjectID(fields.id[0]) }, { $set: { thumbnail: uploaded, title: title, description: description, name: name } }, { new: true }).then((updated) => {
                            if (updated == null) {
                                res.status(500).json({ error: true, message: "Feedback not found." });
                            } else {
                                res.status(200).json({ error: false, message: "Feedback is updated successfully.", updated: updated });
                            }
                        }).catch((error) => {
                            res.status(500).json({ error: true, message: "Invalid id." });
                        });
                    }).catch((error) => {
                        res.status(500).json({ error: true, message: error });
                    })
                } else {
                    feedback.findOneAndUpdate({ _id: new ObjectID(fields.id[0]) }, { $set: { title: title, description: description, name: name } }, { new: true }).then((updated) => {
                        if (updated == null) {
                            res.status(500).json({ error: true, message: "Feedback not found." });
                        } else {
                            res.status(200).json({ error: false, message: "Feedback is updated successfully.", updated: updated });
                        }
                    }).catch((error) => {
                        res.status(500).json({ error: true, message: "Invalid id." });
                    });
                }
            } else {
                res.status(500).json({ error: true, message: "Invalid id." });
            }
        }).catch((error) => {
            res.status(500).json({ error: true, message: "Invalid id." });
        })
    });
}
exports.delete = (req, res) => {
    feedback.deleteOne({ _id: new ObjectID(req.params.id) }).then((deleted) => {
        if (deleted.deletedCount > 0) {
            res.status(200).json({ error: false, message: "Feedback Deleted Successfully." });
        } else {
            res.status(500).json({ error: true, message: "Feedback Already deleted." });
        }
    }).catch((error) => {
        res.status(500).json({ error: true, message: "Feedback not found." });
    });
}
exports.getAll = (req, res) => {
    feedback.find({}).sort({ createdAt: -1 }).then((found) => {
        res.status(200).json({ error: false, message: "Find successfully", data: found })
    }).catch((error) => {
        res.status(500).json({ error: true, message: "Something went wrong." })
    });
}
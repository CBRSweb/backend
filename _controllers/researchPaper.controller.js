const formidable = require('formidable');
const ObjectID = require('mongodb').ObjectId;
const researchPaper = require('../_models/researchPaper.model');
const cloudinary = require('../_helpers/cloudinary.helper');

exports.add = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (files.thumbnail) {
            cloudinary.upload(files).then((uploaded) => {
                let ins = new researchPaper({
                    title: fields.title[0],
                    description: fields.description[0],
                    thumbnail: uploaded
                });
                ins.save().then((created) => {
                    if (created == null) {
                        res.status(500).json({ error: true, message: "An error occurred, Please try again." });
                    } else {
                        res.status(201).json({ error: false, message: "Research paper successfully added.", created: created });
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
        researchPaper.findOne({ _id: new ObjectID(fields.id[0]) }).then((founded) => {
            if (founded) {
                let title = founded.title
                let description = founded.description
                if (fields.title) {
                    title = fields.title[0]
                }
                if (fields.description) {
                    description = fields.description[0]
                }
                if (files.thumbnail) {
                    cloudinary.upload(files).then((uploaded) => {
                        researchPaper.findOneAndUpdate({ _id: new ObjectID(fields.id[0]) }, { $set: { thumbnail: uploaded, title: title, description: description } }, { new: true }).then((updated) => {
                            if (updated == null) {
                                res.status(500).json({ error: true, message: "Research paper not found." });
                            } else {
                                res.status(200).json({ error: false, message: "Research paper is updated successfully.", updated: updated });
                            }
                        }).catch((error) => {
                            res.status(500).json({ error: true, message: "Invalid id." });
                        });
                    }).catch((error) => {
                        res.status(500).json({ error: true, message: error });
                    })
                } else {
                    researchPaper.findOneAndUpdate({ _id: new ObjectID(fields.id[0]) }, { $set: { title: title, description: description } }, { new: true }).then((updated) => {
                        if (updated == null) {
                            res.status(500).json({ error: true, message: "Research paper not found." });
                        } else {
                            res.status(200).json({ error: false, message: "Research paper is updated successfully.", updated: updated });
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
    researchPaper.deleteOne({ _id: new ObjectID(req.params.id) }).then((deleted) => {
        if (deleted.deletedCount > 0) {
            res.status(200).json({ error: false, message: "Research paper Deleted Successfully." });
        } else {
            res.status(500).json({ error: true, message: "Research paper Already deleted." });
        }
    }).catch((error) => {
        res.status(500).json({ error: true, message: "Research paper not found." });
    });
}
exports.getAll = (req, res) => {
    researchPaper.find({}).sort({ createdAt: -1 }).then((found) => {
        res.status(200).json({ error: false, message: "Find successfully", data: found })
    }).catch((error) => {
        res.status(500).json({ error: true, message: "Something went wrong." })
    });
}

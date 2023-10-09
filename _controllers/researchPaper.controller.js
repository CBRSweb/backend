import { IncomingForm } from 'formidable';
import { ObjectId } from 'mongodb';
import ResearchPaper from '../_models/researchPaper.model.js';
import { upload } from '../_helpers/cloudinary.helper.js';

export const add = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (error, fields, files) => {
        if (files.thumbnail) {
            upload(files).then((uploaded) => {
                const ins = new ResearchPaper({
                    title: fields.title[0],
                    description: fields.description[0],
                    thumbnail: uploaded,
                });
                ins.save().then((created) => {
                    if (created == null) {
                        res.status(500).json({ error: true, message: "An error occurred, Please try again." });
                    } else {
                        res.status(201).json({ error: false, message: "Research paper successfully added.", created });
                    }
                }).catch((error) => {
                    res.status(500).json({ error: true, message: "Something went wrong." });
                });
            }).catch((error) => {
                res.status(500).json({ error: true, message: error });
            });
        } else {
            res.status(500).json({ error: true, message: "Please attach a file." });
        }
    });
};
export const update = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (error, fields, files) => {
        ResearchPaper.findOne({ _id: new ObjectId(fields.id[0]) }).then((founded) => {
            if (founded) {
                let title = founded.title;
                let description = founded.description;

                if (fields.title) {
                    title = fields.title[0];
                }
                if (fields.description) {
                    description = fields.description[0];
                }
                if (files.thumbnail) {
                    upload(files).then((uploaded) => {
                        ResearchPaper.findOneAndUpdate({ _id: new ObjectId(fields.id[0]) }, { $set: { thumbnail: uploaded, title, description } }, { new: true }).then((updated) => {
                            if (updated == null) {
                                res.status(500).json({ error: true, message: "Research paper not found." });
                            } else {
                                res.status(200).json({ error: false, message: "Research paper is updated successfully.", updated });
                            }
                        }).catch((error) => {
                            res.status(500).json({ error: true, message: "Invalid id." });
                        });
                    }).catch((error) => {
                        res.status(500).json({ error: true, message: error });
                    });
                } else {
                    ResearchPaper.findOneAndUpdate({ _id: new ObjectId(fields.id[0]) }, { $set: { title, description } }, { new: true }).then((updated) => {
                        if (updated == null) {
                            res.status(500).json({ error: true, message: "Research paper not found." });
                        } else {
                            res.status(200).json({ error: false, message: "Research paper is updated successfully.", updated });
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
        });
    });
};
export const deletePaper = (req, res) => {
    ResearchPaper.deleteOne({ _id: new ObjectId(req.params.id) }).then((deleted) => {
        if (deleted.deletedCount > 0) {
            res.status(200).json({ error: false, message: "Research paper Deleted Successfully." });
        } else {
            res.status(500).json({ error: true, message: "Research paper Already deleted." });
        }
    }).catch((error) => {
        res.status(500).json({ error: true, message: "Research paper not found." });
    });
};
export const getAll = (req, res) => {
    ResearchPaper.find({}).sort({ createdAt: -1 }).then((found) => {
        res.status(200).json({ error: false, message: "Find successfully", data: found });
    }).catch((error) => {
        res.status(500).json({ error: true, message: "Something went wrong." });
    });
};

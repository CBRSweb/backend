import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { dbConfig } from './_configs/db.config.js';

mongoose.set('strictQuery', false);
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((connected) => {
    console.log('Mongodb connected with success');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);

import userRoutes from './_routes/user.route.js';
import researchPaperRoutes from './_routes/researchPaper.route.js';
import feedbackRoutes from './_routes/feedback.route.js';

userRoutes(app);
researchPaperRoutes(app);
feedbackRoutes(app);

app.get("/", (req, res) => {
    res.status(200).json(`Backend version 1.0.0 working `);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Backend server listening at ${PORT}`);
});

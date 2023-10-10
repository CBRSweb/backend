import { add, update, deletePaper, getAll } from '../_controllers/researchPaper.controller.js';
import { auth } from '../_middleware/auth.middleware.js';

export default (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' + 'ess-Control-Request-Method, Access-Control-Request-Headers');
        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'application/json; charset=utf-8');
        next();
    });
    app.post('/api/research/paper/add', auth, add);
    app.post('/api/research/paper/update', auth, update);
    app.delete('/api/research/paper/delete/:id', auth, deletePaper);
    app.get('/api/research/paper/getAll/', getAll);
}
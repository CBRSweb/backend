import { deleteFeedback, add, update, getAll, getById } from '../_controllers/feedback.controller.js'
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
    app.post('/api/feedback/add', auth, add);
    app.post('/api/feedback/update', auth, update);
    app.delete('/api/feedback/delete/:id', auth, deleteFeedback);
    app.get('/api/feedback/getAll', getAll);
    app.get('/api/feedback/getById/:id', getById);
}
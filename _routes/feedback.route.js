const feedback = require('../_controllers/feedback.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' + 'ess-Control-Request-Method, Access-Control-Request-Headers');
        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'application/json; charset=utf-8');
        next();
    });
    app.post('/api/feedback/add', feedback.add);
    app.post('/api/feedback/update', feedback.update);
    app.delete('/api/feedback/delete/:id', feedback.delete);
    app.get('/api/feedback/getAll/', feedback.getAll);
}
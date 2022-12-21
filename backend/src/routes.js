const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// GET, POST, PUT, DELETE

//O comum ao usar a rota GET é req.query (params)
//Requisição é o que vem do frontend // response é a resposta do servidor
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);
routes.put('/update', DevController.update);
routes.delete('/delete', DevController.destroy);

module.exports = routes;
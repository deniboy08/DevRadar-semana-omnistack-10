const express = require('express'); //Puxando o express

const mongoose = require('mongoose');
const routes = require('./routes')
//Cors serve para remover o bloqueio de endereços
const cors = require('cors');

const app = express();


//Conexão com o banco de dados no SQL
//mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack.yc0ywnr.mongodb.net/semana10?retryWrites=true&w=majority', {
//    useNewUrlParser: true,
//   useUnifiedTopology: true
//});


mongoose.connect('mongodb://omnistack:omnistack@ac-p6fu6c3-shard-00-00.yc0ywnr.mongodb.net:27017,ac-p6fu6c3-shard-00-01.yc0ywnr.mongodb.net:27017,ac-p6fu6c3-shard-00-02.yc0ywnr.mongodb.net:27017/semana10?ssl=true&replicaSet=atlas-qw24bs-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Tipos de parâmetros

//Query Params: request.query (Filtros, ordenação, paginação, ...)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

//app.use() Vale para todas rotas da aplicação


app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333); //Definindo a porta


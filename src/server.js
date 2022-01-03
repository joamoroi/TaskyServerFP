const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');

const server = express();

//Settings
server.set('PORT', 4500);

//Middlewares
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Routes
server.use('/api/user', routes.user);
server.use('/api/task', routes.task);
server.use('/api/subtask', routes.subtask);

//Static_Folder
server.use(express.static(path.join(__dirname, 'statics')));

module.exports = server;

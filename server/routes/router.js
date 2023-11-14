const express = require('express');
const route = express.Router()
const controller = require('../controller/controller');
const services = require('../services/render');

route.get('/', services.homeRoutes);

route.get('/add_P',services.Add_P);

route.get('/Register',services.RegRoutes);

route.post('/reg/users',controller.create);

route.post('/log/users',controller.login);

route.post('/submit_review',controller.SubmitUserRev)

route.post('/Add_p',controller.createProduct);

module.exports = route


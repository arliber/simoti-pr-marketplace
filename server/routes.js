const express = require('express');
const config = require('./config');
/*const streamToPromise = require('stream-to-promise');*/

// MIddlewares
const jwtMiddleware = require('./middlewares/jwt.middleware');
const uploadMiddleware = require('./middlewares/upload.middleware');
const demoRejector = require('./middlewares/demoRejector.middleware');

// Controllers
const usersController = require('./controllers/users.controller.js');
const articlesController = require('./controllers/articles.controller');
const publicationsController = require('./controllers/publications.controller');
const dashboardController = require('./controllers/dashboard.controller');

// Routes
const routes = express.Router();

// Users
routes.post('/api/signup', usersController.signup);
routes.post('/api/signin', usersController.signin);

// Articles
routes.get('/api/articles', jwtMiddleware, articlesController.getArticles);
routes.get('/api/articles/me', jwtMiddleware, articlesController.getUserArticles);
routes.put('/api/articles', jwtMiddleware, demoRejector, uploadMiddleware, articlesController.addArticle);
routes.post('/api/articles/:id/propositions', jwtMiddleware, demoRejector, uploadMiddleware, articlesController.addProposition);
routes.post('/api/articles/:id/propositions/:userId', jwtMiddleware, demoRejector, uploadMiddleware, articlesController.updatePropositionStatus);

// Publications
routes.get('/api/publications', jwtMiddleware, publicationsController.getPublications);
routes.get('/api/publications/me', jwtMiddleware, publicationsController.getUserPublications);
routes.put('/api/publications', jwtMiddleware, demoRejector, uploadMiddleware, publicationsController.addPublication);
routes.post('/api/publications/:id/propositions', jwtMiddleware, demoRejector, uploadMiddleware, publicationsController.addProposition);
routes.post('/api/publications/:id/propositions/:userId', jwtMiddleware, demoRejector, uploadMiddleware, publicationsController.updatePropositionStatus);

// Dashboard
routes.get('/api/dashboard', jwtMiddleware, dashboardController.getDashboard);

module.exports = routes;

/*
#######################################################################
#
# Copyright (C) 2020-2026  David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import express from 'express';
import cors from 'cors';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'node:path';
import OpenApiValidator from 'express-openapi-validator';
import {fileURLToPath} from 'node:url';
import http from 'http';


// Model and Routes
import {check} from './middleware/auth.js';
import {login} from './route/login.js';
import {
  getAll,
  getGroups,
  getGroupPosts,
  getMyPosts,
  createPost,
  likePost,
  unlikePost,
} from './route/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/api/v0/docs', swaggerUi.serve, swaggerUi.setup(apidoc));

// Allow connections from a non common origin so dev and preview
// UIs can connect
app.use(cors(
    {origin: 'http://localhost:3000'},
    {origin: 'http://localhost:4173'},
    {origin: 'https://meowlchat.onrender.com/'}
));

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

// Your routes go here; however, do NOT write then inline.
// Create additional modules and delegate to their exports.

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

// Login
app.post('/api/v0/login', login);

// Posts
app.get('/api/v0/post', check, getAll); // Public + Curr User
app.get('/api/v0/post/mine', check, getMyPosts); // Curr Users
app.post('/api/v0/post', check, createPost);

// Like System
app.post('/api/v0/post/:postid/like', check, likePost);
app.delete('/api/v0/post/:postid/like', check, unlikePost);


// Groups
app.get('/api/v0/group', check, getGroups);
app.get('/api/v0/group/:groupID/post', check, getGroupPosts);

const server = http.createServer(app);
// const wss = new WebSocketServer({server});

// wss.on('connection', (ws) => {
//   socket.connect(ws);
// });
export default server;

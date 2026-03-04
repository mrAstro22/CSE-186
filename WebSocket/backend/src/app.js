/*
#######################################################################
#
# Copyright (C) 2026 David C. Harrison. All right reserved.
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
import {WebSocketServer} from 'ws';

import * as book from './router/book.js';
import * as socket from './socket/book.js';

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
));

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

app.get('/api/v0/book', book.getAll);
app.post('/api/v0/book', book.post);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

const server = http.createServer(app);
const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
  socket.connect(ws);
});

export default server;

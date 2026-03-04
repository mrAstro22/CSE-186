/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import { WebSocket } from 'ws';

const clients = new Map();

export function connect(ws, req) {
  try {
    const params = new URLSearchParams(req.url.split('?')[1]);
    const token = params.get('token');

    if (!token) {
      ws.close();
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    console.log('User', userId, 'connected');
    clients.set(userId, ws);

    ws.on('close', () => {
      console.log('User', userId, 'disconnected');
      clients.delete(userId);
    });

  } catch (err) {
    console.log('Invalid token');
    ws.close();
  }
}

export function broadcast(book) {
  console.log('Broadcast ', book, clients.size, 'clients' );
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(book));
    }
  });
}

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

const clients = new Map();

export function connect(ws) {
  const id = Date.now(); 
  console.log('Client', id, 'connected');
  clients.set(id, ws);
  ws.on('close', () => {
    console.log('Client', id, 'closed');
    clients.delete(id);
  });
}

export function broadcast(book) {
  console.log('Broadcast ', book, clients.size, 'clients' );
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(book));
    }
  });
}

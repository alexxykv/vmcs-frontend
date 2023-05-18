import { io } from 'socket.io-client';
import { ChangeSet } from '@codemirror/state';

export const URL = process.env.REACT_APP_CODE_URL;

export const socket = io(URL, {
  autoConnect: true,
  extraHeaders: {
    'ngrok-skip-browser-warning': true
  },
  transports: ['websocket'],
});

export const getDocument = (directoryId, fileId) => {
  socket.emit('getDocument', directoryId, fileId);

  return new Promise((resolve, _) => {
    socket.on('getDocument', document => {
      resolve(document);
    });
  });
}

export const pullUpdates = (version, directoryId, fileId) => {
  socket.emit('pullUpdates', version, directoryId, fileId);

  return new Promise((resolve, _) => {
    socket.on('pullUpdates', updates => {
      resolve(updates.map(u => {
        return {
          changes: ChangeSet.fromJSON(u.changes),
          clientID: u.clientID,
          fileId
        }
      }));
    });
  });
}

export const pushUpdates = (version, fullUpdates, directoryId, fileId) => {
  const updates = fullUpdates.map(u => ({
    clientID: u.clientID,
    changes: u.changes.toJSON()
  }));

  socket.emit('pushUpdates', version, updates, directoryId, fileId);

  return new Promise((resolve, _) => {
    socket.on('pushUpdates', success => {
      resolve(success);
    });
  });
}

export const connectCodeshare = (directory) => {
  socket.emit('connectCodeshare', directory);
  return new Promise((resolve, _) => {
    socket.on('connectCodeshare', success => {
      resolve(success);
    });
  });
}

export const createFile = (directoryId, file) => {
  socket.emit('createFile', directoryId, file);
  return new Promise((resolve, _) => {
    socket.on('createFile', success => {
      resolve(success);
    });
  });
}
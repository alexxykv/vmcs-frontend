import { collab } from '@codemirror/collab';
import { ViewPlugin } from '@codemirror/view';
import { receiveUpdates, sendableUpdates, getSyncedVersion } from '@codemirror/collab';
import { pushUpdates, pullUpdates } from './socket';
import CollabPlugin from './CollabPlugin';

export const collabExtension = (startVersion, repositoryId, fileId) => {
  return [
    collab({ startVersion }),
    ViewPlugin.fromClass(function (view) {
      return new CollabPlugin(view, repositoryId, fileId)
    })
  ];
}
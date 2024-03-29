import { receiveUpdates, sendableUpdates, getSyncedVersion } from '@codemirror/collab';
import { pushUpdates, pullUpdates } from './socket';
import { socket } from './socket';

class CollabPlugin {
  constructor(view, repositoryId, fileId) {
    this.view = view;
    this.repositoryId = repositoryId;
    this.fileId = fileId;
    this.done = false;
    this.pushing = false;
    this.pull();
  }

  update(update) {
    if (update.docChanged) {
      this.push();
    }
  }

  async push() {
    const updates = sendableUpdates(this.view.state);
    if (this.pushing || !updates.length) {
      return;
    }
    this.pushing = true;
    let version = getSyncedVersion(this.view.state);
    await pushUpdates(version, updates, this.repositoryId, this.fileId);
    this.pushing = false;
    if (sendableUpdates(this.view.state).length) {
      setTimeout(() => this.push(), 100);
    }
  }

  async pull() {
    while (!this.done) {
      let version = getSyncedVersion(this.view.state);
      console.log('Version: ', version);
      let updates = await pullUpdates(version, this.repositoryId, this.fileId);
      console.log('Updates: ', updates);
      // TODO: GOVNO ISPRAVITb
      try {
        this.view.dispatch(receiveUpdates(this.view.state, updates));
      } catch (e) { }
    }
  }

  destroy() {
    this.done = true;
  }
}

export default CollabPlugin;
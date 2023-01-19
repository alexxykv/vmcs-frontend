import { HubConnectionState } from "@microsoft/signalr";
import Hub from "./Hub";

export enum Action {
  Insert,
  Delete
}

export interface ITextFile {
  id: number
  name: string
  text: string
  isDeleted: boolean
}

export interface IFolder {
  id: number
  name: string
  files: ITextFile[]
  folders: IFolder[]
}

export interface IRepository {
  id: string
  meetingId: string
  name: string
  directory: IFolder
}

// export interface IChangeInfo {
//   repoId: string
//   fileId: number
//   position: number
//   action: Action
//   insertedChars: number[]
//   charsDeleted: number[]
// }

export default class CodeSharingHub extends Hub {
  upload(file: ITextFile, folderId: number, repoId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('Upload', file, folderId, repoId);
    }
  }

  onUpload(callback: (file: ITextFile, folderId: number, repoId: string) => void) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.on('Upload', (file, folderId, repoId) => {
        callback(file, folderId, repoId);
      });
    }
  }

  connectToRepository(repositoryId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('ConnectToRepository', repositoryId);
    }
  }

  onConnectToRepository(callback: (repository: IRepository) => void) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.on('ConnectToRepository', (repository) => {
        callback(repository);
      });
    }
  }

  createRepository(meetingId: string, repoName: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('CreateRepository', meetingId, repoName);
    }
  }

  saveRepository(repoId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('SaveRepository', repoId);
    }
  }

  createFolder(folderName: string, repoId: string, parentFolderId: number) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('CreateFolder', folderName, repoId, parentFolderId);
    }
  }

  onCreateFolder(callback: (folderName: string, repoId: string, parentFolderId: number) => void) {
    if (this.Connection.state === HubConnectionState.Connected) {
      // В неправильном порядке это нормали
      this.Connection.on('CreateFolder', (folderName, parentFolderId, repoId) => {
        callback(folderName, repoId, parentFolderId);
      });
    }
  }

  change(text: string, repositoryId: string, fileId: number) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('Change', text, repositoryId, fileId);
    }
  }

  onChange(callback: (text: string, repositoryId: string, fileId: number) => void) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.on('Change', (text, repositoryId, fileId) => {
        callback(text, repositoryId, fileId);
      });
    }
  }

  offUpload() {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.off('Upload');
    }
  }

  offConnectToRepository() {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.off('ConnectToRepository');
    }
  }

  offCreateFolder() {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.off('CreateFolder');
    }
  }

  offChange() {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.off('Change');
    }
  }
}
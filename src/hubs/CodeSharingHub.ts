import { HubConnectionState } from "@microsoft/signalr";
import Hub from "./Hub";

export enum Action {
  Insert,
  Delete
}

export interface TextFile {
  id: number
  name: string
  textInBytes: number[]
}

export interface Folder {
  id: number
  name: string
  files: TextFile[]
  folders: Folder[]
}

export interface Repository {
  id: string
  meetingId: string
  name: string
  directory: Folder
}

export interface ChangeInfo {
  repoId: string
  fileId: number
  position: number
  action: Action
  insertedChars: number[]
  charsDeleted: number[]
}

export default class CodeSharingHub extends Hub {
  upload(file: TextFile, folderId: number, repoId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('Upload', file, folderId, repoId);
    }
  }

  onUpload(callback: (file: TextFile, folderId: number, repoId: string) => void) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.on('Upload', (file, folderId, repoId) => {
        callback(file, folderId, repoId);
      });
    }
  }

  connectToRepository(meetingId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('ConnectToRepository', meetingId);
    }
  }

  onConnectToRepository(callback: (repository: Repository) => void) {
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

  change(change: ChangeInfo) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('Change', change);
    }
  }

  onChange(callback: (change: ChangeInfo) => void) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.on('Change', (change) => {
        callback(change);
      });
    }
  }
}
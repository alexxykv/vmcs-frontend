import { HubConnectionState } from "@microsoft/signalr";
import Hub from "./Hub";


export interface IDirectory {
  id: string
  name: string
  meetingId: string
  rootFolder: IFolder
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

export interface TextFileReturnDTO {
  id: string
  name: string
  text: string
}

export interface TextFileDTO {
  name: string
  text: string
}

export interface FolderReturnDTO {
  id: number
  name: string
  files: ITextFile[]
  folders: IFolder[]
}


export default class CodeSharingHub extends Hub {
  createFile(file: TextFileDTO, folderId: number, directoryId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('CreateFile', file, folderId, directoryId);
    }
  }

  onCreateFile(callback: (file: TextFileReturnDTO) => void) {
    this.Connection.on('CreateFile', (file) => {
      callback(file);
    });
  }

  connectToRepository(directoryId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('ConnectToRepository', directoryId);
    }
  }

  onConnectToRepository(callback: (directory: IDirectory) => void) {
    this.Connection.on('ConnectToRepository', (directory) => {
      callback(directory);
    });
  }

  saveRepository(directoryId: string) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('SaveRepository', directoryId);
    }
  }

  createFolder(folderName: string, directoryId: string, parentFolderId: number) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('CreateFolder', folderName, directoryId, parentFolderId);
    }
  }

  onCreateFolder(callback: (folder: FolderReturnDTO) => void) {
    this.Connection.on('CreateFolder', (folder) => {
      callback(folder);
    });
  }

  change(text: string, directoryId: string, fileId: number) {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.invoke('Change', text, directoryId, fileId);
    }
  }

  onChange(callback: (text: string, directoryId: string, fileId: number) => void) {
    this.Connection.on('Change', (text, directoryId, fileId) => {
      callback(text, directoryId, fileId);
    });
  }

  offCreateFile() {
    if (this.Connection.state === HubConnectionState.Connected) {
      this.Connection.off('CreateFile');
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
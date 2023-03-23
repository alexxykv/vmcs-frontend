import { json } from "stream/consumers";
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
  versionId: number
}

export interface IFolder {
  id: number
  name: string
  files: ITextFile[]
  folders: IFolder[]
}

export interface TextFileReturnDTO {
  id: number
  name: string
  text: string
  versionId: number
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

export interface ChangeDTO {
  directoryId: string
  fileId: number
  change: Change
  connectionId: string
}

export interface Change {
  position: number
  action: number
  insertedString: string
  charsDeleted: number
  versionId: number
  changeId: number
}


export default class CodeSharingHub extends Hub {
  createFile(file: TextFileDTO, folderId: number, directoryId: string) {
    return this.Connection.invoke('CreateFile', file, folderId, directoryId);
  }

  onCreateFile(callback: (file: TextFileReturnDTO) => void) {
    this.Connection.on('CreateFile', (file) => {
      callback(file);
    });
  }

  connectToRepository(directoryId: string) {
    this.Connection.invoke('ConnectToRepository', directoryId);
  }

  onConnectToRepository(callback: (directory: IDirectory) => void) {
    this.Connection.on('ConnectToRepository', (directory) => {
      callback(directory);
    });
  }

  saveRepository(directoryId: string) {
    return this.Connection.invoke('SaveRepository', directoryId);
  }

  createFolder(folderName: string, directoryId: string, parentFolderId: number) {
    return this.Connection.invoke('CreateFolder', folderName, directoryId, parentFolderId);
  }

  onCreateFolder(callback: (folder: FolderReturnDTO) => void) {
    this.Connection.on('CreateFolder', (folder) => {
      callback(folder);
    });
  }

  change(change: ChangeDTO) {
    return this.Connection.invoke('Change', JSON.stringify(change));
  }

  onChange(callback: (change: ChangeDTO) => void) {
    this.Connection.on('Change', (change) => {
      callback(change);
    });
  }

  offCreateFile() {
    return this.Connection.off('CreateFile');
  }

  offConnectToRepository() {
    return this.Connection.off('ConnectToRepository');
  }

  offCreateFolder() {
    return this.Connection.off('CreateFolder');
  }

  offChange() {
    return this.Connection.off('Change');
  }
}
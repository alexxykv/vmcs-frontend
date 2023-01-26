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
  id: number
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

  change(text: string, directoryId: string, fileId: number) {
    return this.Connection.invoke('Change', text, directoryId, fileId);
  }

  onChange(callback: (text: string, directoryId: string, fileId: number) => void) {
    this.Connection.on('Change', (text, directoryId, fileId) => {
      callback(text, directoryId, fileId);
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
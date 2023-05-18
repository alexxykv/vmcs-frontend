import { ChangeDTO, FolderReturnDTO, IDirectory, TextFileDTO, TextFileReturnDTO } from "../interfaces/dto";
import Hub from "./Hub";

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

  change(directoryId: string, fileId: number, text: string) {
    return this.Connection.invoke('Change', directoryId, fileId, text);
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
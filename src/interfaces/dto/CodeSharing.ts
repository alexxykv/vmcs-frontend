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
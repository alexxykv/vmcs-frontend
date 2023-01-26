import React, { useState, useEffect, useCallback } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { Paper, ButtonGroup, IconButton, TextField, Button, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import SaveIcon from '@mui/icons-material/Save';
import GitHubIcon from '@mui/icons-material/GitHub';

import { IFolder, IDirectory, ITextFile, TextFileDTO } from '../hubs/CodeSharingHub';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';
import { Directories, Users } from '../api';
import { saveAs as saveZip } from 'file-saver';
import Github from '../api/Github';
import { PushToRepositoryData } from '../interfaces/dto';
import { useUser } from '../hooks/useUser';
import { useNavigate } from "react-router-dom";
import { relative } from 'path';

interface RepositoryAsideProps {
  repository: IDirectory
  selectFile: (file: ITextFile) => void
  setFiles: React.Dispatch<React.SetStateAction<Map<string, ITextFile>>>
  files: Map<string, ITextFile>
}

const RepositoryAside: React.FC<RepositoryAsideProps> = ({ repository, selectFile, setFiles, files }) => {
  const navigate = useNavigate();
  const codeHub = useCodeSharingHub();
  const user = useUser();
  const [directory, setDirectory] = useState<IFolder>(repository.rootFolder);
  const [folders, setFolders] = useState<Map<string, IFolder>>(new Map());
  const [selectedNode, setSelectedNode] = useState<string>(directory.id.toString());
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<string>(selectedNode);
  const [name, setName] = useState<string>('');

  const getFiles = useCallback((folder: IFolder) => {
    const files = [...folder.files];
    folder.folders.forEach(f => {
      files.push(...getFiles(f));
    });
    return files;
  }, []);

  const getFolders = useCallback((folder: IFolder) => {
    const folders = [folder];
    folder.folders.forEach(f => {
      folders.push(...getFolders(f));
    });
    return folders;
  }, []);

  const updateDirectory = useCallback((file?: ITextFile, folder?: IFolder) => {
    let founded = false;
    const find = (_folder: IFolder) => {
      if (founded) return;
      ///// TODO: selectedFolder -> parentId
      if (_folder.id.toString() === selectedFolder) {
        if (file !== undefined) {
          _folder.files.push(file);
        }
        if (folder !== undefined) {
          _folder.folders.push(folder);
        }
        founded = true;
        return;
      }
      _folder.folders.forEach((f) => {
        find(f);
      });
    };

    const newDirectory = JSON.parse(JSON.stringify(directory)) as IFolder;
    find(newDirectory);
    setDirectory(newDirectory);
  }, [directory, selectedFolder]);

  useEffect(() => {
    const files = getFiles(directory);
    setFiles(new Map(files.map(file => {
      const id = file.id.toString();
      return [id, file];
    })));

    const folders = getFolders(directory);
    setFolders(new Map(folders.map(folder => {
      const id = folder.id.toString();
      return [id, folder];
    })));
  }, [directory, getFiles, getFolders]);

  useEffect(() => {
    codeHub.onCreateFolder((folder) => {
      const id = folder.id.toString();
      setFolders(prev => prev.set(id, folder));
      updateDirectory(undefined, folder as IFolder);
    });

    codeHub.onCreateFile((file) => {
      const id = file.id.toString();
      // TODO: TextFileReturnDTO -> ITextFile
      const newFile: ITextFile = {
        ...file,
        isDeleted: false
      };
      setFiles(prev => prev.set(id, newFile));
      updateDirectory(newFile);
    });

    codeHub.onChange((text, directoryId, fileId) => {
      const file = files.get(fileId.toString()) as ITextFile;

      if (text === file.text) {
        return;
      }

      const newFile: ITextFile = {
        ...file,
        text
      };
      setFiles(prev => new Map(prev).set(fileId.toString(), newFile));

      // if (changeInfo.cliendId === codeHub.Connection.connectionId || (changeInfo.insertedString === '' && changeInfo.charsDeleted === 0)){
      //   console.log('NE ONCHANGE');
      //   return;
      // }
      // console.log("ONCHANGE")
      // const file = files.get(changeInfo.fileId.toString()) as ITextFile;

      // let text = file.text;
      // console.log(changeInfo)

      // if (changeInfo.action === 0){
      //   text = text.substring(0, changeInfo.position) + changeInfo.insertedString + text.substring(changeInfo.position, text.length);
      // }

      // if (changeInfo.action === 1){
      //   text = text.substring(0, changeInfo.position) + text.substring(changeInfo.position + changeInfo.charsDeleted, text.length);
      // }

      // TODO: Change it
      // console.log(fileId, selectedFile)
      if (fileId === parseInt(selectedFile)) {
        selectFile(newFile);
      }
    });

    return () => {
      codeHub.offCreateFile();
      codeHub.offCreateFolder();
      codeHub.offChange();
    };
  }, [codeHub, files, updateDirectory, selectedFile, selectFile]);

  const addFile = useCallback((name: string, parentId: string) => {
    const file: TextFileDTO = { name, text: '' };
    codeHub.createFile(file, parseInt(parentId), repository.id);
  }, [codeHub, repository.id]);

  const addFolder = useCallback((name: string, parentId: string) => {
    codeHub.createFolder(name, repository.id, parseInt(parentId));
  }, [codeHub, repository.id]);

  const handleSelectNode = (event: React.SyntheticEvent, nodeId: string) => {
    setSelectedNode(nodeId);

    const file = files.get(nodeId);
    if (file !== undefined) {
      setSelectedFile(file.id.toString())
      selectFile(file);
      folders.forEach((folder, id) => {
        const fileIds = folder.files.map(f => f.id);
        if (fileIds.includes(file.id)) {
          setSelectedFolder(id);
        }
      });
    }

    const folder = folders.get(nodeId);
    if (folder !== undefined) {
      setSelectedFolder(nodeId);
    }
  };

  const handleClickAddFile = () => {
    addFile(name, selectedFolder);
    setName('');
  };

  const handleClickAddFolder = () => {
    addFolder(name, selectedFolder);
    setName('');
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClickSaveRepository = () => {
    codeHub.saveRepository(repository.id);
  }

  const handleClickPushToGithub = () => {
    const data: PushToRepositoryData = {
      repositoryName: repository.name,
      directoryId: repository.id,
      message: "Commited by VMCS"
    }

    codeHub.saveRepository(repository.id).then(() => {
      Users.IsUserHaveAccessToken().then(isHaveToken => {
        console.log(isHaveToken)
        if (!isHaveToken) {
          const redirectUri = `${process.env.REACT_APP_HOST_URL}/github/signin?userId=${user.id}`;
          const encodedRedirectUri = encodeURIComponent(redirectUri);
          const url = `https://github.com/login/oauth/authorize?client_id=${Github.CLIENT_ID}&redirect_uri=${encodedRedirectUri}&scope=repo&response_type=code`;
          window.open(url, '_blank');
        } else {
          Github.PushToRepository(data);
        }
      })
    })
  }

  const handleClickDownloadZip = useCallback(() => {
    codeHub.saveRepository(repository.id).then(() => {
      Directories.Get(repository.id).then((directory) => {
        const byteCharacters = window.atob(directory.directoryZip)
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        saveZip(blob, `${directory.name}.zip`);
      })
    })
  }, []);

  const renderTreeDirectory = (folder: IFolder) => {
    return (
      <TreeItem key={folder.id} nodeId={folder.id.toString()} label={folder.name}>
        {folder.folders.map(folder => renderTreeDirectory(folder))}
        {folder.files.map(file => {
          return (
            <TreeItem key={file.id} nodeId={file.id.toString()} label={file.name} />
          );
        })}
      </TreeItem>
    );
  };

  return (
    <Paper
      square
      variant='outlined'
      sx={{
        minWidth: 240,
        maxWidth: 240,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
        borderBottom: 'none',
        borderLeft: 'none',
        borderTop: 'none'
      }}>
      <TreeView
        selected={selectedNode}
        onNodeSelect={handleSelectNode}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '4px',
          },
          '&:hover': {
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'primary.light'
            }
          },
        }}
      >
        {renderTreeDirectory(directory)}
      </TreeView>
      <TextField
        size='small'
        value={name}
        onChange={handleChangeName}
        InputProps={{
          endAdornment:
            <InputAdornment position='end'>
              <IconButton color='primary' onClick={handleClickAddFile}>
                <NoteAddIcon />
              </IconButton>
              <IconButton color='primary' onClick={handleClickAddFolder}>
                <CreateNewFolderIcon />
              </IconButton>
            </InputAdornment>
        }}
        sx={{
          backgroundColor: 'action.hover'
        }}
      />
      <Paper
        elevation={4}
        sx={{
          p: 1,
        }}>
        <ButtonGroup fullWidth orientation='vertical' variant='outlined' color='primary' size='small'>
          <Button
            onClick={handleClickSaveRepository}
            startIcon={<SaveIcon />} >
            Save
          </Button>
          <Button
            onClick={handleClickDownloadZip}
            startIcon={<FolderZipIcon />}>
            Download zip
          </Button>
          <Button
            onClick={handleClickPushToGithub}
            startIcon={<GitHubIcon />}>
            Push to GitHub
          </Button>
        </ButtonGroup>
      </Paper>
    </Paper>
  );
}


export default RepositoryAside;
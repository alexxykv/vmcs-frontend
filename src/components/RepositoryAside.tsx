import React, { useState, useEffect, useCallback } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { Box, ButtonGroup, IconButton, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderZipIcon from '@mui/icons-material/FolderZip';

import { IFolder, IDirectory, ITextFile, TextFileDTO } from '../hubs/CodeSharingHub';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';
import { Directories } from '../api';
import JSZip from 'jszip';


interface RepositoryAsideProps {
  repository: IDirectory
  selectFile: (file: ITextFile) => void
}

const RepositoryAside: React.FC<RepositoryAsideProps> = ({ repository, selectFile }) => {
  const codeHub = useCodeSharingHub();
  const [directory, setDirectory] = useState<IFolder>(repository.rootFolder);
  const [files, setFiles] = useState<Map<string, ITextFile>>(new Map());
  const [folders, setFolders] = useState<Map<string, IFolder>>(new Map());
  const [selectedNode, setSelectedNode] = useState<string>(directory.id.toString());
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
      console.log('Папка создана', folder);
    });

    codeHub.onCreateFile((file) => {
      console.log('Файл создан', file);
    });

    codeHub.onChange((text, repositoryId, fileId) => {
      const file = files.get(fileId.toString()) as ITextFile;
      const newFile: ITextFile = {
        ...file,
        text
      };
      setFiles(prev => new Map(prev).set(fileId.toString(), newFile));
    });

    return () => {
      codeHub.offCreateFile();
      codeHub.offCreateFolder();
      codeHub.offChange();
    };
  }, [codeHub, files]);

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
      selectFile(file);
    }

    const folder = folders.get(nodeId);
    if (folder !== undefined) {
      setSelectedFolder(nodeId);
    }
  };

  const handleClickAddFile = () => {
    // setFiles() or setDirectory() ?????
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

  const handleClickDownloadZip = useCallback(() => {
    codeHub.saveRepository(repository.id);
    Directories.Get(repository.id).then((directory) => {
      var zip = new JSZip();
      var zipData = directory.directoryZip
      zip.file("response.txt", zipData);
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          saveAs(content, `${directory.name}.zip`);
        });
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TreeView
        selected={selectedNode}
        onNodeSelect={handleSelectNode}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ maxHeight: '600px', p: 2, minWidth: 200, maxWidth: 400, overflowY: 'auto' }}
      >
        {renderTreeDirectory(directory)}
      </TreeView>
      <ButtonGroup sx={{ justifyContent: 'center' }}>
        <IconButton onClick={handleClickAddFile}>
          <NoteAddIcon />
        </IconButton>
        <IconButton onClick={handleClickAddFolder}>
          <CreateNewFolderIcon />
        </IconButton>
        <IconButton onClick={handleClickDownloadZip}>
          <FolderZipIcon />
        </IconButton>
      </ButtonGroup>
      <TextField
        value={name}
        onChange={handleChangeName}
      />
    </Box>
  );
}


export default RepositoryAside;

function saveAs(content: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

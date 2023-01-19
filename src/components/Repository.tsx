import React, { useCallback, useEffect, useState } from 'react'
import { Box, ButtonGroup, IconButton, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/lab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

import Editor from './Editor';
import { IFolder, IRepository, ITextFile } from '../hubs/CodeSharingHub';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';


interface RepositoryProps {
  repository: IRepository
}

const Repository: React.FC<RepositoryProps> = ({ repository }) => {
  const codeHub = useCodeSharingHub();

  const [files, setFiles] = useState<Map<number, ITextFile>>(new Map());
  const [directory, setDirectory] = useState<IFolder>(repository.directory);
  const [selected, setSelected] = useState<string>(repository.directory.id.toString());

  useEffect(() => {
    codeHub.onCreateFolder((folderName, repoId, parentFolderId) => {
      console.log('Папка создана ёба')
    });

    return () => {
      codeHub.offCreateFolder();
    };
  }, [codeHub]);

  const getFiles = useCallback((folder: IFolder) => {
    const files = [...folder.files];
    folder.folders.forEach(f => {
      files.push(...getFiles(f));
    });
    return files;
  }, []);

  useEffect(() => {
    const files = getFiles(directory);
    setFiles(new Map(files.map(file => [file.id, file])));
  }, [directory, getFiles]);

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

  const handleNodeSelect = (event: React.SyntheticEvent, nodeId: string) => {
    setSelected(nodeId);
  };

  const handleClickAddFile = () => {

  };

  const handleClickAddFolder = () => {
    codeHub.createFolder(name, repository.id, parseInt(selected));
    setName('');
  };

  const [name, setName] = useState<string>('');

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TreeView
          selected={selected}
          onNodeSelect={handleNodeSelect}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ maxHeight: '600px', p: 2, minWidth: 200, maxWidth: 200, overflowY: 'auto' }}
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
        </ButtonGroup>
        <TextField value={name} onChange={event => setName(event.target.value)} />
      </Box>
      <Editor />
    </Box>
  );
}


export default Repository;
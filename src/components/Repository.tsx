import React, { useCallback, useEffect, useState } from 'react'
import { Box, ButtonGroup, IconButton, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/lab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

import Editor from './Editor';
import { IFolder, IRepository, ITextFile, ITextFileDTO } from '../hubs/CodeSharingHub';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';


interface RepositoryProps {
  repository: IRepository
}

const Repository: React.FC<RepositoryProps> = ({ repository }) => {
  const codeHub = useCodeSharingHub();

  const [files, setFiles] = useState<Map<number, ITextFile>>(new Map());
  const [directory, setDirectory] = useState<IFolder>(repository.directory);
  const [selectedNode, setSelectedNode] = useState<string>(repository.directory.id.toString());
  const [selectedFile, setSelectedFile] = useState<string>('');

  useEffect(() => {
    codeHub.onCreateFolder((folderName, repoId, parentFolderId) => {
      console.log('Папка создана ёба');
    });

    codeHub.onUpload((file, folderId, repoId) => {
      console.log(file, folderId, repoId);
    });

    return () => {
      codeHub.offCreateFolder();
      codeHub.offUpload();
    };
  }, [codeHub]);

  useEffect(() => {
    codeHub.onChange((text, repositoryId, fileId) => {
      const file = files.get(fileId) as ITextFile;
      const newFile: ITextFile = {
        ...file,
        text
      };
      console.log(newFile)
      setFiles(prev => new Map(prev).set(fileId, newFile));
    });
  }, [codeHub, files]);

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
    setSelectedNode(nodeId);
    if (files.has(parseInt(nodeId))) {
      setSelectedFile(nodeId);
    }
  };

  const handleClickAddFile = () => {
    const file: ITextFileDTO = {
      name,
      text: ''
    };

    codeHub.upload(file, parseInt(selectedNode), repository.id);
  };

  const handleClickAddFolder = () => {
    codeHub.createFolder(name, repository.id, parseInt(selectedNode));
    setName('');
  };

  const [name, setName] = useState<string>('');

  const renderSelectedFile = () => {
    const file = files.get(parseInt(selectedFile));
    if (file === undefined) {
      return <SelectFile />
    }
    console.log(file)
    return <Editor file={file} />;
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TreeView
          selected={selectedNode}
          onNodeSelect={handleNodeSelect}
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
        </ButtonGroup>
        <TextField value={name} onChange={event => setName(event.target.value)} />
      </Box>
      {renderSelectedFile()}
    </Box>
  );
}

const SelectFile: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography>
        Select file
      </Typography>
    </Box>
  );
}


export default Repository;
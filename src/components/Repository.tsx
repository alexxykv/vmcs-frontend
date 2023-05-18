import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material';
import Editor from '../codeshare/Editor';
import RepositoryAside from './RepositoryAside';
import { IDirectory, ITextFile } from '../interfaces/dto';
import { connectCodeshare, socket } from '../codeshare/socket';


interface RepositoryProps {
  repository: IDirectory
}

const Repository: React.FC<RepositoryProps> = ({ repository }) => {
  const [selectedFile, setSelectedFile] = useState<ITextFile | null>(null);
  const [files, setFiles] = useState<Map<string, ITextFile>>(new Map());
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    connectCodeshare(repository).then(() => {
      setConnected(true);
    });
  }, [repository]);

  const selectFile = (file: ITextFile) => {
    setSelectedFile(file);
  };

  const renderFileEditor = () => {
    if (selectedFile === null) {
      return <SelectFile />
    }
    return <Editor
      repository={repository}
      file={selectedFile}
      setFiles={setFiles}
      files={files}
      connected={connected}
    />;
  };

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: 1,
      height: '100%'
    }}>
      <RepositoryAside
        repository={repository}
        selectFile={selectFile}
        setFiles={setFiles}
        files={files}
      />
      {renderFileEditor()}
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
      <Typography
        sx={{
          cursor: 'default',
          userSelect: 'none'
        }}>
        Select file
      </Typography>
    </Box>
  );
}


export default Repository;
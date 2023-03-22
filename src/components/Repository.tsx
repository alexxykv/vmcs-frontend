import React, { useState } from 'react'
import { Box, Typography, Paper } from '@mui/material';
import Editor from './Editor';
import { IDirectory, ITextFile } from '../hubs/CodeSharingHub';
import RepositoryAside from './RepositoryAside';


interface RepositoryProps {
  repository: IDirectory
}

const Repository: React.FC<RepositoryProps> = ({ repository }) => {
  const [selectedFile, setSelectedFile] = useState<ITextFile | null>(null);
  const [files, setFiles] = useState<Map<string, ITextFile>>(new Map());
  const [fileVersionControl, setFileVersionControl] = useState<Map<number, any[]>>(new Map());


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
      fileVersionControl={fileVersionControl}
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
        fileVersionControl={fileVersionControl}
        setFileVersionControl={setFileVersionControl}
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
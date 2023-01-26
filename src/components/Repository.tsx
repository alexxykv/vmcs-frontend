import React, { useState } from 'react'
import { Box, Typography } from '@mui/material';
import Editor from './Editor';
import { IDirectory, ITextFile } from '../hubs/CodeSharingHub';
import RepositoryAside from './RepositoryAside';


interface RepositoryProps {
  repository: IDirectory
}

const Repository: React.FC<RepositoryProps> = ({ repository }) => {
  const [selectedFile, setSelectedFile] = useState<ITextFile | null>(null);

  const selectFile = (file: ITextFile) => {
    setSelectedFile(file);
  };

  const renderFileEditor = () => {
    if (selectedFile === null) {
      return <SelectFile />
    }
    return <Editor repository={repository} file={selectedFile} />;
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, height: '500px' }}>
      <RepositoryAside
        repository={repository}
        selectFile={selectFile}
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
      <Typography>
        Select file
      </Typography>
    </Box>
  );
}


export default Repository;
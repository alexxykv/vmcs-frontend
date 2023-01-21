import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import Editor from './Editor';
import { IFolder, IRepository, ITextFile, ITextFileDTO } from '../hubs/CodeSharingHub';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';
import RepositoryAside from './RepositoryAside';


interface RepositoryProps {
  repository: IRepository
}

const Repository: React.FC<RepositoryProps> = ({ repository }) => {
  const codeHub = useCodeSharingHub();
  const [selectedFile, setSelectedFile] = useState<ITextFile | null>(null);

  const selectFile = (file: ITextFile) => {
    setSelectedFile(file);
  };

  const renderFileEditor = () => {
    if (selectedFile === null) {
      return <SelectFile />
    }
    return <Editor file={selectedFile} />;
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
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
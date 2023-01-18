import React from 'react'
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/lab';
import Editor from './Editor';
import { IFolder, IRepository } from '../hubs/CodeSharingHub';


interface RepositoryProps {
  repository: IRepository
}

const Repository: React.FC<RepositoryProps> = ({ repository }) => {
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
    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ maxHeight: '600px', p: 2, minWidth: 200, maxWidth: 200, overflowY: 'auto' }}
      >
        {renderTreeDirectory(repository.directory)}
      </TreeView>
      <Editor />
    </Box>
  );
}

export default Repository;
import React, { useState } from 'react'
import {
  Box, Button, ButtonGroup, Container, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, Typography
} from '@mui/material';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';
import { useMeeting } from '../hooks/useMeeting';


const Repository: React.FC = () => {
  const meeting = useMeeting();
  const codeHub = useCodeSharingHub();
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const handleCloseCreateRepository = () => {
    setOpenCreate(false);
  };

  const createRepository = (name: string) => {
    codeHub.createRepository(meeting.id, name);
    setOpenCreate(false);
  };

  return (
    <Container>
      <Box p={2}>
        <Typography mb={2}>The repository does not exist yet.</Typography>
        <ButtonGroup>
          <Button onClick={() => setOpenCreate(true)}>Create</Button>
          <Button>Upload</Button>
        </ButtonGroup>
      </Box>

      <CreateRepositoryDialog
        open={openCreate}
        onClose={handleCloseCreateRepository}
        create={createRepository}
      />
    </Container>
  );
}

interface CreateRepositoryDialogProps {
  open: boolean
  onClose: () => void
  create: (name: string) => void
}

const CreateRepositoryDialog: React.FC<CreateRepositoryDialogProps> = ({ open, onClose, create }) => {
  const [name, setName] = useState<string>('');

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClickCancel = () => {
    onClose();
  };

  const handleClickCreate = () => {
    create(name);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create repository</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Repository name'
          type='text'
          fullWidth
          variant='standard'
          value={name}
          onChange={handleChangeName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCancel}>Cancel</Button>
        <Button onClick={handleClickCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}


export default Repository;
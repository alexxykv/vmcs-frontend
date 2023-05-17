import React, { useState } from "react"
import {
  Box, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField, Typography
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadIcon from "@mui/icons-material/Upload";
import { useMeeting } from "../hooks";
import { CreateDirectoryData } from "../interfaces/dto";


interface RepositoryWelcomeProps {
  onCreateRepository: (createData: CreateDirectoryData) => void
}

const RepositoryWelcome: React.FC<RepositoryWelcomeProps> = ({ onCreateRepository }) => {
  const meeting = useMeeting();
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const handleCloseCreateRepository = () => {
    setOpenCreate(false);
  };

  const createRepository = (name: string) => {
    const createData: CreateDirectoryData = {
      name,
      directoryInJSON: '',
      meetingId: meeting.id
    };
    onCreateRepository(createData);
    setOpenCreate(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      p: 2,
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography sx={{
          cursor: 'default',
          userSelect: 'none',
          textAlign: 'center'
        }}>
          The repository does not exist yet.
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          gap: 1
        }}>
          <Button
            startIcon={<CreateIcon />}
            variant='contained'
            onClick={() => setOpenCreate(true)}>
            Create
          </Button>
          <Button
            startIcon={<UploadIcon />}
            variant='contained'>
            Upload
          </Button>
        </Box>
      </Box>

      <CreateRepositoryDialog
        open={openCreate}
        onClose={handleCloseCreateRepository}
        create={createRepository}
      />
    </Box>
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


export default RepositoryWelcome;
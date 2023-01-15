import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface CreateMeetingDialogProps {
  open: boolean
  handleClose: () => void
  createMeeting: (name: string) => void
}

const CreateMeetingDialog: React.FC<CreateMeetingDialogProps> = ({ open, handleClose, createMeeting }) => {
  const [name, setName] = useState<string>('');

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleCreate = () => {
    createMeeting(name);
    setName('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create meeting</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Meeting name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleChangeName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}


export default CreateMeetingDialog;
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";


interface CreateChannelDialogProps {
  open: boolean
  handleClose: () => void
  createChannel: (name: string) => void
}

const CreateChannelDialog: React.FC<CreateChannelDialogProps> = ({ open, handleClose, createChannel }) => {
  const [name, setName] = useState<string>('');

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleCreate = () => {
    createChannel(name);
    setName('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create channel</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Channel name'
          type='text'
          fullWidth
          variant='standard'
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


export default CreateChannelDialog;
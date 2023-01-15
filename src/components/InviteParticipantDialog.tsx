import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Users } from '../api';


interface InviteParticipantDialogProps {
  open: boolean
  handleClose: () => void
  inviteParticipant: (recipientId: string) => void
}

const InviteParticipantDialog: React.FC<InviteParticipantDialogProps> = (
  { open, handleClose, inviteParticipant }
) => {
  const [idParticipant, setIdParticipant] = useState<string>('');

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIdParticipant(event.target.value);
  };

  const handleInvite = () => {
    inviteParticipant(idParticipant);
    setIdParticipant('');
    handleClose();
  };

  // TEMPORARY
  useEffect(() => {
    Users.GetAll().then(users => {
      console.log(users);
    })
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Invite participant</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Recipient ID"
          type="text"
          fullWidth
          variant="standard"
          value={idParticipant}
          onChange={handleChangeName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleInvite}>Invite</Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteParticipantDialog;
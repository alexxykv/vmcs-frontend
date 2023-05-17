import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteChangeDetails, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Users } from "../api";
import { UserData } from "../interfaces/dto";
import { useUser } from "../hooks";


interface InviteParticipantDialogProps {
  open: boolean
  handleClose: () => void
  inviteParticipant: (recipientId: string) => void
}

const InviteParticipantDialog: React.FC<InviteParticipantDialogProps> = (
  { open, handleClose, inviteParticipant }
) => {
  const currentUser = useUser();
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [openAutocomplete, setOpenAutocomplete] = useState<boolean>(false);
  const loading = openAutocomplete && users.length === 0;

  const handleInvite = () => {
    selectedUsers.forEach(user => {
      inviteParticipant(user.id);
    })
    handleClose();
  };

  const handleChange = (event: React.SyntheticEvent, value: UserData[], reason: string, details?: AutocompleteChangeDetails<UserData> | undefined) => {
    setSelectedUsers(value);
  }

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    Users.GetAll().then(users => {
      if (active) {
        setUsers(users);
      }
    });

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!openAutocomplete) {
      setUsers([]);
    }
  }, [openAutocomplete]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Invite participant</DialogTitle>
      <DialogContent>
        <Autocomplete
          multiple
          onChange={handleChange}
          sx={{ width: 300 }}
          open={openAutocomplete}
          onOpen={() => {
            setOpenAutocomplete(true);
          }}
          onClose={() => {
            setOpenAutocomplete(false);
          }}
          isOptionEqualToValue={(user, value) => user.username === value.username}
          getOptionLabel={(user) => user.username}
          getOptionDisabled={(user) => user.id === currentUser.id}
          options={users}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              margin='dense'
              label='Username'
              type='text'
              fullWidth
              variant='standard'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color='inherit' size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
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
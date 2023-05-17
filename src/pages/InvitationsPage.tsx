import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar, Box, IconButton,
  List, ListItem, ListItemAvatar, ListItemText, Paper, Typography
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { ChannelInvitationData } from "../interfaces/dto";
import { Users, ChannelInvitations } from "../api";
import { fakeAsync } from "../utils";
import { Loading } from "../components";


const InvitationsPage: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<Map<string, ChannelInvitationData>>(new Map());

  const uploadInvitations = useCallback(() => {
    fakeAsync(() => {
      Users.GetAllUserChannelInvitations().then(invitations => {
        setInvitations(new Map(invitations.map(invitation => {
          return [
            invitation.id,
            invitation
          ];
        })));
        setUploadedData(true);
      });
    });
  }, [])

  useEffect(() => {
    uploadInvitations();
  }, [uploadInvitations]);

  const acceptInvitation = (invitation: ChannelInvitationData) => {
    ChannelInvitations.Accept(invitation.id);
    setInvitations(prev => {
      const temp = new Map(prev);
      temp.delete(invitation.id);
      return new Map(temp);
    });
  };

  const declineInvitation = (invitation: ChannelInvitationData) => {
    ChannelInvitations.Decline(invitation.id);
    setInvitations(prev => {
      const temp = new Map(prev);
      temp.delete(invitation.id);
      return new Map(temp);
    });
  };

  const render = () => {
    if (invitations.size === 0) {
      return (
        <Box sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          p: 2
        }}>
          <SentimentVeryDissatisfiedIcon sx={{
            color: 'primary.dark',
            height: '15%',
            minHeight: 80,
            width: '15%',
            minWidth: 80,
          }} />
          <Typography sx={{
            textAlign: 'center',
            color: 'primary.dark',
            cursor: 'default'
          }}>
            You haven't been invited anywhere yet
          </Typography>
        </Box>
      );
    }

    return (
      <List sx={{ width: '100%' }}>
        {
          Array.from(invitations.values()).map(invitation => {
            return (
              <InvitationItem
                invitation={invitation}
                accept={acceptInvitation}
                decline={declineInvitation} />
            );
          })
        }
      </List>
    );
  }

  if (uploadedData === false) {
    return <Loading />
  }

  return (
    <Paper square sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
      height: '100%',
      minWidth: 240
    }}>
      {render()}
    </Paper>
  );
}

interface InvitationItemProps {
  invitation: ChannelInvitationData
  accept: (invitation: ChannelInvitationData) => void
  decline: (invitation: ChannelInvitationData) => void
}

const InvitationItem: React.FC<InvitationItemProps> = ({ invitation, accept, decline }) => {
  const handleAccept = () => {
    accept(invitation);
  };

  const handleDecline = () => {
    decline(invitation);
  };

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar>{invitation.channelName[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Invitation to channel «${invitation.channelName}»`}
        secondary={`from ${invitation.senderUsername}`} />
      <Box ml={2}>
        <IconButton color='error' onClick={handleDecline}>
          <DeleteIcon />
        </IconButton>
        <IconButton color='success' onClick={handleAccept}>
          <CheckIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}


export default InvitationsPage;
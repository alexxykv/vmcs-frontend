import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar, Box, Container, IconButton,
  List, ListItem, ListItemAvatar, ListItemText
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../components/Loading';
import { ChannelInvitationData } from '../interfaces/dto';
import Users from '../api/Users';
import ChannelInvitations from '../api/ChannelInvitations';
import { fakeAsync } from '../utils';


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

  return (
    <Container maxWidth={false} sx={{
      display: 'flex',
    }}>
      {
        uploadedData === false
          ? <Loading />
          : <>
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
          </>
      }
    </Container>
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
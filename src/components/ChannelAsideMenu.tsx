import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Divider, Typography } from '@mui/material';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import CreateMeetingDialog from './CreateMeetingDialog';
import InviteParticipantDialog from './InviteParticipantDialog';

import { Meetings, ChannelInvitations } from '../api';
import {
  ChannelData, ChannelInvitationRequestData, CreateMeetingData,
  ShortMeetingData, ShortUserData
} from '../interfaces/dto';
import { WithChildrenProps } from '../interfaces/props';

import * as styles from '../styles';


interface ChannelAsideMenuProps {
  channel: ChannelData
}

const ChannelAsideMenu: React.FC<ChannelAsideMenuProps> = ({ channel }) => {
  const [meetings, setMeetings] = useState<ShortMeetingData[]>(channel.meetings);
  const [participants, setParticipants] = useState<ShortUserData[]>(channel.users);
  const [openCreateMeeting, setOpenCreateMeeting] = useState<boolean>(false);
  const [openInviteParticipant, setOpenInviteParticipant] = useState<boolean>(false);

  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };

  const handleCloseInviteParticipant = () => {
    setOpenInviteParticipant(false);
  }

  const createMeeting = (name: string) => {
    const createData: CreateMeetingData = {
      name,
      channelId: channel.id,
      isInChannel: true
    };
    Meetings.Create(createData).then(meeting => {
      setMeetings(prev => prev.concat(meeting));
    });
  }

  const inviteParticipant = (recipientId: string) => {
    const requestData: ChannelInvitationRequestData = {
      channelId: channel.id,
      recipientId
    };
    ChannelInvitations.Create(requestData).then(() => {
      console.log('Invited');
    });
  }

  return (
    <>
      <Box sx={styles.channelAsideMenu.asideMenu}>
        <Box sx={styles.channelAsideMenu.asideHeader}>
          <Avatar sx={styles.channelAsideMenu.asideHeaderAvatar}>{channel.name[0]}</Avatar>
          <Typography component='h2' sx={styles.channelAsideMenu.asideHeaderTitle}>{channel.name}</Typography>
        </Box>
        <Box sx={styles.channelAsideMenu.asideContent}>
          <AsideBox
            title='Meetings'
            icon={<AddIcCallIcon
              onClick={() => setOpenCreateMeeting(true)}
              sx={styles.channelAsideMenu.asideBoxHeaderIcon} />}>
            {
              meetings.map(meeting => {
                return (
                  <MeetingItem key={meeting.id} meeting={meeting} />
                );
              })
            }
          </AsideBox>
          <AsideBox
            title='Participants'
            icon={<PersonAddIcon
              onClick={() => setOpenInviteParticipant(true)}
              sx={styles.channelAsideMenu.asideBoxHeaderIcon} />}>
            {
              participants.map(participant => {
                return (
                  <ParticipantItem key={participant.id}
                    participant={participant}
                    creator={channel.creator.id === participant.id} />
                );
              })
            }
          </AsideBox>
        </Box>
      </Box>
      <CreateMeetingDialog
        open={openCreateMeeting}
        handleClose={handleCloseCreateMeeting}
        createMeeting={createMeeting}
      />
      <InviteParticipantDialog
        open={openInviteParticipant}
        handleClose={handleCloseInviteParticipant}
        inviteParticipant={inviteParticipant}
      />
    </>
  );
}

interface MeetingItemProps {
  meeting: ShortMeetingData
}

const MeetingItem: React.FC<MeetingItemProps> = ({ meeting }) => {
  const { id, name } = meeting;
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    navigate(`/meeting/${id}`);
  };

  return (
    <Box sx={styles.channelAsideMenu.asideBoxItem} onClick={handleClick}>
      <Typography sx={styles.channelAsideMenu.asideBoxItemTitle}>{name}</Typography>
    </Box>
  );
}

interface ParticipantItemProps {
  participant: ShortUserData
  creator?: boolean
}

const ParticipantItem: React.FC<ParticipantItemProps> = ({ participant, creator }) => {
  return (
    <Box sx={styles.channelAsideMenu.asideBoxItem}>
      <Typography sx={styles.channelAsideMenu.asideBoxItemTitle}>{participant.username}</Typography>
      {
        creator ? <AccessibleForwardIcon /> : <></>
      }
    </Box>
  );
}

interface AsideBoxProps extends WithChildrenProps {
  title: string,
  icon?: React.ReactElement
}

const AsideBox: React.FC<AsideBoxProps> = ({ children, title, icon }) => {
  return (
    <Box sx={styles.channelAsideMenu.asideBox}>
      <Box sx={styles.channelAsideMenu.asideBoxHeader}>
        <Typography component='h3' sx={styles.channelAsideMenu.asideBoxHeaderTitle}>
          {title}
        </Typography>
        {icon}
      </Box>
      <Divider sx={styles.channelAsideMenu.asideBoxDivider} />
      <Box sx={styles.channelAsideMenu.asideBoxItems}>
        {children}
      </Box>
    </Box>
  );
}


export default ChannelAsideMenu;
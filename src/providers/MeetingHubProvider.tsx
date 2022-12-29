import React from 'react';
import Endpoints from '../enums/Endpoints';
import { useHub } from '../hooks/useHub';
import { WithChildrenProps } from '../interfaces/props';
import MeetingHubContext from '../contexts/MeetingHubContext';
import MeetingHub from '../hubs/MeetingHub';


const MeetingHubProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const meetingHub = useHub(MeetingHub, Endpoints.MeetingHub);

  return (
    <MeetingHubContext.Provider value={meetingHub}>
      {children}
    </MeetingHubContext.Provider>
  );
}


export default MeetingHubProvider;
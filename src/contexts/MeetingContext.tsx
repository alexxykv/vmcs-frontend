import { createContext, useCallback, useEffect, useState } from "react";
import { MeetingData } from "../interfaces/dto";
import { useParams } from "react-router-dom";
import { Meetings } from "../api";
import Loading from "../components/Loading";
import { WithChildrenProps } from "../interfaces/Props";

export const MeetingContext = createContext<MeetingData>(null!);

export const MeetingProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const { id } = useParams();
  const meetingId = id as string;
  const [meeting, setMeeting] = useState<MeetingData>(null!);

  const uploadMeetingData = useCallback(() => {
    Meetings.Get(meetingId).then(meeting => {
      setMeeting(meeting);
    })
  }, [meetingId]);

  useEffect(() => {
    uploadMeetingData();
  }, [uploadMeetingData]);

  if (meeting === null) {
    return <Loading />
  }

  return (
    <MeetingContext.Provider value={meeting}>
      {children}
    </MeetingContext.Provider>
  );
}
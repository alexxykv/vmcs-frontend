import { createContext } from "react";
import { MeetingHubContextType } from "../interfaces/Contexts";
import { WithChildrenProps } from "../interfaces/Props";
import { useHub } from "../hooks";
import { MeetingHub } from "../hubs";

export const MeetingHubContext = createContext<MeetingHubContextType>(null!);

export const MeetingHubProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const meetingHub = useHub(MeetingHub);

  return (
    <MeetingHubContext.Provider value={meetingHub}>
      {children}
    </MeetingHubContext.Provider>
  );
}
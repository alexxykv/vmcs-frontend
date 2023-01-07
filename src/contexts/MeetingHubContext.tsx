import { createContext } from "react";
import { MeetingHubContextType } from "../interfaces/contexts";

export const defaultMeetingHubContext: MeetingHubContextType = null!;
const MeetingHubContext = createContext<MeetingHubContextType>(defaultMeetingHubContext);

export default MeetingHubContext;
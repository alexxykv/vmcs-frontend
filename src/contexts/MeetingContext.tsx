import { createContext } from "react";
import { MeetingData } from "../interfaces/dto";

export const defaultMeetingContext = null!;
const MeetingContext = createContext<MeetingData>(defaultMeetingContext);

export default MeetingContext;
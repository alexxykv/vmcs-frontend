import { useContext } from "react";
import { MeetingContext } from "../contexts/MeetingContext";

export function useMeeting() {
  return useContext(MeetingContext);
}
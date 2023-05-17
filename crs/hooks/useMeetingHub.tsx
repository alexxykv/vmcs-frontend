import { useContext } from "react";
import { MeetingHubContext } from "../contexts/MeetingHubContext";

export function useMeetingHub() {
  return useContext(MeetingHubContext);
}
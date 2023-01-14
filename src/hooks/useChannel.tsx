import { useContext } from "react";
import ChannelContext from "../contexts/ChannelContext";

export function useChannel() {
  return useContext(ChannelContext);
}
import { createContext } from "react";
import { ChannelContextType } from "../interfaces/contexts";

export const defaultChannelContext: ChannelContextType = null!;
const ChannelContext = createContext(defaultChannelContext);

export default ChannelContext;
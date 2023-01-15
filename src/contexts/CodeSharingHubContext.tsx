import { createContext } from "react";
import { CodeSharingHubContextType } from "../interfaces/contexts";

export const defaultChatHubContext: CodeSharingHubContextType = null!;
const CodeSharingHubContext = createContext<CodeSharingHubContextType>(defaultChatHubContext);

export default CodeSharingHubContext;
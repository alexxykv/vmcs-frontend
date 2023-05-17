import { createContext } from "react";
import { CodeSharingHubContextType } from "../interfaces/Contexts";
import { WithChildrenProps } from "../interfaces/Props";
import { useHub } from "../hooks";
import { CodeSharingHub } from "../hubs";

export const CodeSharingHubContext = createContext<CodeSharingHubContextType>(null!);

export const CodeSharingProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const codeSharingHub = useHub(CodeSharingHub);

  return (
    <CodeSharingHubContext.Provider value={codeSharingHub}>
      {children}
    </CodeSharingHubContext.Provider>
  );
}
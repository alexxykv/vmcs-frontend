import { useContext } from "react";
import CodeSharingHubContext from "../contexts/CodeSharingHubContext";

export function useCodeSharingHub() {
  return useContext(CodeSharingHubContext);
}
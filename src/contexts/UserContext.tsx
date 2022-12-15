import { createContext } from "react";
import { IUserContext } from "../interfaces/contexts";

export const defaultUserContext: IUserContext = {
  userState: {
    loggedIn: false
  },
  setUserState: () => { }
}
const UserContext = createContext(defaultUserContext);

export default UserContext;
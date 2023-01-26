import { createContext } from "react";
import { UserContextType } from "../interfaces/contexts";

export const defaultUserContext: UserContextType = {
  id: '',
  login: '',
  username: '',
  email: '',
  avatarUri: '',
  uploadImage: (image: File) => { }
};
const UserContext = createContext(defaultUserContext);

export default UserContext;
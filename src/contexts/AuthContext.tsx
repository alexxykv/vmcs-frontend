import { createContext } from "react";
import { AuthContextType } from "../interfaces/contexts";

const AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
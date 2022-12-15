import React, { useState } from 'react';
import { WithChildrenProps } from '../interfaces/props';
import UserContext, { defaultUserContext } from '../contexts/UserContext';

const UserProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const [userState, setUserState] = useState(defaultUserContext);

  return (
    <UserContext.Provider value={{ ...userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

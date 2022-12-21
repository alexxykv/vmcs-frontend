import React, { useState } from 'react';
import { WithChildrenProps } from '../interfaces/props';
import UserContext, { defaultUserContext } from '../contexts/UserContext';

const UserProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const [userContext, setUserContext] = useState(defaultUserContext);

  return (
    <UserContext.Provider value={{ ...userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
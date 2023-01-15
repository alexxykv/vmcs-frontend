import React, { useEffect, useState } from 'react';
import { Users } from '../api';
import UserContext, { defaultUserContext } from '../contexts/UserContext';
import { UserData } from '../interfaces/dto/users';
import { WithChildrenProps } from '../interfaces/props';
import { useAuth } from '../hooks/useAuth';

const UserProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const auth = useAuth();
  const [userData, setUserData] = useState<UserData>(defaultUserContext);

  useEffect(() => {
    if (auth.status === 'Authorized') {
      Users.Get().then(userData => {
        setUserData(userData);
      });
    }
  }, [auth.status]);

  const value: UserData = { ...userData }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
import React, { useCallback, useEffect, useState } from 'react';
import { Users } from '../api';
import UserContext, { defaultUserContext } from '../contexts/UserContext';
import { UserData } from '../interfaces/dto/users';
import { WithChildrenProps } from '../interfaces/props';
import { useAuth } from '../hooks/useAuth';
import { UserContextType } from '../interfaces/contexts';

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

  const uploadImage = useCallback((image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    Users.UploadAvatar(formData).then(() => {
      setUserData(prev => {
        return {
          ...prev,
          avatarUri: URL.createObjectURL(image)
        }
      });
    })
  }, []);

  const value: UserContextType = {
    ...userData,
    uploadImage
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
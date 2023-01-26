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

  const uploadUserData = useCallback(() => {
    Users.Get().then(userData => {
      const avatarUri = userData.avatarUri ?
        new URL(userData.avatarUri, process.env.REACT_APP_HOST_URL).href
        : '';
      setUserData({
        ...userData,
        avatarUri
      });
    });
  }, []);

  useEffect(() => {
    if (auth.status === 'Authorized') {
      uploadUserData();
    }
  }, [auth.status, uploadUserData]);

  const uploadImage = useCallback((image: File) => {
    setUserData(prev => {
      return {
        ...prev,
        avatarUri: URL.createObjectURL(image)
      }
    });

    const formData = new FormData();
    formData.append('image', image);
    Users.UploadAvatar(formData).then(() => {
      uploadUserData();
    });
  }, [uploadUserData]);

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
import React from 'react';
import CodeSharingHubContext from '../contexts/CodeSharingHubContext';
import Endpoints from '../enums/Endpoints';
import CodeSharingHub from '../hubs/CodeSharingHub';
import { useHub } from '../hooks/useHub';
import { WithChildrenProps } from '../interfaces/props';


const CodeSharingProvider: React.FC<WithChildrenProps> = ({ children }) => {
  const codeSharingHub = useHub(CodeSharingHub, Endpoints.CodeSharingHub);

  return (
    <CodeSharingHubContext.Provider value={codeSharingHub}>
      {children}
    </CodeSharingHubContext.Provider>
  );
}


export default CodeSharingProvider;
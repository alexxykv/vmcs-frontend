import React, { useCallback, useEffect, useState } from 'react';
import Loading from './Loading';
import Repository from './Repository';
import RepositoryWelcome from './RepositoryWelcome';
import { useCodeSharingHub } from '../hooks/useCodeSharingHub';
import { useMeeting } from '../hooks/useMeeting';
import { IRepository } from '../hubs/CodeSharingHub';


const CodeShareScreen: React.FC = () => {
  const meeting = useMeeting();
  const codeHub = useCodeSharingHub();
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [repositoryExist, setRepositryExist] = useState<boolean>(meeting.repositoryId !== null);

  const connectCodeHub = useCallback(() => {
    codeHub.start().then(() => {
      if (repositoryExist) {
        codeHub.connectToRepository(meeting.repositoryId);
      }
      codeHub.onConnectToRepository(repository => {
        setRepositryExist(true);
        setRepository(repository);
      });
    });
  }, [codeHub, repositoryExist, meeting.repositoryId]);

  useEffect(() => {
    connectCodeHub();
  }, [connectCodeHub]);

  const render = () => {
    if (repositoryExist) {
      if (repository) {
        return <Repository repository={repository} />
      }
      return <Loading />
    }
    return <RepositoryWelcome />
  }

  return render();
}


export default CodeShareScreen;
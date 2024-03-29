import React, { useCallback, useEffect, useState } from 'react';
import Loading from './Loading';
import Repository from './Repository';
import RepositoryWelcome from './RepositoryWelcome';
import { useCodeSharingHub, useMeeting } from '../hooks';
import { CreateDirectoryData, IDirectory } from '../interfaces/dto';
import { Directories } from '../api';


const CodeShareScreen: React.FC = () => {
  const meeting = useMeeting();
  const codeHub = useCodeSharingHub();
  const [repository, setRepository] = useState<IDirectory | null>(null);
  const [repositoryId, setRepositoryId] = useState<string>(meeting.repositoryId);

  const repositoryExist = useCallback(() => {
    return repositoryId !== null;
  }, [repositoryId]);

  const connectToRepository = useCallback((repositoryId: string) => {
    codeHub.Connection.stop().then(() => {
      codeHub.Connection.start().then(() => {
        codeHub.connectToRepository(repositoryId);
        console.log('connect')
      });
    });
    codeHub.onConnectToRepository(directory => {
      console.log(directory)
      setRepository(directory);
    });
  }, [codeHub]);

  const disconnectRepository = useCallback(() => {
    codeHub.offConnectToRepository();
    codeHub.Connection.stop();
  }, [codeHub]);

  const createRepository = useCallback((createData: CreateDirectoryData) => {
    Directories.Create(createData).then(directoryId => {
      setRepositoryId(directoryId);
    });
  }, []);

  useEffect(() => {
    if (repositoryExist()) {
      connectToRepository(repositoryId);
    }
    return disconnectRepository;
  }, [connectToRepository, disconnectRepository, repositoryExist, repositoryId]);

  const render = () => {
    if (repositoryExist()) {
      if (repository) {
        return <Repository repository={repository} />
      }
      return <Loading />
    }
    return <RepositoryWelcome onCreateRepository={createRepository} />
  }

  return render();
}


export default CodeShareScreen;
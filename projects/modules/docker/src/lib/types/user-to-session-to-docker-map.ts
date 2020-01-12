import Dockerode from 'dockerode';

export interface UserToSessionToDockerMap {
  [key: string]: {
    [key: string]: {
      [key: string]: Dockerode
    };
  };
}

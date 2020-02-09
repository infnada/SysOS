import * as Dockerode from 'dockerode';

export interface WorkspaceToDockerMap {
  [key: string]: {
    [key: string]: Dockerode
  };
}

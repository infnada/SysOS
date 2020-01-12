import {KubeConfig} from '@kubernetes/client-node';

export interface UserToSessionToConfigMap {
  [key: string]: {
    [key: string]: {
      [key: string]: KubeConfig
    };
  };
}

import {KubeConfig} from '@kubernetes/client-node';

export interface WorkspaceToKubernetesMap {
  [key: string]: {
    [key: string]: KubeConfig
  };
}

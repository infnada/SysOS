export interface ConnectionKubernetesServer {
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
  credential: {
    fields: {
      UserName: string;
      Password: {
        getText: () => string;
      }
    }
  };
}

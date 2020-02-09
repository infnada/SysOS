export interface ConnectionNetappServer {
  host: string;
  port: number;
  credential: {
    fields: {
      UserName: string;
      Password: {
        getText: () => string;
      }
    }
  };
}

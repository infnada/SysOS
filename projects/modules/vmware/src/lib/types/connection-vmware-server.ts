export interface ConnectionVmwareServer {
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

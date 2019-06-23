export interface Connection {
  type: string;
  uuid: string;
  host: string;
  port: number;
  credential: string;
  so?: string;
  community?: string;
}

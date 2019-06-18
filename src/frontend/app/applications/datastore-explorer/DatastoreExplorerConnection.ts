export interface DatastoreExplorerConnection {
  uuid?: string;
  datastoreId: string;
  name: string;
  credential: string;
  host: string;
  port: number;
  datacenter: string;
  type: string;
  state?: string;
}

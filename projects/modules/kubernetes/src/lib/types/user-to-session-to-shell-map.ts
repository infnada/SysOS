import WebSocket from 'isomorphic-ws';

export interface UserToSessionToShellMap {
  [key: string]: {
    [key: string]: {
      terminalUuid: string;
      websocket: WebSocket
    }[]
  };
}

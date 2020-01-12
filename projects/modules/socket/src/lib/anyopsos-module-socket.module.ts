import {Socket} from 'socket.io';

export class AnyOpsOSSocketModule {

  constructor(private readonly socket: Socket) {
  }

  emitData(type: string, uuid: string, data: any): void {
    this.socket.emit(type + '__data', {
      uuid,
      data
    });
  }

  emitProp(type: string, data: any, uuid: string, prop: string): void {
    this.socket.emit(type + '__prop', {
      prop,
      text: data.toString(),
      uuid
    });
  }

  emitProgress(data: string, source: string, destination: string, type: string, uuid: string): void {
    this.socket.emit('sftp__progress', {
      progress: data,
      source,
      destination,
      exchange: type,
      uuid
    });
  }

}

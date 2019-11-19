export class SocketModule {

  constructor(private socket) {

  }

  emitData(type: string, uuid: string, data: any) {
    this.socket.emit(type + '__data', {
      uuid,
      data
    });
  }

  emitProp(type, data, uuid, prop) {
    this.socket.emit(type + '__prop', {
      prop,
      text: data.toString('utf-8'),
      uuid
    });
  }

  emitProgress(data, source, destination, type, uuid) {
    this.socket.emit('sftp__progress', {
      progress: data,
      source,
      destination,
      exchange: type,
      uuid
    });
  }

}

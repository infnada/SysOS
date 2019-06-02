export class SocketModule {

  constructor(private socket) {

  }

  emitData(type, data, uuid) {
    this.socket.emit(type + '__data', {
      text: data.toString('utf-8'),
      uuid
    });
  }

  emitPath(type, data, uuid, path) {
    this.socket.emit(type + '__data', {
      path,
      text: data,
      uuid
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

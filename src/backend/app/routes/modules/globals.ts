export class GlobalsModule {

  constructor(private connection) {
  }

  execAsync(command): Promise<any> {
    let streamedData = '';

    return new Promise((resolve, reject) => {
      if (typeof this.connection === 'undefined') return reject('no conn');

      this.connection.exec(command, (err, stream) => {
        if (err) return reject(err);

        stream.on('data', (data, e) => {
          if (e) return reject(e);

          streamedData += data.toString('utf8');
        }).stderr.on('data', (data) => {
          return reject(data.toString('utf8'));
        }).on('close', () => {
          return resolve(streamedData);
        });
      });
    });
  }

}

module.exports = function (socket) {

	return {
		emitData: function (type, data, uuid) {
			socket.emit(type + '__data', {
			    text: data.toString('utf-8'),
			    uuid: uuid
			 });
		},
		emitPath: function (type, data, uuid, path) {
			socket.emit(type + '__data', {
				path: path,
			    text: data,
			    uuid: uuid
			});
		},
		emitProp: function (type, data, uuid, prop) {
			socket.emit(type + '__prop', {
				prop: prop,
			    text: data.toString('utf-8'),
			    uuid: uuid
			});
		},
		emitProgress: function (data, source, destination, type, uuid) {
			socket.emit('sftp__progress', {
				progress: data,
			    source: source,
			    destination: destination,
			    exchange: type,
			    uuid: uuid
		  	});
		}
	}

};

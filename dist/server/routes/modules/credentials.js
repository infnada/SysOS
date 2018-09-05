var path = require('path');
var Promise = require("bluebird");

module.exports = function credentials () {

    this.getCredential = function (credential) {
        var credentials = require('read-config')(path.join(__dirname, '../../filesystem/root/credentials.json'));

        credential = credentials.saved_credentials.filter(function (obj) {
            return obj.uuid === credential;
        })[0];

        if (!credential) return Promise.reject('Invalid credential');

        return Promise.resolve(credential);
    };

    return this;
};
/*
 * All API calls should be done from here
 */

(function () {
    'use strict';
    SysOS.factory('ServerFactory', ['$http', function ($http) {

        // Private
        var doGet = function (url, onSuccess, onError) {
            return $http.get(url).then(onSuccess, onError);
        };

        var doPost = function (url, data, onSuccess, onError) {
            return $http.post(url, data).then(onSuccess, onError);
        };

        // Public
        return {
            getSession: function (onSuccess, onError) {
                return doGet('/getSession', onSuccess, onError);
            },
            // Manage local and remote files
            getFileSystemPath: function (path, onSuccess, onError) {
                return doPost('/api/folder/get', {path: path}, onSuccess, onError);
            },
            getRemotePath: function (uuid, path, onSuccess, onError) {
                return doPost('/api/remoteFolder/get', {uuid: uuid, path: path}, onSuccess, onError);
            },
            createFolder: function (data, onSuccess, onError) {
                return doPost('/api/folder/create', data, onSuccess, onError);
            },
            createRemoteFolder: function (uuid, path, onSuccess, onError) {
                return doPost('/api/remoteFolder/create', {uuid: uuid, path: path}, onSuccess, onError);
            },
            getFileContents: function (path, onSuccess, onError) {
                return doPost('/api/file/get', {name: path}, onSuccess, onError);
            },
            renameFile: function (data, onSuccess, onError) {
                return doPost('/api/file/rename', data, onSuccess, onError);
            },
            renameRemoteFile: function (uuid, source, dest, onSuccess, onError) {
                return doPost('/api/remoteFile/rename', {uuid: uuid, source: source, dest: dest}, onSuccess, onError);
            },
            deleteFile: function (data, onSuccess, onError) {
                return doPost('/api/file/delete', data, onSuccess, onError);
            },
            deleteRemoteFile: function (uuid, path, onSuccess, onError) {
                return doPost('/api/remoteFile/delete', {uuid: uuid, path: path}, onSuccess, onError);
            },
            downloadFileFromInet: function (url, path, onSuccess, onError) {
                return doPost('/api/file/download_from_url', {url: url, path: path}, onSuccess, onError);
            },
            remoteDownloadFileFromInet: function (url, path, uuid, onSuccess, onError) {
                return doPost('/api/remoteFile/download_from_url', {
                    url: url,
                    path: path,
                    uuid: uuid
                }, onSuccess, onError);
            },
            copyFile: function (src, dst, onSuccess, onError) {
                return doPost('/api/file/copy', {src: src, dst: dst}, onSuccess, onError);
            },
            copyRemoteFile: function (uuid, src, dst, onSuccess, onError) {
                return doPost('/api/remoteFile/copy', {uuid: uuid, src: src, dst: dst}, onSuccess, onError);
            },
            moveFile: function (src, dst, onSuccess, onError) {
                return doPost('/api/file/move', {src: src, dst: dst}, onSuccess, onError);
            },
            moveRemoteFile: function (uuid, src, dst, onSuccess, onError) {
                return doPost('/api/remoteFile/move', {uuid: uuid, src: src, dst: dst}, onSuccess, onError);
            },
            // Manage application data from config files API
            saveConfigToFile: function (data, file, full_save, onSuccess, onError) {
                return doPost('/api/configFiles/save', {
                    data: data,
                    file: file,
                    full_save: full_save
                }, onSuccess, onError);
            },
            getConfigFile: function (file, onSuccess, onError) {
                return doPost('/api/configFiles/get', {file: file}, onSuccess, onError);
            },
            deleteConfigFromFile: function (uuid, file, onSuccess, onError) {
                return doPost('/api/configFiles/delete', {uuid: uuid, file: file}, onSuccess, onError);
            },
            // Applications init
            applicationInitCredentials: function (onSuccess, onError) {
                return doGet('/application/cmanager/init', onSuccess, onError);
            },
            // Server Manager API
            remoteGetRelease: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_release', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetKernel: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_kernel', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetCpu: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_cpu', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetMem: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_mem', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetDisk: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_disk', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetUpdates: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_updates', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetProcesses: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_processes', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetInterfaces: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/get_interfaces', {uuid: uuid}, onSuccess, onError);
            },
            remoteGetInterfaceBandwidth: function (uuid, iface, onSuccess, onError) {
                return doPost('/api/remoteServer/get_interface_bandwidth', {
                    uuid: uuid,
                    interface: iface
                }, onSuccess, onError);
            },
            runHIDS: function (uuid, onSuccess, onError) {
                return doPost('/api/remoteServer/run_hids', {uuid: uuid}, onSuccess, onError);
            },
            doPing: function (uuid, host, onSuccess, onError) {
                return doPost('/api/remoteServer/do_ping', {uuid: uuid, host: host}, onSuccess, onError);
            },
            remoteDoSnmp: function (uuid, oid, onSuccess, onError) {
                return doPost('/api/remoteServer/do_snmp', {uuid: uuid, oid: oid}, onSuccess, onError);
            },
            // vCenter API
            getVMwareClientVersion: function (host, port, onSuccess, onError) {
                return doPost('/api/vcenter/getClientVersion', {host: host, port: port}, onSuccess, onError);
            },
            connectVcenter: function (host, credential, onSuccess, onError) {
                return doPost('/api/vcenter/connect', {host: host, credential: credential}, onSuccess, onError);
            },
            connectvCenterSoap: function (credential, host, port, onSuccess, onError) {
                return doPost('/api/vcenter/connectSoap', {
                    credential: credential,
                    host: host,
                    port: port
                }, onSuccess, onError);
            },
            callVcenter: function (host, path, onSuccess, onError) {
                return doPost('/api/vcenter/call', {host: host, path: path}, onSuccess, onError);
            },
            callVcenterSoap: function (credential, host, port, action, xml, onSuccess, onError) {
                return doPost('/api/vcenter/callSoap', {
                    credential: credential,
                    host: host,
                    port: port,
                    action: action,
                    xml: xml
                }, onSuccess, onError);
            },
            // NetApp API
            callNetApp: function (credential, host, port, path, xml, onSuccess, onError) {
                return doPost('/api/netapp/call', {
                    credential: credential,
                    host: host,
                    port: port,
                    path: path,
                    xml: xml
                }, onSuccess, onError);
            },
            // Credentials API
            saveCredential: function (credential, onSuccess, onError) {
                return doPost('/api/credential/save', {credential: credential}, onSuccess, onError);
            },
            deleteCredential: function (uuid, onSuccess, onError) {
                return doPost('/api/credential/delete', {uuid: uuid}, onSuccess, onError);
            }
        };

    }]);
}());

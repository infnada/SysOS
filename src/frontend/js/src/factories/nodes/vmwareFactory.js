(function () {
    'use strict';
    SysOS.factory('vmwareFactory', ['ApplicationsFactory', 'ServerFactory', '$q', '$timeout', 'toastr', function (ApplicationsFactory, ServerFactory, $q, $timeout, toastr) {

        // https://vdc-repo.vmware.com/vmwb-repository/dcr-public/1cd28284-3b72-4885-9e31-d1c6d9e26686/71ef7304-a6c9-43b3-a3cd-868b2c236c81/doc/index.html

        /*
         * PRIVATE FUNCTIONS
         */
        var parseVMwareObject = function (data) {

            var new_obj = {};

            // Is an object
            // Have 2 props
            // Has prop "name" and has prop "val"
            if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty('name') && data.hasOwnProperty('val')) {

                if (data[data.name[0]] === undefined) {
                    new_obj[data.name[0]] = parseVMwareObject(data.val);
                } else {
                    new_obj[data[data.name[0]]] = parseVMwareObject(data.val);
                }

                return new_obj;
            }

            // Is an object
            // Have 2 props
            // Has prop "obj" and has prop "propSet"
            else if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty('$') && data.hasOwnProperty('_')) {

                if (data.$.type) {
                    new_obj.type = data.$.type;
                    new_obj.name = data._;
                } else {
                    new_obj = data._;
                }

                return new_obj;
            }

            angular.forEach(data, function (value, key) {

                // Is an object
                // Have 2 props
                // Has prop "$" and has prop "_"
                if (value === Object(value) && Object.keys(value).length === 2 && value.hasOwnProperty('$') && value.hasOwnProperty('_')) {
                    if (value.$.type) {
                        new_obj.type = value.$.type;
                        new_obj.name = value._;
                    } else {
                        new_obj = value._;
                    }

                    return new_obj;
                }

                // Is an array of 1 value as string
                else if (Array.isArray(value) && value.length === 1 && value[0] !== Object(value[0])) {
                    new_obj[key] = value[0];
                }

                // Is an array of 1 value as object
                else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
                    new_obj[key] = parseVMwareObject(value[0]);
                }

                else if (value === Object(value) && Object.keys(value).length === 1 && value.hasOwnProperty('xsi:type')) {
                    new_obj['xsi_type'] = value['xsi:type'];
                    // Do nothing
                }

                // Is an object
                else if (value === Object(value)) {
                    angular.forEach(value, function (v, k) {

                        // Is an array of 1 value as string
                        if (Array.isArray(v) && v.length === 1 && v[0] !== Object(v[0])) {
                            new_obj[k] = v[0];
                        }

                        // Is an array of 1 value as object
                        else if (Array.isArray(v) && v.length === 1 && v[0] === Object(v[0])) {
                            new_obj[k] = parseVMwareObject(v[0]);
                        }

                        else if (k === '$' && v === Object(v) && Object.keys(v).length === 1 && v.hasOwnProperty('xsi:type')) {
                            //console.log(v);// do nothing
                        }

                        // Is an object
                        // Have 2 props
                        // Has prop "name" and has prop "val"
                        else if (v === Object(v) && Object.keys(v).length === 2 && v.hasOwnProperty('name') && v.hasOwnProperty('val')) {
                            new_obj[v.name[0]] = parseVMwareObject(v.val);
                        }

                        //Is array
                        //More than 1 length
                        //Are objects
                        else if (Array.isArray(v) && v.length > 1 && v[0] === Object(v[0])) {
                            new_obj[k] = v;

                            angular.forEach(v, function (sv, sk) {
                                new_obj[k][sk] = parseVMwareObject(sv);
                            });
                        }

                        // Is an object
                        else if (v === Object(v)) {
                            new_obj[k] = parseVMwareObject(v);
                        }

                        //Is array of strings
                        else if (typeof v === 'string') {
                            //do nothing
                        }

                        else {
                            new_obj[k] = v;
                            console.log(value, v, k, v === Object(v), v.length, v.hasOwnProperty('xsi:type'), Array.isArray(v), 'errrrrr parsing');
                        }

                    });

                    return new_obj;

                } else if (typeof value === 'string') {
                    new_obj[key] = value;
                } else {

                    console.log(value, key, 'errrrrr2 parsing');
                    new_obj[key] = value;
                    return new_obj;
                }

            });

            return new_obj;

        };

        /*
         * Custom errorHandler function for VMwareFactory
         */
        var errorHandler = function (e) {
            return {
                status: 'error',
                error: e
            };
        };

        /*
         * Custom validResponse function for VMwareFactory
         */
        var validResponse = function (e) {
            return {
                status: 'ok',
                data: e
            };
        };

        var getTaskResults = function (credential, host, port, task_id) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Task</type><pathSet>info</pathSet></propSet><objectSet><obj type="Task">' + task_id + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data, host);

                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return res;
            });
        };

        var getTaskStatus = function (credential, host, port, task_id) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Task</type><pathSet>info.progress</pathSet><pathSet>info.state</pathSet><pathSet>info.cancelable</pathSet></propSet><objectSet><obj type="Task">' + task_id + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data, host);

                var task_info = parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval[0]);

                if (task_info['info.state'] === 'running') {
                    console.log(task_info);
                    return $timeout(function () {
                        return getTaskStatus(credential, host, port, task_id);
                    }, 2000);
                }

                return getTaskResults(credential, host, port, task_id).then(function (res) {
                    return res;
                });
            });
        };

        /*
         * PUBLIC FUNCTIONS
         */

        var getClientVersion = function (host, port) {
            return ServerFactory.getVMwareClientVersion(host, port).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response.ConfigRoot.clientConnection[0]);
            });
        };

        var connectvCenterSoap = function (credential, host, port) {
            return ServerFactory.connectvCenterSoap(credential, host, port).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data);
            });
        };

        var registerExtension = function (credential, host, port) {
            var xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<soapenv:Envelope xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                '    <soapenv:Body>\n' +
                '        <RegisterExtension xmlns="urn:vim25">\n' +
                '            <_this type="ExtensionManager">ExtensionManager</_this>\n' +
                '            <extension>\n' +
                '                <description>\n' +
                '                    <label>SysOS Management</label>\n' +
                '                    <summary>SysOS management extension for VMware vSphere</summary>\n' +
                '                </description>\n' +
                '                <key>com.sysos.management</key>\n' +
                '                <company>SysOS</company>\n' +
                '                <version>1.0</version>\n' +
                '                <subjectName>SysOS Management</subjectName>\n' +
                '                <client>\n' +
                '                    <version>1.0</version>\n' +
                '                    <description>\n' +
                '                        <label>SysOS Management</label>\n' +
                '                        <summary>SysOS management extension for VMware vSphere</summary>\n' +
                '                    </description>\n' +
                '                    <company>SysOS</company>\n' +
                '                    <type>com.vmware.vim.viClientScripts</type>\n' +
                '                    <url>https://github.com/infnada/SysOS</url>\n' +
                '                </client>\n' +
                '                <taskList>\n' +
                '                    <taskID>com.sysos.management.backup</taskID>\n' +
                '                </taskList>\n' +
                '                <resourceList>\n' +
                '                    <locale>en</locale>\n' +
                '                    <module>task</module>\n' +
                '                    <data>\n' +
                '                        <key>com.sysos.management.backup.label</key>\n' +
                '                        <value>SysOS Create Backup</value>\n' +
                '                    </data>\n' +
                '                </resourceList>\n' +
                '	             <resourceList>\n' +
                '                    <locale>en_US</locale>\n' +
                '                    <module>task</module>\n' +
                '                    <data>\n' +
                '                        <key>com.sysos.management.backup.label</key>\n' +
                '                        <value>SysOS Create Backup</value>\n' +
                '                    </data>\n' +
                '                </resourceList>\n' +
                '                <lastHeartbeatTime xsi:type="xsd:dateTime">2018-05-25T18:22:35.465+02:00</lastHeartbeatTime>\n' +
                '            </extension>\n' +
                '        </RegisterExtension>\n' +
                '    </soapenv:Body>\n' +
                '</soapenv:Envelope>';

            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                // Something is wrong (Extension could already exist)
                if (data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
                    return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0]);
                }

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RegisterExtensionResponse[0]);
            });
        };

        var findSysOSExtension = function (credential, host, port) {
            var xml = '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><FindExtension xmlns="urn:vim25"><_this type="ExtensionManager">ExtensionManager</_this><extensionKey>com.sysos.management</extensionKey></FindExtension></soapenv:Body></soapenv:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].FindExtensionResponse[0]);
            });
        };

        var createTask = function (credential, host, port, taskTypeId, objectType, objectId) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CreateTask xmlns="urn:vim25"><_this type="TaskManager">TaskManager</_this><obj type="' + objectType + '">' + objectId + '</obj><taskTypeId>' + taskTypeId + '</taskTypeId><initiatedBy>SysOS Administrator</initiatedBy><cancelable>false</cancelable></CreateTask></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].CreateTaskResponse[0].returnval[0]));
            });
        };

        var setTaskState = function (credential, host, port, task_id, state) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SetTaskState xmlns="urn:vim25"><_this type="Task">' + task_id + '</_this><state>' + state + '</state>' + (state === 'error' ? '<fault><faultMessage><key>0</key><message>Error</message></faultMessage></fault>' : '') + '</SetTaskState></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].SetTaskStateResponse[0]));
            });
        };

        var updateTaskProgress = function (credential, host, port, task_id, progress) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><UpdateProgress xmlns="urn:vim25"><_this type="Task">' + task_id + '</_this><percentDone>' + progress + '</percentDone></UpdateProgress></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].UpdateProgressResponse[0]));
            });
        };

        var acquireVMTicket = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><AcquireTicket xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><ticketType xsi:type="xsd:string">webmks</ticketType></AcquireTicket></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].AcquireTicketResponse[0].returnval[0]);
            });
        };

        var acquireNFCTicket = function (credential, host, port, esx_host, datastore) {
            var xml = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:vim="urn:internalvim25"><SOAP-ENV:Body><vim:NfcFileManagement xsi:type="vim:NfcFileManagementRequestType"><vim:_this xsi:type="vim:ManagedObjectReference" type="NfcService">nfcService</vim:_this><vim:ds xsi:type="vim:ManagedObjectReference" type="Datastore">' + datastore + '</vim:ds><vim:hostForAccess xsi:type="vim:ManagedObjectReference" type="HostSystem">' + esx_host + '</vim:hostForAccess></vim:NfcFileManagement></SOAP-ENV:Body></SOAP-ENV:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].NfcFileManagementResponse[0].returnval[0]);
            });
        };

        var getHostConnectionState = function (credential, host, port, esx_host) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>runtime.connectionState</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body']['0'].RetrievePropertiesResponse['0'].returnval['0'].propSet['0'].val['0']._);
            });
        };

        // Gets networkSystem from ESXi host
        // return vmwareFactory.getHostConfigManagerNetworkSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01',
        // '443', 'host-10');
        var getHostConfigManagerNetworkSystem = function (credential, host, port, esx_host) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>configManager.networkSystem</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body']['0'].RetrievePropertiesResponse['0'].returnval['0'].propSet['0'].val['0']._);
            });
        };

        // Gets datastoreSystem from ESXi host
        //return vmwareFactory.getHostConfigManagerDatastoreSystem('adee0997-62ec-470e-aa81-045a446ceec5',
        // 'mvcenter01', '443', 'host-10');
        var getHostConfigManagerDatastoreSystem = function (credential, host, port, esx_host) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>configManager.datastoreSystem</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body']['0'].RetrievePropertiesResponse['0'].returnval['0'].propSet['0'].val['0']._);
            });
        };

        // Gets networkSystem Virtual NICS
        //vmwareFactory.getHostNetworkInfoVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
        // 'networkSystem-10');
        var getHostNetworkInfoVnic = function (credential, host, port, network_system) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostNetworkSystem</type><pathSet>networkInfo.vnic</pathSet></propSet><objectSet><obj type="HostNetworkSystem">' + network_system + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        // Gets networkSystem Console Virtual NICS
        //vmwareFactory.getHostNetworkInfoConsoleVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
        // 'networkSystem-10');
        var getHostNetworkInfoConsoleVnic = function (credential, host, port, network_system) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostNetworkSystem</type><pathSet>networkInfo.consoleVnic</pathSet></propSet><objectSet><obj type="HostNetworkSystem">' + network_system + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        var getDatastores = function (credential, host, port, datacenter_folder) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet xsi:type="PropertyFilterSpec"><propSet xsi:type="PropertySpec"><type xsi:type="xsd:string">Datastore</type><all xsi:type="xsd:boolean">true</all></propSet><objectSet xsi:type="ObjectSpec"><obj type="Folder" xsi:type="ManagedObjectReference">' + datacenter_folder + '</obj><skip xsi:type="xsd:boolean">true</skip><selectSet xsi:type="TraversalSpec"><type xsi:type="xsd:string">Folder</type><path xsi:type="xsd:string">childEntity</path><skip xsi:type="xsd:boolean">true</skip><selectSet xsi:type="TraversalSpec"><type xsi:type="xsd:string">Datacenter</type><path xsi:type="xsd:string">datastore</path><skip xsi:type="xsd:boolean">false</skip></selectSet></selectSet></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);
                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        var getDatastoresWithVMsData = function (credential, host, port, datacenter_folder) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Datastore</type><all>false</all><pathSet>info</pathSet><pathSet>host</pathSet><pathSet>vm</pathSet></propSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>config</pathSet><pathSet>layout</pathSet><pathSet>runtime</pathSet></propSet><objectSet><obj type="Folder">' + datacenter_folder + '</obj><skip>true</skip><selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec"><name>visitFolders</name><type>Folder</type><path>childEntity</path><skip>true</skip><selectSet><name>visitFolders</name></selectSet><selectSet xsi:type="TraversalSpec"><type>Datacenter</type><path>datastore</path><skip>false</skip><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);
                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        var getDatastoreProps = function (credential, host, port, datastore) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Datastore</type><all>true</all></propSet><objectSet><obj type="Datastore">' + datastore + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval[0]));
            });
        };

        var getVMFileDataFromDatastore = function (credential, host, port, datastore, datastore_name, vmx_path, vmx_file) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SearchDatastore_Task xmlns="urn:vim25"><_this type="HostDatastoreBrowser">datastoreBrowser-' + datastore + '</_this><datastorePath>[' + datastore_name + ']' + vmx_path + '</datastorePath><searchSpec><query xsi:type="FolderFileQuery" /><query /><details><fileType>true</fileType><fileSize>true</fileSize><modification>true</modification><fileOwner>false</fileOwner></details><matchPattern>' + vmx_file + '</matchPattern></searchSpec></SearchDatastore_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].SearchDatastore_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var getFilesDataFromDatastore = function (credential, host, port, datastore, datastore_name, path) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SearchDatastore_Task xmlns="urn:vim25"><_this type="HostDatastoreBrowser">datastoreBrowser-' + datastore + '</_this><datastorePath>[' + datastore_name + ']' + path + '</datastorePath><searchSpec><query xsi:type="FolderFileQuery" /><query /><details><fileType>true</fileType><fileSize>true</fileSize><modification>true</modification><fileOwner>false</fileOwner></details></searchSpec></SearchDatastore_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].SearchDatastore_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var deleteFileFromDatastore = function (credential, host, port, datastore_name, path, datacenter) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><DeleteDatastoreFile_Task xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><name>[' + datastore_name + '] ' + path + '</name><datacenter type="Datacenter">' + datacenter + '</datacenter></DeleteDatastoreFile_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].DeleteDatastoreFile_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var moveFileFromDatastore = function (credential, host, port, src_datastore_name, src_path, src_datacenter, dst_datastore_name, dst_path, dst_datacenter, force) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><MoveDatastoreFile_Task xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><sourceName>[' + src_datastore_name + '] ' + src_path + '</sourceName><sourceDatacenter type="Datacenter">' + src_datacenter + '</sourceDatacenter><destinationName>[' + dst_datastore_name + '] ' + dst_path + '</destinationName><destinationDatacenter type="Datacenter">' + dst_datacenter + '</destinationDatacenter>' + (force ? '<force>true</force>' : '') + '</MoveDatastoreFile_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].MoveDatastoreFile_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var copyFileFromDatastore = function (credential, host, port, src_datastore_name, src_path, src_datacenter, dst_datastore_name, dst_path, dst_datacenter, force) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CopyDatastoreFile_Task xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><sourceName>[' + src_datastore_name + '] ' + src_path + '</sourceName><sourceDatacenter type="Datacenter">' + src_datacenter + '</sourceDatacenter><destinationName>[' + dst_datastore_name + '] ' + dst_path + '</destinationName><destinationDatacenter type="Datacenter">' + dst_datacenter + '</destinationDatacenter>' + (force ? '<force>true</force>' : '') + '</CopyDatastoreFile_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].CopyDatastoreFile_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var createFolderToDatastore = function (credential, host, port, datastore_name, path, datacenter) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><MakeDirectory xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><name>[' + datastore_name + '] ' + path + '</name><datacenter type="Datacenter">' + datacenter + '</datacenter><createParentDirectories>true</createParentDirectories></MakeDirectory></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].MakeDirectoryResponse[0];

            });
        };

        var mountDatastore = function (credential, host, port, datastore_system, datastore_host, datastore_path, datastore_local_name) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CreateNasDatastore xmlns="urn:vim25"><_this type="HostDatastoreSystem">' + datastore_system + '</_this><spec><remoteHost>' + datastore_host + '</remoteHost><remotePath>/' + datastore_path + '/</remotePath><localPath>' + datastore_local_name + '</localPath><accessMode>readWrite</accessMode></spec></CreateNasDatastore></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].CreateNasDatastoreResponse[0].returnval[0]._);
            });
        };

        var unmountDatastore = function (credential, host, port, datastore_system, datastore) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RemoveDatastore xmlns="urn:vim25"><_this type="HostDatastoreSystem">' + datastore_system + '</_this><datastore type="Datastore">' + datastore + '</datastore></RemoveDatastore></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                // Something is wrong (Datastore could not exist)
                if (data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
                    return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0]['detail'][0]);
                }

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RemoveDatastoreResponse[0]);
            });
        };

        var getVMs = function (credential, host, port, datacenter_folder) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>true</all></propSet><objectSet><obj type="Folder">' + datacenter_folder + '</obj><skip>true</skip><selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec"><name>visitFolders</name><type>Folder</type><path>childEntity</path><skip>true</skip><selectSet><name>visitFolders</name></selectSet><selectSet xsi:type="TraversalSpec"><type>Datacenter</type><path>datastore</path><skip>false</skip><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';

            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        var getVMState = function (credential, host, port, vm, getAll) {
            var xml;

            if (getAll) {
                xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>true</all></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            } else {
                xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>name</pathSet><pathSet>guest</pathSet><pathSet>runtime.powerState</pathSet><pathSet>summary.config</pathSet><pathSet>summary.quickStats</pathSet><pathSet>guestHeartbeatStatus</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            }

            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                // Something is wrong (VM could not exist)
                if (data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
                    return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0]['detail'][0]);
                }

                return validResponse(parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval[0]));
            });
        };

        var getVMPath = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>config.files.vmPathName</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';

            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                // Something is wrong (VM could not exist)
                if (data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
                    return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0]['detail'][0]);
                }

                return validResponse(parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval[0]));
            });
        };

        var getVMRuntime = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>runtime</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';

            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                // Something is wrong (VM could not exist)
                if (data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
                    return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0]['detail'][0]);
                }

                return validResponse(parseVMwareObject(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval[0]));
            });
        };

        var queryVMEvents = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><QueryEvents xmlns="urn:vim25"><_this type="EventManager">EventManager</_this><filter><entity><entity type="VirtualMachine">' + vm + '</entity><recursion>all</recursion></entity><time><beginTime>2018-05-23T16:35:17.165+02:00</beginTime></time></filter></QueryEvents></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);
                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].QueryEventsResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        var searchIndexVM = function (credential, host, port, vm_uuid) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><FindByUuid xmlns="urn:vim25"><_this type="SearchIndex">SearchIndex</_this><uuid>' + vm_uuid + '</uuid><vmSearch>true</vmSearch><instanceUuid>false</instanceUuid></FindByUuid></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);
                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].FindByUuidResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        var registerVM = function (credential, host, port, esx_host, esx_path, vm_name, esx_folder, resource_pool) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RegisterVM_Task xmlns="urn:vim25"><_this type="Folder">' + esx_folder + '</_this><path>' + esx_path + '</path><name>' + vm_name + '</name><asTemplate>false</asTemplate><pool type="ResourcePool">' + resource_pool + '</pool><host type="HostSystem">' + esx_host + '</host></RegisterVM_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RegisterVM_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    if (data[0].propSet.info.state !== 'success') return errorHandler(data[0].propSet.info, host);

                    return validResponse(data[0].propSet.info);
                });

            });
        };

        var unregisterVM = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><UnregisterVM xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></UnregisterVM></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                // Something is wrong (VM could not exist)
                if (data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
                    return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0]['detail'][0]);
                }

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].UnregisterVMResponse[0]);
            });
        };

        var powerOnVM = function (credential, host, port, esx_host, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><PowerOnVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><host type="HostSystem">' + esx_host + '</host></PowerOnVM_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].PowerOnVM_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var powerOffVM = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><PowerOffVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></PowerOffVM_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].PowerOffVM_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var suspendVM = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SuspendVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></SuspendVM_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].SuspendVM_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var resetVM = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><ResetVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></ResetVM_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].ResetVM_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var shutdownGuest = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><ShutdownGuest xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></ShutdownGuest></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].ShutdownGuestResponse[0];

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var rebootGuest = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RebootGuest xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></RebootGuest></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RebootGuestResponse[0];

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var reloadVM = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><Reload xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></Reload></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                return validResponse(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].ReloadResponse[0]);
            });
        };

        var createSnapShot = function (credential, host, port, vm, name, description, memory, quiesce) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CreateSnapshot_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><name>' + name + '</name><description>' + description + '</description><memory>' + memory + '</memory><quiesce>' + quiesce + '</quiesce></CreateSnapshot_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].CreateSnapshot_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var getVMSnapshots = function (credential, host, port, vm) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>snapshot</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var res = [];

                angular.forEach(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RetrievePropertiesResponse[0].returnval, function (value) {
                    res.push(parseVMwareObject(value));
                });

                return validResponse(res);
            });
        };

        var revertToSnapshot = function (credential, host, port, snapshot) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RevertToSnapshot_Task xmlns="urn:vim25"><_this type="VirtualMachineSnapshot">' + snapshot + '</_this></RevertToSnapshot_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RevertToSnapshot_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        var removeSnapshot = function (credential, host, port, snapshot, remove_children) {
            var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RemoveSnapshot_Task xmlns="urn:vim25"><_this type="VirtualMachineSnapshot">' + snapshot + '</_this><removeChildren>' + remove_children + '</removeChildren></RemoveSnapshot_Task></soap:Body></soap:Envelope>';
            return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
                if (data.data.status === 'error') return errorHandler(data.data.data);

                var task_id = data.data.data.response['soapenv:Envelope']['soapenv:Body'][0].RemoveSnapshot_TaskResponse[0].returnval[0]._;

                return getTaskStatus(credential, host, port, task_id).then(function (data) {
                    return validResponse(data);
                });

            });
        };

        return {
            getClientVersion: getClientVersion,
            connectvCenterSoap: connectvCenterSoap,
            registerExtension: registerExtension,
            findSysOSExtension: findSysOSExtension,
            createTask: createTask,
            setTaskState: setTaskState,
            updateTaskProgress: updateTaskProgress,
            acquireVMTicket: acquireVMTicket,
            acquireNFCTicket: acquireNFCTicket,
            getHostConnectionState: getHostConnectionState,
            getHostConfigManagerNetworkSystem: getHostConfigManagerNetworkSystem,
            getHostConfigManagerDatastoreSystem: getHostConfigManagerDatastoreSystem,
            getHostNetworkInfoVnic: getHostNetworkInfoVnic,
            getHostNetworkInfoConsoleVnic: getHostNetworkInfoConsoleVnic,
            getDatastores: getDatastores,
            getDatastoresWithVMsData: getDatastoresWithVMsData,
            getDatastoreProps: getDatastoreProps,
            getVMFileDataFromDatastore: getVMFileDataFromDatastore,
            getFilesDataFromDatastore: getFilesDataFromDatastore,
            deleteFileFromDatastore: deleteFileFromDatastore,
            moveFileFromDatastore: moveFileFromDatastore,
            copyFileFromDatastore: copyFileFromDatastore,
            createFolderToDatastore: createFolderToDatastore,
            mountDatastore: mountDatastore,
            unmountDatastore: unmountDatastore,
            getVMs: getVMs,
            getVMState: getVMState,
            getVMPath: getVMPath,
            getVMRuntime: getVMRuntime,
            queryVMEvents: queryVMEvents,
            searchIndexVM: searchIndexVM,
            registerVM: registerVM,
            unregisterVM: unregisterVM,
            powerOnVM: powerOnVM,
            powerOffVM: powerOffVM,
            suspendVM: suspendVM,
            resetVM: resetVM,
            shutdownGuest: shutdownGuest,
            rebootGuest: rebootGuest,
            reloadVM: reloadVM,
            createSnapShot: createSnapShot,
            getVMSnapshots: getVMSnapshots,
            removeSnapshot: removeSnapshot,
            revertToSnapshot: revertToSnapshot
        };
    }]);
}());

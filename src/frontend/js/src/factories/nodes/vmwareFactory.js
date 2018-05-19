(function () {
  "use strict";
  myApp.factory('vmwareFactory', ['ApplicationsFactory', 'ServerFactory', '$q', '$timeout', 'toastr', function (ApplicationsFactory, ServerFactory, $q, $timeout, toastr) {

    // https://vdc-repo.vmware.com/vmwb-repository/dcr-public/1cd28284-3b72-4885-9e31-d1c6d9e26686/71ef7304-a6c9-43b3-a3cd-868b2c236c81/doc/index.html

    /*
     * PRIVATE FUNCTIONS
     */
    var parseVMwareObject = function (data) {

      var new_obj = {};

      // Is an object
      // Have 2 props
      // Has prop "name" and has prop "val"
      if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty("name") && data.hasOwnProperty("val")) {

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
      else if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty("$") && data.hasOwnProperty("_")) {

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
        if (value === Object(value) && Object.keys(value).length === 2 && value.hasOwnProperty("$") && value.hasOwnProperty("_")) {
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
          new_obj[key] = value[0]
        }

        // Is an array of 1 value as object
        else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
          new_obj[key] = parseVMwareObject(value[0]);
        }

        else if (value === Object(value) && Object.keys(value).length === 1 && value.hasOwnProperty("xsi:type")) {
          // Do nothing
        }

        // Is an object
        else if (value === Object(value)) {
          angular.forEach(value, function (v, k) {

            // Is an array of 1 value as string
            if (Array.isArray(v) && v.length === 1 && v[0] !== Object(v[0])) {
              new_obj[k] = v[0]
            }

            // Is an array of 1 value as object
            else if (Array.isArray(v) && v.length === 1 && v[0] === Object(v[0])) {
              new_obj[k] = parseVMwareObject(v[0]);
            }

            else if (k === "$" && v === Object(v) && Object.keys(v).length === 1 && v.hasOwnProperty("xsi:type")) {
              // do nothing
            }

            // Is an object
            // Have 2 props
            // Has prop "name" and has prop "val"
            else if (v === Object(v) && Object.keys(v).length === 2 && v.hasOwnProperty("name") && v.hasOwnProperty("val")) {
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
              console.log(value, v, k, v === Object(v), v.length, v.hasOwnProperty("xsi:type"), Array.isArray(v), "errrrrr parsing");
            }

          });

          return new_obj;
        } else {

          console.log(value, key, "errrrrr2 parsing");
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
        status: "error",
        error: e
      };
    };

    /*
     * Custom validResponse function for VMwareFactory
     */
    var validResponse = function (e) {
      return {
        status: "ok",
        data: e
      };
    };

    var getTaskResults = function (credential, host, port, task_id) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Task</type><pathSet>info</pathSet></propSet><objectSet><obj type="Task">' + task_id + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data, host);

        var res = [];

        angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
          res.push(parseVMwareObject(value));
        });

        return res;
      });
    };

    var getTaskStatus = function (credential, host, port, task_id) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Task</type><pathSet>info.progress</pathSet><pathSet>info.state</pathSet><pathSet>info.cancelable</pathSet></propSet><objectSet><obj type="Task">' + task_id + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data, host);

        var task_info = parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval[0]);

        if (task_info["info.state"] === "running") {
          console.log(task_info);
          return $timeout(function(){
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
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data.data.response.ConfigRoot.clientConnection[0]);
      });
    };

    var connectvCenterSoap = function (credential, host, port) {
      return ServerFactory.connectvCenterSoap(credential, host, port).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data);
      });
    };

    var acquireVMTicket = function (credential, host, port, vm) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><AcquireTicket xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><ticketType xsi:type="xsd:string">webmks</ticketType></AcquireTicket></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].AcquireTicketResponse[0].returnval[0]);
      });
    };

    var acquireNFCTicket = function (credential, host, port, esx_host, datastore) {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:vim="urn:internalvim25"><SOAP-ENV:Body><vim:NfcFileManagement xsi:type="vim:NfcFileManagementRequestType"><vim:_this xsi:type="vim:ManagedObjectReference" type="NfcService">nfcService</vim:_this><vim:ds xsi:type="vim:ManagedObjectReference" type="Datastore">' + datastore + '</vim:ds><vim:hostForAccess xsi:type="vim:ManagedObjectReference" type="HostSystem">' + esx_host + '</vim:hostForAccess></vim:NfcFileManagement></SOAP-ENV:Body></SOAP-ENV:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].NfcFileManagementResponse[0].returnval[0]);
      });
    };

    var getHostConnectionState = function (credential, host, port, esx_host) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>runtime.connectionState</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"]["0"].RetrievePropertiesResponse["0"].returnval["0"].propSet["0"].val["0"]._);
      });
    };

    // Gets networkSystem from ESXi host
    // return vmwareFactory.getHostConfigManagerNetworkSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'host-10');
    var getHostConfigManagerNetworkSystem = function (credential, host, port, esx_host) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>configManager.networkSystem</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"]["0"].RetrievePropertiesResponse["0"].returnval["0"].propSet["0"].val["0"]._);
      });
    };

    // Gets datastoreSystem from ESXi host
    //return vmwareFactory.getHostConfigManagerDatastoreSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'host-10');
    var getHostConfigManagerDatastoreSystem = function (credential, host, port, esx_host) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>configManager.datastoreSystem</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"]["0"].RetrievePropertiesResponse["0"].returnval["0"].propSet["0"].val["0"]._);
      });
    };

    // Gets networkSystem Virtual NICS
    //vmwareFactory.getHostNetworkInfoVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'networkSystem-10');
    var getHostNetworkInfoVnic = function (credential, host, port, network_system) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostNetworkSystem</type><pathSet>networkInfo.vnic</pathSet></propSet><objectSet><obj type="HostNetworkSystem">' + network_system + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        var res = [];

        angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
          res.push(parseVMwareObject(value));
        });

        return validResponse(res);
      });
    };

    // Gets networkSystem Console Virtual NICS
    //vmwareFactory.getHostNetworkInfoConsoleVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'networkSystem-10');
    var getHostNetworkInfoConsoleVnic = function (credential, host, port, network_system) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostNetworkSystem</type><pathSet>networkInfo.consoleVnic</pathSet></propSet><objectSet><obj type="HostNetworkSystem">' + network_system + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        var res = [];

        angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
          res.push(parseVMwareObject(value));
        });

        return validResponse(res);
      });
    };

    var getDatastores = function (credential, host, port) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet xsi:type="PropertyFilterSpec"><propSet xsi:type="PropertySpec"><type xsi:type="xsd:string">Datastore</type><all xsi:type="xsd:boolean">0</all><pathSet xsi:type="xsd:string">browser</pathSet><pathSet xsi:type="xsd:string">info</pathSet><pathSet xsi:type="xsd:string">name</pathSet><pathSet xsi:type="xsd:string">summary</pathSet></propSet><objectSet xsi:type="ObjectSpec"><obj type="Folder" xsi:type="ManagedObjectReference">group-d1</obj><skip xsi:type="xsd:boolean">0</skip><selectSet xsi:type="TraversalSpec"><type xsi:type="xsd:string">Folder</type><path xsi:type="xsd:string">childEntity</path><skip xsi:type="xsd:boolean">0</skip><selectSet xsi:type="TraversalSpec"><type xsi:type="xsd:string">Datacenter</type><path xsi:type="xsd:string">datastore</path><skip xsi:type="xsd:boolean">0</skip></selectSet></selectSet></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);
        var res = [];

        angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
          res.push(parseVMwareObject(value));
        });

        return validResponse(res);
      });
    };

    var getDatastoreProps = function (credential, host, port, datastore) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Datastore</type><all>false</all><pathSet>browser</pathSet><pathSet>info.name</pathSet><pathSet>info.url</pathSet><pathSet>summary.capacity</pathSet><pathSet>summary.freeSpace</pathSet><pathSet>summary.type</pathSet><pathSet>capability</pathSet><pathSet>capability.topLevelDirectoryCreateSupported</pathSet></propSet><objectSet><obj type="Datastore">' + datastore + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        var res = [];

        angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
          res.push(parseVMwareObject(value));
        });

        return validResponse(res);
      });
    };

    var getFileDataFromDatastore = function (credential, host, port, datastore, datastore_name, vmx_path, vmx_file) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SearchDatastore_Task xmlns="urn:vim25"><_this type="HostDatastoreBrowser">datastoreBrowser-' + datastore + '</_this><datastorePath>[' + datastore_name + ']' + vmx_path + '</datastorePath><searchSpec><query xsi:type="FolderFileQuery" /><query /><details><fileType>true</fileType><fileSize>true</fileSize><modification>true</modification><fileOwner>false</fileOwner></details><matchPattern>' + vmx_file + '</matchPattern></searchSpec></SearchDatastore_Task></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].SearchDatastore_TaskResponse[0].returnval[0]._;

        return getTaskResults(credential, host, port, task_id).then(function (data) {
          return validResponse(data);
        });

      });
    };

    var mountDatastore = function (credential, host, port, datastore_system, datastore_host, datastore_path, datastore_local_name) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CreateNasDatastore xmlns="urn:vim25"><_this type="HostDatastoreSystem">' + datastore_system + '</_this><spec><remoteHost>' + datastore_host + '</remoteHost><remotePath>/' + datastore_path + '/</remotePath><localPath>' + datastore_local_name + '</localPath><accessMode>readWrite</accessMode></spec></CreateNasDatastore></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].CreateNasDatastoreResponse[0].returnval[0]._);
      });
    };

    var unmountDatastore = function (credential, host, port, datastore_system, datastore) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RemoveDatastore xmlns="urn:vim25"><_this type="HostDatastoreSystem">' + datastore_system + '</_this><datastore type="Datastore">' + datastore + '</datastore></RemoveDatastore></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        // Something is wrong (Datastore could not exist)
        if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
          return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
        }

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RemoveDatastoreResponse[0]);
      });
    };

    var getVMState = function (credential, host, port, vm, getAll) {
      var xml;

      if (getAll) xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>true</all></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
      xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>name</pathSet><pathSet>guest</pathSet><pathSet>runtime.powerState</pathSet><pathSet>summary.config</pathSet><pathSet>summary.quickStats</pathSet><pathSet>guestHeartbeatStatus</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';

      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        // Something is wrong (VM could not exist)
        if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
          return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
        }

        return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval[0]));
      });
    };

    var registerVM = function (credential, host, port, esx_host, esx_path, vm_name, esx_folder, resource_pool) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RegisterVM_Task xmlns="urn:vim25"><_this type="Folder">' + esx_folder + '</_this><path>' + esx_path + '</path><name>' + vm_name + '</name><asTemplate>false</asTemplate><pool type="ResourcePool">' + resource_pool + '</pool><host type="HostSystem">' + esx_host + '</host></RegisterVM_Task></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RegisterVM_TaskResponse[0].returnval[0]._;

        return getTaskStatus(credential, host, port, task_id).then(function (data) {
          if (data[0].propSet.info.state !== "success") return errorHandler(data[0].propSet.info, host);

          return validResponse(data[0].propSet.info);
        });

      });
    };

    var unregisterVM = function (credential, host, port, vm) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><UnregisterVM xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></UnregisterVM></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        // Something is wrong (VM could not exist)
        if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
          return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
        }

        return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].UnregisterVMResponse[0]);
      });
    };

    var powerOnVM = function (credential, host, port, esx_host, vm) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><PowerOnVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><host type="HostSystem">' + esx_host + '</host></PowerOnVM_Task></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].PowerOnVM_TaskResponse[0].returnval[0]._;

        return getTaskStatus(credential, host, port, task_id).then(function (data) {
          return validResponse(data);
        });

      });
    };

    var powerOffVM = function (credential, host, port, vm) {
      var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><PowerOffVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></PowerOffVM_Task></soap:Body></soap:Envelope>';
      return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data);

        var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].PowerOffVM_TaskResponse[0].returnval[0]._;

        return getTaskStatus(credential, host, port, task_id).then(function (data) {
          return validResponse(data);
        });

      });
    };

    return {
      getClientVersion: getClientVersion,
      connectvCenterSoap: connectvCenterSoap,
      acquireVMTicket: acquireVMTicket,
      acquireNFCTicket: acquireNFCTicket,
      getHostConnectionState: getHostConnectionState,
      getHostConfigManagerNetworkSystem: getHostConfigManagerNetworkSystem,
      getHostConfigManagerDatastoreSystem: getHostConfigManagerDatastoreSystem,
      getHostNetworkInfoVnic: getHostNetworkInfoVnic,
      getHostNetworkInfoConsoleVnic: getHostNetworkInfoConsoleVnic,
      getDatastores: getDatastores,
      getDatastoreProps: getDatastoreProps,
      getFileDataFromDatastore: getFileDataFromDatastore,
      mountDatastore: mountDatastore,
      unmountDatastore: unmountDatastore,
      getVMState: getVMState,
      registerVM: registerVM,
      unregisterVM: unregisterVM,
      powerOnVM: powerOnVM,
      powerOffVM: powerOffVM
    }

  }]);
}());

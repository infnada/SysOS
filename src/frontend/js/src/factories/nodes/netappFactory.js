(function () {
  "use strict";
  myApp.factory('netappFactory', ['ApplicationsFactory', 'ServerFactory', '$q', 'toastr', function (ApplicationsFactory, ServerFactory, $q, toastr) {

    //netapp-manageability-sdk-ontap-9.3-api-documentation/doc/WebHelp/index.htm

    /*
     * PRIVATE FUNCTIONS
     */
    var parseNetAppObject = function (data, parent) {

      if (!parent) parent = {};

       angular.forEach(data, function (value, key) {

        if (Array.isArray(value) && value.length === 1 && value[0] !== Object(value[0])) {
          parent[key] = value[0];
        } else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
          parent[key] = parseNetAppObject(value[0], parent[key]);
        } else if (Array.isArray(value) && value.length > 1 && value[0] === Object(value[0])) {
          parent[key] = value;

          angular.forEach(value, function (v, k) {
            parent[key][k] = parseNetAppObject(v, parent[k]);
          });
        } else {
          parent[key] = value;
        }
       });

       return parent;

    };

    /*
     * Custom errorHandler function for NetAppFactory
     */
    var errorHandler = function (e) {
      return {
        status: "error",
        error: e
      };
    };

    /*
     * Custom validResponse function for NetAppFactory
     */
    var validResponse = function (e) {
      return {
        status: "ok",
        data: e
      };
    };

    /** @namespace data.data.data.response.netapp */

    /*
     * PUBLIC FUNCTIONS
     */
    var getSystemVersion = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><system-get-version/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          build_timestamp: data.data.data.response.netapp.results[0]["build-timestamp"][0],
          is_clustered: data.data.data.response.netapp.results[0]["is-clustered"][0],
          version: data.data.data.response.netapp.results[0].version[0],
          version_tuple: {
            generation: data.data.data.response.netapp.results[0]["version-tuple"][0]["system-version-tuple"][0].generation[0],
            major: data.data.data.response.netapp.results[0]["version-tuple"][0]["system-version-tuple"][0].major[0],
            minor: data.data.data.response.netapp.results[0]["version-tuple"][0]["system-version-tuple"][0].minor[0]
          }
        });

      });
    };

    var getOntapiVersion = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><system-get-ontapi-version/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          major_version: data.data.data.response.netapp.results[0]["major-version"][0],
          minor_version: data.data.data.response.netapp.results[0]["minor-version"][0]
        });

      });
    };

    var getLicenses = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><license-v2-status-list-info/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        var results = [];

        angular.forEach(data.data.data.response.netapp.results[0]["license-v2-status"]["0"]["license-v2-status-info"], function (license) {
          results.push(parseNetAppObject(license));
        });

        return validResponse(results);
      });
    };

    var getMetrocluster = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><metrocluster-get/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          local_cluster_name: data.data.data.response.netapp.results[0].attributes[0]["metrocluster-info"][0]["local-cluster-name"][0],
          local_configuration_state: data.data.data.response.netapp.results[0].attributes[0]["metrocluster-info"][0]["local-configuration-state"][0]
        });

      });
    };

    var getClusterIdentity = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><cluster-identity-get/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          cluster_contact: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-contact"][0],
          cluster_location: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-location"][0],
          cluster_name: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-name"][0],
          cluster_serial_number: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-serial-number"][0],
          cluster_uuid: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-uuid"][0],
          rdb_uuid: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["rdb-uuid"][0]
        });
      });
    };

    var getQtrees = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><qtree-list-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</qtree-list-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["qtree-info"], function (qtree) {
          results.push(parseNetAppObject(qtree));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getQtrees(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getNetInterfaces = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><net-interface-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</net-interface-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["net-interface-info"], function (netiface) {
          results.push(parseNetAppObject(netiface));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getNetInterfaces(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getFcpInterfaces = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><fcp-interface-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</fcp-interface-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["fcp-interface-info"], function (fcpiface) {
          results.push(parseNetAppObject(fcpiface));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getFcpInterfaces(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getNFSStatus = function (credential, host, port, vfiler) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><nfs-status/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          is_drained: data.data.data.response.netapp.results[0]["is-drained"][0],
          is_enabled: data.data.data.response.netapp.results[0]["is-enabled"][0]
        });
      });
    };

    var getVservers = function (credential, host, port, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><vserver-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</vserver-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["vserver-info"], function (vserver) {
          results.push(parseNetAppObject(vserver));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getVservers(credential, host, port, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getVolumes = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</volume-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["volume-attributes"], function (volume) {
          results.push(parseNetAppObject(volume));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getVolumes(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getSnapshots = function (credential, host, port, vfiler, volume, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><snapshot-get-iter><max-records>10</max-records>" + (volume ? "<query><snapshot-info><volume>" + volume + "</volume></snapshot-info></query>" : "") + "" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</snapshot-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["snapshot-info"], function (snapshot) {
          results.push(parseNetAppObject(snapshot));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getSnapshots(credential, host, port, vfiler, volume, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getSnapshotFiles = function (credential, host, port, vfiler, volume, snapshot, path, results, next_tag) {
      var di_promises = [];

      if (!path) path = "";
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><file-list-directory-iter><path>/vol/" + volume + "/.snapshot/" + snapshot + "" + path + "</path>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</file-list-directory-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno, host);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason, host);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        // For each file found
        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["file-info"], function (file) {
          file = parseNetAppObject(file);
          if (file.name === '.' || file.name === '..') return;

          file.path = path;
          results.push(file);

          // Get directories
          if (file["file-type"] === "directory") {
            di_promises.push(getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path + '/' + file.name, results));
          }

        });

        // if directory found
        if (di_promises.length > 0) {

          // Get all files in each found directory directory
          return $q.all(di_promises).then(function (results) {

            results = results[0].data;

            if (data.data.data.response.netapp.results[0]["next-tag"]) {
              var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
              return getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path, results, next_tag);
            }

            return validResponse(results);

          });
        }

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getLuns = function (credential, host, port, vfiler, volume, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><lun-get-iter><max-records>10</max-records>" + (volume ? "<query><lun-info><volume>" + volume + "</volume></lun-info></query>" : "") + "" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</lun-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["lun-info"], function (lun) {
          results.push(parseNetAppObject(lun));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getLuns(credential, host, port, vfiler, volume, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getFileInfo = function (credential, host, port, vfiler, volume, snapshot) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><file-get-file-info><path>/vol/" + volume + "/.snapshot/" + snapshot + "</path></file-get-file-info></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data);
      });
    };

    /*
     * RESTORE
     */
    var cloneVolumeFromSnapshot = function (credential, host, port, vfiler, volume, snapshot) {
      // TODO: check if this snapshot volume is already created by another restore
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-clone-create><parent-volume>" + volume + "</parent-volume><volume>SysOS_" + volume + "_Restore</volume><space-reserve>none</space-reserve><parent-snapshot>" + snapshot + "</parent-snapshot></volume-clone-create></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results["0"].$.status);
      });
    };

    var mountVolume = function (credential, host, port, vfiler, volume) {
      // TODO: check if this junction path is in use by another restore
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-mount><activate-junction>true</activate-junction><junction-path>/SysOS_" + volume + "_Restore</junction-path><volume-name>SysOS_" + volume + "_Restore</volume-name><export-policy-override>false</export-policy-override></volume-mount></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results["0"].$.status);
      });
    };

    var unmountVolume = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-unmount><volume-name>SysOS_" + volume + "_Restore</volume-name><force>True</force></volume-unmount></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results["0"].$.status);
      });
    };

    var setVolumeOffline = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-offline><name>SysOS_" + volume + "_Restore</name></volume-offline></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results[0].$.status);
      });
    };

    var destroyVolume = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-destroy><name>SysOS_" + volume + "_Restore</name></volume-destroy></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results["0"].$.status);
      });
    };

    var createSnapshot = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><snapshot-create><async>False</async><snapshot>" + volume + "_SysOS_ss</snapshot><volume>" + volume + "</volume></snapshot-create></netapp></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);
        console.log(data);

        return validResponse(data);
      });
    };

    var getNFSExportRulesList = function (credential, host, port, vfiler, volume) {
      var results = [];
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><nfs-exportfs-list-rules-2><pathname>/" + volume + "</pathname><persistent>True</persistent></nfs-exportfs-list-rules-2></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        angular.forEach(data.data.data.response.netapp.results[0].rules[0]["exports-rule-info-2"][0]["security-rules"][0]["security-rule-info"], function (rule) {
          results.push(parseNetAppObject(rule));
        });

        console.log("getNFSExportRulesList", results);

        return validResponse(data);
      });
    };

    var getExportRules = function (credential, host, port, vfiler, policy) {
      var results = [];
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><export-rule-get-iter>" + (policy ? "<query><export-rule-info><policy-name>" + policy + "</policy-name></export-rule-info></query>" : "") + "</export-rule-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["export-rule-info"], function (rule) {
          results.push(parseNetAppObject(rule));
        });
        console.log("getExportRules", results);

        return validResponse(data);
      });
    };

    return {
      getSystemVersion: getSystemVersion,
      getOntapiVersion: getOntapiVersion,
      getLicenses: getLicenses,
      getMetrocluster: getMetrocluster,
      getClusterIdentity: getClusterIdentity,
      getQtrees: function (credential, host, port, vfiler) {
        return getQtrees(credential, host, port, vfiler, []);
      },
      getNetInterfaces: function (credential, host, port, vfiler) {
        return getNetInterfaces(credential, host, port, vfiler, []);
      },
      getFcpInterfaces: function (credential, host, port, vfiler) {
        return getFcpInterfaces(credential, host, port, vfiler, []);
      },
      getNFSStatus: getNFSStatus,
      getVservers: function (credential, host, port) {
        return getVservers(credential, host, port, []);
      },
      getVolumes: function (credential, host, port, vfiler) {
        return getVolumes(credential, host, port, vfiler, []);
      },
      getSnapshots: function (credential, host, port, vfiler, volume) {
        return getSnapshots(credential, host, port, vfiler, volume, []);
      },
      getSnapshotFiles: function (credential, host, port, vfiler, volume, snapshot) {
        return getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, "", []);
      },
      getLuns: function (credential, host, port, vfiler, volume) {
        return getLuns(credential, host, port, vfiler, volume, []);
      },
      getFileInfo: getFileInfo,
      cloneVolumeFromSnapshot: cloneVolumeFromSnapshot,
      mountVolume: mountVolume,
      unmountVolume: unmountVolume,
      setVolumeOffline: setVolumeOffline,
      destroyVolume: destroyVolume,
      createSnapshot: function (credential, host, port, vfiler, volume) {

      },
      getNFSExportRulesList: getNFSExportRulesList,
      getExportRules: getExportRules
    }

  }]);
}());

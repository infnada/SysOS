import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {NGXLogger} from 'ngx-logger';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VmwareService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
  }

  // https://vdc-repo.vmware.com/vmwb-repository/dcr-public/1cd28284-3b72-4885-9e31-d1c6d9e26686/71ef7304-a6c9-43b3-a3cd-868b2c236c81/doc/index.html

  private parseVMwareObject(data) {

    let newObj: any = {};

    // Is an object
    // Have 2 props
    // Has prop "name" and has prop "val"
    if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty('name') && data.hasOwnProperty('val')) {

      if (data[data.name[0]] === undefined) {
        newObj[data.name[0]] = this.parseVMwareObject(data.val);
      } else {
        newObj[data[data.name[0]]] = this.parseVMwareObject(data.val);
      }

      return newObj;

      // Is an object
      // Have 2 props
      // Has prop "obj" and has prop "propSet"
    } else if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty('$') && data.hasOwnProperty('_')) {

      if (data.$.type) {
        newObj.type = data.$.type;
        newObj.name = data._;
      } else {
        newObj = data._;
      }

      return newObj;
    }

    Object.entries(data).forEach(([key, value]: any) => {

      // Is an object
      // Have 2 props
      // Has prop "$" and has prop "_"
      if (value === Object(value) && Object.keys(value).length === 2 && value.hasOwnProperty('$') && value.hasOwnProperty('_')) {
        if (value.$.type) {
          newObj.type = value.$.type;
          newObj.name = value._;
        } else {
          newObj = value._;
        }

        return newObj;

        // Is an array of 1 value as string
      } else if (Array.isArray(value) && value.length === 1 && value[0] !== Object(value[0])) {
        newObj[key] = value[0];

        // Is an array of 1 value as object
      } else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
        newObj[key] = this.parseVMwareObject(value[0]);
      } else if (value === Object(value) && Object.keys(value).length === 1 && value.hasOwnProperty('xsi:type')) {
        newObj.xsi_type = value['xsi:type'];
        // Do nothing

        // Is an object
      } else if (value === Object(value)) {
        Object.entries(value).forEach(([k, v]: any) => {

          // Is an array of 1 value as string
          if (Array.isArray(v) && v.length === 1 && v[0] !== Object(v[0])) {
            newObj[k] = v[0];

            // Is an array of 1 value as object
          } else if (Array.isArray(v) && v.length === 1 && v[0] === Object(v[0])) {
            newObj[k] = this.parseVMwareObject(v[0]);

          } else if (k === '$' && v === Object(v) && Object.keys(v).length === 1 && v.hasOwnProperty('xsi:type')) {
            // console.log(v);// do nothing


            // Is an object
            // Have 2 props
            // Has prop "name" and has prop "val"
          } else if (v === Object(v) && Object.keys(v).length === 2 && v.hasOwnProperty('name') && v.hasOwnProperty('val')) {
            newObj[v.name[0]] = this.parseVMwareObject(v.val);


            // Is array
            // More than 1 length
            // Are objects
          } else if (Array.isArray(v) && v.length > 1 && v[0] === Object(v[0])) {
            newObj[k] = v;

            Object.entries(v).forEach(([sk, sv]) => {
              newObj[k][sk] = this.parseVMwareObject(sv);
            });

            // Is an object
          } else if (v === Object(v)) {
            newObj[k] = this.parseVMwareObject(v);


            // Is array of strings
          } else if (typeof v === 'string') {
            // do nothing

          } else {
            newObj[k] = v;
            console.log(value, v, k, v === Object(v), v.length, v.hasOwnProperty('xsi:type'), Array.isArray(v), 'errrrrr parsing');
          }

        });

        return newObj;

      } else if (typeof value === 'string') {
        newObj[key] = value;
      } else {

        console.log(value, key, 'errrrrr2 parsing');
        newObj[key] = value;
        return newObj;
      }

    });

    return newObj;

  }

  /*
   * Custom errorHandler function for VMwareFactory
   */
  private errorHandler(e: any): { status: string, error: any } {
    return {
      status: 'error',
      error: e
    };
  }

  /*
   * Custom validResponse function for VMwareFactory
   */
  private validResponse(data: any): { status: string, data: any } {
    return {
      status: 'ok',
      data
    };
  }

  private doCallSoap(credential: string, host: string, port: string, action: string, xml: string): Observable<any> {

    return this.http.post('/api/vcenter/callSoap', {
      credential,
      host,
      port,
      action,
      xml
    }).pipe(map((data: any) => {
      if (data.data.status === 'error') return this.errorHandler(data.data.data);

      // Something is wrong
      if (data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
        return this.errorHandler(data.data.data.response['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0].detail[0]);
      }

      return data.data.data.response['soapenv:Envelope']['soapenv:Body'][0];
    },
    error => {
      this.logger.error('[VMWare] -> doCallSoap -> Error while doing the call -> ', error);
    }));

  }

  private getTaskResults(credential, host, port, taskId) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Task</type>
          <pathSet>info</pathSet>
        </propSet>
        <objectSet>
          <obj type="Task">${taskId}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return res;

    }));
  }

  private getTaskStatus(credential, host, port, taskId) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Task</type>
          <pathSet>info.progress</pathSet>
          <pathSet>info.state</pathSet>
          <pathSet>info.cancelable</pathSet>
        </propSet>
        <objectSet>
          <obj type="Task">${taskId}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {

      const taskInfo = this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]);

      if (taskInfo['info.state'] === 'running') {
        console.log(taskInfo);

        return setTimeout(() => this.getTaskStatus(credential, host, port, taskId), 2000);
      }

      return this.getTaskResults(credential, host, port, taskId).subscribe((res) => {
        return res;
      });
    }));
  }

  /**
   * Basics
   */
  getClientVersion(host, port): Observable<any> {
    return this.http.post('/api/vcenter/getClientVersion', {
      host,
      port
    }).pipe(map((data: any) => {
      return this.validResponse(data.data.data.response.ConfigRoot.clientConnection[0]);
    },
    error => {
      this.logger.error('[VMWare] -> getClientVersion -> Error while doing the call -> ', error);
    }));
  }

  connectvCenterSoap(credential, host, port): Observable<any> {
    return this.http.post('/api/vcenter/connectSoap', {
      host,
      port,
      credential
    }).pipe(map((data: any) => {
      return this.validResponse(data.data);
    },
    error => {
      this.logger.error('[VMWare] -> connectvCenterSoap -> Error while doing the call -> ', error);
    }));
  }

  createAllBasicDataFilter(credential, host, port): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <CreateFilter xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <spec>
        <propSet>
          <type>ManagedEntity</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
        </propSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>guest</pathSet>
          <pathSet>runtime.powerState</pathSet>
          <pathSet>runtime.connectionState</pathSet>
          <pathSet>runtime.faultToleranceState</pathSet>
          <pathSet>config.uuid</pathSet>
          <pathSet>summary.config.vmPathName</pathSet>
          <pathSet>summary.config.template</pathSet>
          <pathSet>datastore</pathSet>
          <pathSet>layout</pathSet>
          <pathSet>config.files.logDirectory</pathSet>
          <pathSet>config.hardware.device</pathSet>
          <pathSet>resourcePool</pathSet>
          <pathSet>runtime.host</pathSet>
          <pathSet>config.version</pathSet>
          <pathSet>config.changeTrackingEnabled</pathSet>
          <pathSet>config.ftInfo</pathSet>
          <pathSet>config.hardware.numCPU</pathSet>
          <pathSet>config.hardware.memoryMB</pathSet>
          <pathSet>config.files.snapshotDirectory</pathSet>
          <pathSet>config.extraConfig</pathSet>
          <pathSet>storage.perDatastoreUsage</pathSet>
          <pathSet>snapshot</pathSet>
          <pathSet>layoutEx</pathSet>
          <pathSet>config.guestId</pathSet>
          <pathSet>config.annotation</pathSet>
          <pathSet>customValue</pathSet>
          <pathSet>parentVApp</pathSet>
          <pathSet>runtime.consolidationNeeded</pathSet>
          <pathSet>config.flags.faultToleranceType</pathSet>
          <pathSet>config.forkConfigInfo</pathSet>
          <pathSet>config.files.vmPathName</pathSet>
        </propSet>
        <propSet>
          <type>Datacenter</type>
          <all>false</all>
          <pathSet>datastore</pathSet>
          <pathSet>vmFolder</pathSet>
        </propSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>vm</pathSet>
          <pathSet>datastore</pathSet>
          <pathSet>hardware.cpuInfo.numCpuPackages</pathSet>
          <pathSet>hardware.cpuFeature</pathSet>
          <pathSet>hardware.cpuInfo.hz</pathSet>
          <pathSet>hardware.systemInfo.uuid</pathSet>
          <pathSet>config.product.productLineId</pathSet>
          <pathSet>summary.config.product.fullName</pathSet>
          <pathSet>summary.config.product.version</pathSet>
          <pathSet>summary.config.product.apiVersion</pathSet>
          <pathSet>configManager.storageSystem</pathSet>
          <pathSet>hardware.cpuInfo.numCpuCores</pathSet>
          <pathSet>hardware.cpuInfo.numCpuThreads</pathSet>
          <pathSet>runtime</pathSet>
          <pathSet>config.vsanHostConfig.clusterInfo</pathSet>
        </propSet>
        <propSet>
          <type>HostStorageSystem</type>
          <all>false</all>
          <pathSet>storageDeviceInfo</pathSet>
          <pathSet>fileSystemVolumeInfo</pathSet>
        </propSet>
        <propSet>
          <type>Datastore</type>
          <all>false</all>
          <pathSet>info</pathSet>
          <pathSet>host</pathSet>
          <pathSet>summary.capacity</pathSet>
          <pathSet>summary.multipleHostAccess</pathSet>
          <pathSet>vm</pathSet>
          <pathSet>capability</pathSet>
          <pathSet>summary.type</pathSet>
        </propSet>
        <propSet>
          <type>ResourcePool</type>
          <all>false</all>
          <pathSet>vm</pathSet>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>resourcePool</pathSet>
        </propSet>
        <propSet>
          <type>ClusterComputeResource</type>
          <all>false</all>
          <pathSet>configuration.drsConfig</pathSet>
          <pathSet>summary</pathSet>
          <pathSet>configurationEx.spbmEnabled</pathSet>
        </propSet>
        <propSet>
          <type>ComputeResource</type>
          <all>false</all>
          <pathSet>summary</pathSet>
          <pathSet>configurationEx.spbmEnabled</pathSet>
        </propSet>
        <propSet>
          <type>VirtualApp</type>
          <all>false</all>
          <pathSet>vm</pathSet>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>parentFolder</pathSet>
          <pathSet>resourcePool</pathSet>
        </propSet>
        <propSet>
          <type>StoragePod</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>summary.capacity</pathSet>
          <pathSet>summary.freeSpace</pathSet>
          <pathSet>podStorageDrsEntry.storageDrsConfig.podConfig.enabled</pathSet>
          <pathSet>podStorageDrsEntry.storageDrsConfig.podConfig.defaultVmBehavior</pathSet>
        </propSet>
        <objectSet>
          <obj type="Folder">group-d1</obj>
          <skip>false</skip>
          <selectSet xsi:type="TraversalSpec">
            <name>resourcepool</name>
            <type>ResourcePool</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcepool</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ResourcePool</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>ComputeResource</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcepool</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>folder_to_parent</name>
            <type>Folder</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_parent</name>
              </selectSet>
            </selectSet>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>Datacenter</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>Datastore</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>StoragePod</type>
              <path>childEntity</path>
              <skip>false</skip>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>StoragePod</type>
              <path>childEntity</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_parent</name>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>folder_to_content</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_content</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ClusterComputeResource</type>
              <path>host</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ComputeResource</type>
              <path>host</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>configManager.storageSystem</path>
                <skip>false</skip>
              </selectSet>
            </selectSet>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ComputeResource</type>
              <path>resourcePool</path>
              <skip>false</skip>
              <selectSet>
                <name>resourcepool</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>hostFolder</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_content</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>vmFolder</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_content</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>resourcePool</path>
              <skip>false</skip>
              <selectSet>
                <name>resourcepool</name>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>ResourcePool</type>
                <path>vm</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>runtime.host</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ClusterComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>datastore</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>Datastore</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                        <selectSet>
                          <name>folder_to_parent</name>
                        </selectSet>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualApp</type>
                <path>vm</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>runtime.host</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ClusterComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>datastore</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>Datastore</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                        <selectSet>
                          <name>folder_to_parent</name>
                        </selectSet>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet>
                  <name>vm_to_respool</name>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>datastoreFolder</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_content</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualMachine</type>
              <path>runtime.host</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>ClusterComputeResource</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>ComputeResource</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet>
              <name>vm_to_respool</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>StoragePod</type>
              <path>childEntity</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>vm</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>runtime.host</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ClusterComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>datastore</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>Datastore</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                        <selectSet>
                          <name>folder_to_parent</name>
                        </selectSet>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet>
                  <name>vm_to_respool</name>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>Datacenter</type>
            <path>hostFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_content</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>ClusterComputeResource</type>
            <path>host</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>ComputeResource</type>
            <path>host</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>configManager.storageSystem</path>
              <skip>false</skip>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualMachine</type>
            <path>runtime.host</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>ClusterComputeResource</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>ComputeResource</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualMachine</type>
            <path>datastore</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_parent</name>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>StoragePod</type>
                <path>childEntity</path>
                <skip>false</skip>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>StoragePod</type>
                <path>childEntity</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>vm_to_respool</name>
            <type>VirtualMachine</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <name>respool_parent</name>
              <type>ResourcePool</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet>
                <name>respool_parent</name>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>ComputeResource</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualMachine</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualApp</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcepool</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ResourcePool</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
          </selectSet>
        </objectSet>
      </spec>
      <partialUpdates>false</partialUpdates>
    </CreateFilter>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.CreateFilterResponse[0].returnval[0]._);
    });
  }

  getWaitForUpdatesEx(credential, host, port): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WaitForUpdatesEx xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <version/>
      <options>
        <maxWaitSeconds>0</maxWaitSeconds>
      </options>
    </WaitForUpdatesEx>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.WaitForUpdatesExResponse[0]);
    });
  }

  registerExtension(credential, host, port): Subscription {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soapenv:Body>
    <RegisterExtension xmlns="urn:vim25">
      <_this type="ExtensionManager">ExtensionManager</_this>
      <extension>
        <description>
          <label>SysOS Management</label>
          <summary>SysOS management extension for VMware vSphere</summary>
        </description>
        <key>com.sysos.management</key>
        <company>SysOS</company>
        <version>1.0</version>
        <subjectName>SysOS Management</subjectName>
        <client>
          <version>1.0</version>
          <description>
            <label>SysOS Management</label>
            <summary>SysOS management extension for VMware vSphere</summary>
          </description>
          <company>SysOS</company>
          <type>com.vmware.vim.viClientScripts</type>
          <url>https://github.com/infnada/SysOS</url>
        </client>
        <taskList>
          <taskID>com.sysos.management.backup</taskID>
        </taskList>
        <resourceList>
          <locale>en</locale>
          <module>task</module>
          <data>
            <key>com.sysos.management.backup.label</key>
            <value>SysOS Create Backup</value>
          </data>
        </resourceList>
        <resourceList>
          <locale>en_US</locale>
          <module>task</module>
          <data>
            <key>com.sysos.management.backup.label</key>
            <value>SysOS Create Backup</value>
          </data>
        </resourceList>
        <lastHeartbeatTime xsi:type="xsd:dateTime">2018-05-25T18:22:35.465+02:00</lastHeartbeatTime>
      </extension>
    </RegisterExtension>
  </soapenv:Body>
</soapenv:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RegisterExtensionResponse[0]);
    });
  }

  findSysOSExtension(credential, host, port): Subscription {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <FindExtension xmlns="urn:vim25">
      <_this type="ExtensionManager">ExtensionManager</_this>
      <extensionKey>com.sysos.management</extensionKey>
    </FindExtension>
  </soapenv:Body>
</soapenv:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.FindExtensionResponse[0]);
    });
  }

  /**
   * TaskManager
   */
  createTask(credential, host, port, taskTypeId, objectType, objectId): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateTask xmlns="urn:vim25">
      <_this type="TaskManager">TaskManager</_this>
      <obj type="${objectType}">${objectId}</obj>
      <taskTypeId>${taskTypeId}</taskTypeId>
      <initiatedBy>SysOS Administrator</initiatedBy>
      <cancelable>false</cancelable>
    </CreateTask>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.CreateTaskResponse[0].returnval[0]));
    });
  }

  setTaskState(credential, host, port, taskId, state): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <SetTaskState xmlns="urn:vim25">
      <_this type="Task">${taskId}</_this>
      <state>${state}</state>
      ${state === 'error' ? '<fault><faultMessage><key>0</key><message>Error</message></faultMessage></fault>' : ''}
    </SetTaskState>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.SetTaskStateResponse[0]));
    });
  }

  updateTaskProgress(credential, host, port, taskId, progress): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <UpdateProgress xmlns="urn:vim25">
      <_this type="Task">${taskId}</_this>
      <percentDone>${progress}</percentDone>
    </UpdateProgress>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.UpdateProgressResponse[0]));
    });
  }

  /**
   * Ticket
   */
  acquireVMTicket(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <AcquireTicket xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
      <ticketType xsi:type="xsd:string">webmks</ticketType>
    </AcquireTicket>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.AcquireTicketResponse[0].returnval[0]);
    });
  }

  acquireNFCTicket(credential, host, port, esxiHost, datastore): Subscription {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:vim="urn:internalvim25">
  <SOAP-ENV:Body>
    <vim:NfcFileManagement xsi:type="vim:NfcFileManagementRequestType">
      <vim:_this xsi:type="vim:ManagedObjectReference" type="NfcService">nfcService</vim:_this>
      <vim:ds xsi:type="vim:ManagedObjectReference" type="Datastore">${datastore}</vim:ds>
      <vim:hostForAccess xsi:type="vim:ManagedObjectReference" type="HostSystem">${esxiHost}</vim:hostForAccess>
    </vim:NfcFileManagement>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.NfcFileManagementResponse[0].returnval[0]);
    });
  }

  /**
   * Host
   */
  getComputeResource(credential, host, port, computeResource): Subscription {

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>ComputeResource</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="ComputeResource">${computeResource}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  getClusterComputeResource(credential, host, port, clusterComputeResource): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>ClusterComputeResource</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="ClusterComputeResource">${clusterComputeResource}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  getResourcePool(credential, host, port, resourcePool): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>ResourcePool</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="ResourcePool">${resourcePool}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    });
  }

  getHosts(credential, host, port, datacenterFolder): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="Folder">${datacenterFolder}</obj>
          <skip>false</skip>
          <selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec">
            <name>folderTraversalSpec</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterHostTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterVmTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterDatastoreTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterNetworkTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>computeResourceRpTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>computeResourceHostTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>hostVmTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>resourcePoolVmTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterDatastoreTraversalSpec</name>
            <type>Datacenter</type>
            <path>datastoreFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterNetworkTraversalSpec</name>
            <type>Datacenter</type>
            <path>networkFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterVmTraversalSpec</name>
            <type>Datacenter</type>
            <path>vmFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterHostTraversalSpec</name>
            <type>Datacenter</type>
            <path>hostFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>computeResourceHostTraversalSpec</name>
            <type>ComputeResource</type>
            <path>host</path>
            <skip>false</skip>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>computeResourceRpTraversalSpec</name>
            <type>ComputeResource</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcePoolTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>resourcePoolVmTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>resourcePoolTraversalSpec</name>
            <type>ResourcePool</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcePoolTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>resourcePoolVmTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>hostVmTraversalSpec</name>
            <type>HostSystem</type>
            <path>vm</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>resourcePoolVmTraversalSpec</name>
            <type>ResourcePool</type>
            <path>vm</path>
            <skip>false</skip>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  getHost(credential, host, port, esxiHost): Subscription {

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
          <skip>false</skip>
          <selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec">
            <name>folderTraversalSpec</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterHostTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterVmTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterDatastoreTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>datacenterNetworkTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>computeResourceRpTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>computeResourceHostTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>hostVmTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>resourcePoolVmTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterDatastoreTraversalSpec</name>
            <type>Datacenter</type>
            <path>datastoreFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterNetworkTraversalSpec</name>
            <type>Datacenter</type>
            <path>networkFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterVmTraversalSpec</name>
            <type>Datacenter</type>
            <path>vmFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>datacenterHostTraversalSpec</name>
            <type>Datacenter</type>
            <path>hostFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>computeResourceHostTraversalSpec</name>
            <type>ComputeResource</type>
            <path>host</path>
            <skip>false</skip>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>computeResourceRpTraversalSpec</name>
            <type>ComputeResource</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcePoolTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>resourcePoolVmTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>resourcePoolTraversalSpec</name>
            <type>ResourcePool</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcePoolTraversalSpec</name>
            </selectSet>
            <selectSet>
              <name>resourcePoolVmTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>hostVmTraversalSpec</name>
            <type>HostSystem</type>
            <path>vm</path>
            <skip>false</skip>
            <selectSet>
              <name>folderTraversalSpec</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>resourcePoolVmTraversalSpec</name>
            <type>ResourcePool</type>
            <path>vm</path>
            <skip>false</skip>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    });
  }

  getHostStorageSystem(credential, host, port, esxiHost): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.storageSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    });
  }

  getHostStorageSystemData(credential, host, port, storageSystem): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostStorageSystem</type>
          <all>false</all>
          <pathSet>storageDeviceInfo</pathSet>
          <pathSet>fileSystemVolumeInfo</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostStorageSystem">${storageSystem}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  getHostConnectionState(credential, host, port, esxiHost): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>runtime.connectionState</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    });
  }

  // Gets networkSystem from ESXi host
  // return vmwareFactory.getHostConfigManagerNetworkSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01',
  // '443', 'host-10');
  getHostConfigManagerNetworkSystem(credential, host, port, esxiHost): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.networkSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    });
  }

  // Gets datastoreSystem from ESXi host
  // return vmwareFactory.getHostConfigManagerDatastoreSystem('adee0997-62ec-470e-aa81-045a446ceec5',
  // 'mvcenter01', '443', 'host-10');
  getHostConfigManagerDatastoreSystem(credential, host, port, esxiHost): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.datastoreSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    });
  }

  // Gets networkSystem Virtual NICS
  // vmwareFactory.getHostNetworkInfoVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
  // 'networkSystem-10');
  getHostNetworkInfoVnic(credential, host, port, networkSystem): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostNetworkSystem</type>
          <pathSet>networkInfo.vnic</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostNetworkSystem">${networkSystem}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  // Gets networkSystem Console Virtual NICS
  // vmwareFactory.getHostNetworkInfoConsoleVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
  // 'networkSystem-10');
  getHostNetworkInfoConsoleVnic(credential, host, port, networkSystem): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostNetworkSystem</type>
          <pathSet>networkInfo.consoleVnic</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostNetworkSystem">${networkSystem}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  /**
   * Datastore
   */
  getDatastores(credential, host, port, datacenterFolder): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet xsi:type="PropertyFilterSpec">
        <propSet xsi:type="PropertySpec">
          <type xsi:type="xsd:string">Datastore</type>
          <all xsi:type="xsd:boolean">true</all>
        </propSet>
        <objectSet xsi:type="ObjectSpec">
          <obj type="Folder" xsi:type="ManagedObjectReference">${datacenterFolder}</obj>
          <skip xsi:type="xsd:boolean">true</skip>
          <selectSet xsi:type="TraversalSpec">
            <type xsi:type="xsd:string">Folder</type>
            <path xsi:type="xsd:string">childEntity</path>
            <skip xsi:type="xsd:boolean">true</skip>
            <selectSet xsi:type="TraversalSpec">
              <type xsi:type="xsd:string">Datacenter</type>
              <path xsi:type="xsd:string">datastore</path>
              <skip xsi:type="xsd:boolean">false</skip>
            </selectSet>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  getDatastoresWithVMsData(credential, host, port, datacenterFolder): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Datastore</type>
          <all>false</all>
          <pathSet>info</pathSet>
          <pathSet>host</pathSet>
          <pathSet>vm</pathSet>
        </propSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>config</pathSet>
          <pathSet>layout</pathSet>
          <pathSet>runtime</pathSet>
        </propSet>
        <objectSet>
          <obj type="Folder">${datacenterFolder}</obj>
          <skip>true</skip>
          <selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec">
            <name>visitFolders</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>true</skip>
            <selectSet>
              <name>visitFolders</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  getDatastoreProps(credential, host, port, datastore): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Datastore</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="Datastore">${datastore}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    });
  }

  getVMFileDataFromDatastore(credential, host, port, datastore, datastoreName, vmxPath, vmxFile): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <SearchDatastore_Task xmlns="urn:vim25">
      <_this type="HostDatastoreBrowser">datastoreBrowser-${datastore}</_this>
      <datastorePath>[${datastoreName}]${vmxPath}</datastorePath>
      <searchSpec>
        <query xsi:type="FolderFileQuery"/>
        <query/>
        <details>
          <fileType>true</fileType>
          <fileSize>true</fileSize>
          <modification>true</modification>
          <fileOwner>false</fileOwner>
        </details>
        <matchPattern>${vmxFile}</matchPattern>
      </searchSpec>
    </SearchDatastore_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.SearchDatastore_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  getFilesDataFromDatastore(credential, host, port, datastore, datastoreName, path): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <SearchDatastore_Task xmlns="urn:vim25">
      <_this type="HostDatastoreBrowser">datastoreBrowser-${datastore}</_this>
      <datastorePath>[${datastoreName}]${path}</datastorePath>
      <searchSpec>
        <query xsi:type="FolderFileQuery"/>
        <query/>
        <details>
          <fileType>true</fileType>
          <fileSize>true</fileSize>
          <modification>true</modification>
          <fileOwner>false</fileOwner>
        </details>
      </searchSpec>
    </SearchDatastore_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.SearchDatastore_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  deleteFileFromDatastore(credential, host, port, datastoreName, path, datacenter): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <DeleteDatastoreFile_Task xmlns="urn:vim25">
      <_this type="FileManager">FileManager</_this>
      <name>[${datastoreName}] ${path}</name>
      <datacenter type="Datacenter">${datacenter}</datacenter>
    </DeleteDatastoreFile_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.DeleteDatastoreFile_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  moveFileFromDatastore(credential, host, port, srcDatastoreName, srcPath, srcDatacenter, dstDatastoreName, dstPath, dstDatacenter, force): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <MoveDatastoreFile_Task xmlns="urn:vim25">
      <_this type="FileManager">FileManager</_this>
      <sourceName>[${srcDatastoreName}] ${srcPath}</sourceName>
      <sourceDatacenter type="Datacenter">${srcDatacenter}</sourceDatacenter>
      <destinationName>[${dstDatastoreName}] ${dstPath}</destinationName>
      <destinationDatacenter type="Datacenter">${dstDatacenter}</destinationDatacenter>${force ? '<force>true</force>' : ''}
    </MoveDatastoreFile_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.MoveDatastoreFile_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  copyFileFromDatastore(credential, host, port, srcDatastoreName, srcPath, srcDatacenter, dstDatastoreName, dstPath, dstDatacenter, force): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CopyDatastoreFile_Task xmlns="urn:vim25">
      <_this type="FileManager">FileManager</_this>
      <sourceName>[${srcDatastoreName}] ${srcPath}</sourceName>
      <sourceDatacenter type="Datacenter">${srcDatacenter}</sourceDatacenter>
      <destinationName>[${dstDatastoreName}] ${dstPath}</destinationName>
      <destinationDatacenter type="Datacenter">${dstDatacenter}</destinationDatacenter>${force ? '<force>true</force>' : ''}
    </CopyDatastoreFile_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.CopyDatastoreFile_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  createFolderToDatastore(credential, host, port, datastoreName, path, datacenter): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <MakeDirectory xmlns="urn:vim25">
      <_this type="FileManager">FileManager</_this>
      <name>[${datastoreName}] ${path}</name>
      <datacenter type="Datacenter">${datacenter}</datacenter>
      <createParentDirectories>true</createParentDirectories>
    </MakeDirectory>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return data.MakeDirectoryResponse[0];

    });
  }

  mountDatastore(credential, host, port, datastoreSystem, datastoreHost, datastorePath, datastoreLocalName): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateNasDatastore xmlns="urn:vim25">
      <_this type="HostDatastoreSystem">${datastoreSystem}</_this>
      <spec>
        <remoteHost>${datastoreHost}</remoteHost>
        <remotePath>/${datastorePath}/</remotePath>
        <localPath>${datastoreLocalName}</localPath>
        <accessMode>readWrite</accessMode>
      </spec>
    </CreateNasDatastore>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.CreateNasDatastoreResponse[0].returnval[0]._);
    });
  }

  unmountDatastore(credential, host, port, datastoreSystem, datastore): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RemoveDatastore xmlns="urn:vim25">
      <_this type="HostDatastoreSystem">${datastoreSystem}</_this>
      <datastore type="Datastore">${datastore}</datastore>
    </RemoveDatastore>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RemoveDatastoreResponse[0]);
    });
  }

  /**
   *  VM
   */
  getVMs(credential, host, port, datacenterFolder): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="Folder">${datacenterFolder}</obj>
          <skip>true</skip>
          <selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec">
            <name>visitFolders</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>true</skip>
            <selectSet>
              <name>visitFolders</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  getVMState(credential, host, port, vm, getAll): Subscription {
    let xml;

    if (getAll) {
      xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    } else {
      xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>guest</pathSet>
          <pathSet>runtime.powerState</pathSet>
          <pathSet>summary.config</pathSet>
          <pathSet>summary.quickStats</pathSet>
          <pathSet>guestHeartbeatStatus</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    }

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    });
  }

  getVMPath(credential, host, port, vm) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>config.files.vmPathName</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    });
  }

  getVMRuntime(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>runtime</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    });
  }

  queryVMEvents(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryEvents xmlns="urn:vim25">
      <_this type="EventManager">EventManager</_this>
      <filter>
        <entity>
          <entity type="VirtualMachine">${vm}</entity>
          <recursion>all</recursion>
        </entity>
        <time>
          <beginTime>2018-05-23T16:35:17.165+02:00</beginTime>
        </time>
      </filter>
    </QueryEvents>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.QueryEventsResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  /*
   * Returns VM Index "vm-xxx"
   */
  searchIndexVM(credential, host, port, vmUuid): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <FindByUuid xmlns="urn:vim25">
      <_this type="SearchIndex">SearchIndex</_this>
      <uuid>${vmUuid}</uuid>
      <vmSearch>true</vmSearch>
      <instanceUuid>false</instanceUuid>
    </FindByUuid>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.FindByUuidResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  registerVM(credential, host, port, esxiHost, esxiPath, vmName, esxiFolder, resourcePool) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RegisterVM_Task xmlns="urn:vim25">
      <_this type="Folder">${esxiFolder}</_this>
      <path>${esxiPath}</path>
      <name>${vmName}</name>
      <asTemplate>false</asTemplate>
      <pool type="ResourcePool">${resourcePool}</pool>
      <host type="HostSystem">${esxiHost}</host>
    </RegisterVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.RegisterVM_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        if (res[0].propSet.info.state !== 'success') return this.errorHandler(res[0].propSet.info);

        return this.validResponse(data[0].propSet.info);
      });

    });
  }

  unregisterVM(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <UnregisterVM xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
    </UnregisterVM>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.UnregisterVMResponse[0]);
    });
  }

  reconfigureVM(credential, host, port, vm, spec) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ReconfigVM_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
      <spec>${spec}</spec>
    </ReconfigVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.ReconfigVM_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        if (res[0].propSet.info.state !== 'success') return this.errorHandler(res[0].propSet.info);

        return this.validResponse(data[0].propSet.info);
      });

    });
  }

  powerOnVM(credential, host, port, esxiHost, vm) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <PowerOnVM_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
      <host type="HostSystem">${esxiHost}</host>
    </PowerOnVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.PowerOnVM_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  powerOffVM(credential, host, port, vm) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <PowerOffVM_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
    </PowerOffVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.PowerOffVM_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  suspendVM(credential, host, port, vm) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <SuspendVM_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
    </SuspendVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.SuspendVM_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  resetVM(credential, host, port, vm) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ResetVM_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
    </ResetVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.ResetVM_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  shutdownGuest(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ShutdownGuest xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
    </ShutdownGuest>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RebootGuestResponse[0]);
    });
  }

  rebootGuest(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RebootGuest xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
    </RebootGuest>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.RebootGuestResponse[0]);
    });
  }

  reloadVM(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Reload xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
    </Reload>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.ReloadResponse[0]);
    });
  }

  /**
   * Snapshot
   */
  createSnapShot(credential, host, port, vm, name, description, memory, quiesce) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateSnapshot_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${vm}</_this>
      <name>${name}</name>
      <description>${description}</description>
      <memory>${memory}</memory>
      <quiesce>${quiesce}</quiesce>
    </CreateSnapshot_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.CreateSnapshot_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  getVMSnapshots(credential, host, port, vm): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>snapshot</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  revertToSnapshot(credential, host, port, snapshot) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RevertToSnapshot_Task xmlns="urn:vim25">
      <_this type="VirtualMachineSnapshot">${snapshot}</_this>
    </RevertToSnapshot_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.RevertToSnapshot_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  removeSnapshot(credential, host, port, snapshot, removeChildren) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RemoveSnapshot_Task xmlns="urn:vim25">
      <_this type="VirtualMachineSnapshot">${snapshot}</_this>
      <removeChildren>${removeChildren}</removeChildren>
    </RemoveSnapshot_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const taskId = data.RemoveSnapshot_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).subscribe((res: any) => {
        return this.validResponse(res);
      });

    });
  }

  /**
   * Perf
   */
  queryAvailablePerfMetric(credential, host, port, objectType, objectId, intervalId): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryAvailablePerfMetric xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <entity type="${objectType}">${objectId}</entity>${intervalId ? '<intervalId>' + intervalId + '</intervalId>' : ''}
    </QueryAvailablePerfMetric>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.QueryAvailablePerfMetricResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  queryPerfProviderSummary(credential, host, port, objectType, objectId): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerfProviderSummary xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <entity type="${objectType}">${objectId}</entity>
    </QueryPerfProviderSummary>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.QueryPerfProviderSummaryResponse[0].returnval[0]);
    });
  }

  queryPerfCounterByLevel(credential, host, port, level): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerfCounterByLevel xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <level>${level}</level>
    </QueryPerfCounterByLevel>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      const res = [];

      data.QueryPerfCounterByLevelResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    });
  }

  queryPerfCounter(credential, host, port, counterId): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerfCounter xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <counterId>${counterId}</counterId>
    </QueryPerfCounter>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.QueryPerfCounterResponse[0].returnval[0]);
    });
  }

  queryPerf(credential, host, port, objectType, objectId, startTime, endTime, maxSample): Subscription {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerf xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <querySpec>
      <entity type="${objectType}">${objectId}</entity>
${startTime ? '<startTime>' + startTime + '</startTime>' : ''}
${endTime ? '<endTime>' + endTime + '</endTime>' : ''}
${maxSample ? '<maxSample>' + maxSample + '</maxSample>' : ''}
      </querySpec>
    </QueryPerf>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).subscribe((data: any) => {
      return this.validResponse(data.QueryPerfResponse[0].returnval[0]);
    });
  }

  /**
   * Datastore Upload
   */
  uploadFileToDatastore(url, path, credential) {
    return this.http.post('/api/vcenter/upload_to_datastore', {
      url,
      path,
      credential
    }).pipe(map((data: any) => {
      return data;
    },
    error => {
      this.logger.error('[VMWare] -> uploadFileToDatastore -> Error while doing the call -> ', error);
    }));
  }
}

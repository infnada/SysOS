import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
  }

  // https://code.vmware.com/apis/358/vsphere#
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
        newObj[key] = (value[0] === 'true' ? true : value[0] === 'false' ? false : value[0]);

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
            newObj[k] = (v[0] === 'true' ? true : v[0] === 'false' ? false : v[0]);

            // Is an array of 1 value as object
          } else if (Array.isArray(v) && v.length === 1 && v[0] === Object(v[0])) {
            newObj[k] = this.parseVMwareObject(v[0]);

          } else if (k === '$' && v === Object(v) && Object.keys(v).length === 1 && v.hasOwnProperty('xsi:type')) {
            // console.log(v);// do nothing


            // Is an object
            // Have 2 props
            // Has prop "name" and has prop "val"
          } else if (v === Object(v) && Object.keys(v).length === 2 && v.hasOwnProperty('name') && v.hasOwnProperty('val')) {
            newObj[v.name[0]] = this.parseVMwareObject(v.val[0]);

            // Is an object
            // Have 3 props
            // Has prop "name" and has prop "val" and has prop "op"
          } else if (v === Object(v) && Object.keys(v).length === 3 && v.hasOwnProperty('name') && v.hasOwnProperty('val') && v.hasOwnProperty('op')) {
            newObj[v.name[0]] = this.parseVMwareObject(v.val[0]);

            // Is an object
            // Have 2 props
            // Has prop "name" and has prop "op"
          } else if (v === Object(v) && Object.keys(v).length === 2 && v.hasOwnProperty('name') && v.hasOwnProperty('op')) {
            newObj[v.name[0]] = null;

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
            if (!newObj[key]) newObj[key] = [];

            newObj[key][k] = this.parseVMwareObject(v);

            // Is array of strings
          } else if (typeof v === 'string') {
            if (!newObj[key]) newObj[key] = [];
            newObj[key][k] = newObj[k] = (v === 'true' ? true : v === 'false' ? false : v);

          } else {
            newObj[k] = v;
            console.log(value, v, k, v === Object(v), v.length, v.hasOwnProperty('xsi:type'), Array.isArray(v), 'errrrrr parsing');
          }

        });

        return newObj;

      } else if (typeof value === 'string') {
        newObj[key] = (value === 'true' ? true : value === 'false' ? false : value);
        return newObj;
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
    throw {
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

  doCall(host: string, port: number, path: string): Promise<any> {

    return this.http.post('/api/vmware/call', {
      host,
      port,
      path,
    }).pipe(map((res: any) => {
        if (res.status === 'error') return this.errorHandler(res.data);

        return res.data;
      },
      error => {
        this.logger.error('[VMWare] -> doCall -> Error while doing the call -> ', error);
      })).toPromise();

  }

  private doCallSoap(credential: string, host: string, port: number, action: string, xml: string): Observable<any> {

    return this.http.post('/api/vmware/callSoap', {
      credential,
      host,
      port,
      action,
      xml
    }).pipe(map((res: any) => {
        if (res.status === 'error') return this.errorHandler(res.data);

        // Something is wrong
        if (res.data['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
          return this.errorHandler({
            detail: res.data['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0].detail[0],
            faultstring: res.data['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0].faultstring
          });
        }

        return res.data['soapenv:Envelope']['soapenv:Body'][0];
      },
      error => {
        this.logger.error('[VMWare] -> doCallSoap -> Error while doing the call -> ', error);
      }));

  }

  private getTaskResults(credential, host, port, taskId): Promise<any> {
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

    })).toPromise();
  }

  private getTaskStatus(credential, host, port, taskId): Promise<any> {
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
        console.log('running', taskInfo);

        return new Observable(observer => {
          setTimeout(() => {
            observer.next(this.getTaskStatus(credential, host, port, taskId));
          }, 2000);
        }).toPromise();
      }

      console.log('finished', taskInfo);

      return this.getTaskResults(credential, host, port, taskId).then((res) => {
        return res;
      });
    })).toPromise();
  }

  /**
   * Basics
   */
  getClientVersion(host, port): Promise<any> {
    return this.http.post('/api/vmware/getClientVersion', {
      host,
      port
    }).pipe(map((res: any) => {
        return this.validResponse(res.data.ConfigRoot.clientConnection[0]);
      },
      error => {
        this.logger.error('[VMWare] -> getClientVersion -> Error while doing the call -> ', error);
      })).toPromise();
  }

  connectvCenter(credential, host, port): Promise<any> {
    return this.http.post('/api/vmware/connect', {
      host,
      port,
      credential
    }).pipe(map((data: any) => {
        return this.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenter -> Error while doing the call -> ', error);
      })).toPromise();
  }

  connectvCenterSoap(credential, host, port): Promise<any> {
    return this.http.post('/api/vmware/connectSoap', {
      host,
      port,
      credential
    }).pipe(map((data: any) => {
        return this.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenterSoap -> Error while doing the call -> ', error);
      })).toPromise();
  }

  createAllBasicDataFilter(credential, host, port): Promise<any> {
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
          <pathSet>summary.accessible</pathSet>
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.CreateFilterResponse[0].returnval[0]._);
    })).toPromise();
  }

  getWaitForUpdatesEx(credential, host, port): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.WaitForUpdatesExResponse[0]));
    })).toPromise();
  }

  registerExtension(credential, host, port): Promise<any> {
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RegisterExtensionResponse[0]);
    })).toPromise();
  }

  findSysOSExtension(credential, host, port): Promise<any> {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <FindExtension xmlns="urn:vim25">
      <_this type="ExtensionManager">ExtensionManager</_this>
      <extensionKey>com.sysos.management</extensionKey>
    </FindExtension>
  </soapenv:Body>
</soapenv:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.FindExtensionResponse[0]);
    })).toPromise();
  }

  /**
   * TaskManager
   */
  createTask(credential, host, port, taskTypeId, objectType, objectId): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.CreateTaskResponse[0].returnval[0]));
    })).toPromise();
  }

  setTaskState(credential, host, port, taskId, state): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.SetTaskStateResponse[0]));
    })).toPromise();
  }

  updateTaskProgress(credential, host, port, taskId, progress): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <UpdateProgress xmlns="urn:vim25">
      <_this type="Task">${taskId}</_this>
      <percentDone>${progress}</percentDone>
    </UpdateProgress>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.UpdateProgressResponse[0]));
    })).toPromise();
  }

  /**
   * Ticket
   */
  acquireVMTicket(credential, host, port, vm): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.AcquireTicketResponse[0].returnval[0]);
    })).toPromise();
  }

  acquireNFCTicket(credential, host, port, esxiHost, datastore): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.NfcFileManagementResponse[0].returnval[0]);
    })).toPromise();
  }

  /**
   * Host
   */
  getComputeResource(credential, host, port, computeResource): Promise<any> {

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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  getClusterComputeResource(credential, host, port, clusterComputeResource): Promise<any> {
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  getResourcePool(credential, host, port, resourcePool): Promise<any> {
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise();
  }

  getHosts(credential, host, port, datacenterFolder): Promise<any> {
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  getHost(credential, host, port, esxiHost): Promise<any> {

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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise();
  }

  getHostStorageSystem(credential, host, port, esxiHost): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise();
  }

  getHostFirewallSystem(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.firewallSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise();
  }

  getHostFirewallRules(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>config.firewall</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]));
    })).toPromise();
  }

  updateHostFirewallRuleset(credential, host, port, firewallSystem, ruleId, ipAddress): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <UpdateRuleset xmlns="urn:vim25">
      <_this type="HostFirewallSystem">${firewallSystem}</_this>
      <id>${ruleId}</id>
      <spec>
        <allowedHosts>
          <ipAddress>${ipAddress}</ipAddress>
          <!-- <ipNetwork>
             <network></network>
             <prefixLength>0</prefixLength>
          </ipNetwork> -->
          <allIp>false</allIp>
        </allowedHosts>
      </spec>
    </UpdateRuleset>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise();
  }

  getHostStorageSystemData(credential, host, port, storageSystem): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  getHostConnectionState(credential, host, port, esxiHost): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise();
  }

  // Gets networkSystem from ESXi host
  // return vmwareFactory.getHostConfigManagerNetworkSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01',
  // '443', 'host-10');
  getHostConfigManagerNetworkSystem(credential, host, port, esxiHost): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise();
  }

  // Gets datastoreSystem from ESXi host
  // return vmwareFactory.getHostConfigManagerDatastoreSystem('adee0997-62ec-470e-aa81-045a446ceec5',
  // 'mvcenter01', '443', 'host-10');
  getHostConfigManagerDatastoreSystem(credential, host, port, esxiHost): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise();
  }

  // Gets networkSystem Virtual NICS
  // vmwareFactory.getHostNetworkInfoVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
  // 'networkSystem-10');
  getHostNetworkInfoVnic(credential, host, port, networkSystem): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  // Gets networkSystem Console Virtual NICS
  // vmwareFactory.getHostNetworkInfoConsoleVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
  // 'networkSystem-10');
  getHostNetworkInfoConsoleVnic(credential, host, port, networkSystem): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  /**
   * Datastore
   */
  getDatastores(credential, host, port, datacenterFolder): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  getDatastoresWithVMsData(credential, host, port, datacenterFolder): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  getDatastoreProps(credential, host, port, datastore): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise();
  }

  getVMFileDataFromDatastore(credential, host, port, datastore, datastoreName, vmxPath, vmxFile): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const taskId = data.SearchDatastore_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).then((res: any) => {
        return this.validResponse(res);
      });

    })).toPromise();
  }

  getFilesDataFromDatastore(credential, host, port, datastore, datastoreName, path): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const taskId = data.SearchDatastore_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).then((res: any) => {
        console.log(res);
        return this.validResponse(res);
      });

    })).toPromise();
  }

  deleteFileFromDatastore(credential, host, port, datastoreName, path, datacenter): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const taskId = data.DeleteDatastoreFile_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).then((res: any) => {
        return this.validResponse(res);
      });

    })).toPromise();
  }

  moveFileFromDatastore(credential, host, port, srcDatastoreName, srcPath, srcDatacenter, dstDatastoreName, dstPath, dstDatacenter, force?): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const taskId = data.MoveDatastoreFile_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).then((res: any) => {
        return this.validResponse(res);
      });

    })).toPromise();
  }

  copyFileFromDatastore(credential, host, port, srcDatastoreName, srcPath, srcDatacenter, dstDatastoreName, dstPath, dstDatacenter, force): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const taskId = data.CopyDatastoreFile_TaskResponse[0].returnval[0]._;

      return this.getTaskStatus(credential, host, port, taskId).then((res: any) => {
        return this.validResponse(res);
      });

    })).toPromise();
  }

  createFolderToDatastore(credential, host, port, datastoreName, path, datacenter): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return data.MakeDirectoryResponse[0];
    })).toPromise();
  }

  mountDatastore(credential, host, port, datastoreSystem, remoteHostNames, datastorePath, datastoreLocalName, protocolType: 'NFS' | 'NFS41'): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateNasDatastore xmlns="urn:vim25">
      <_this type="HostDatastoreSystem">${datastoreSystem}</_this>
      <spec>
        <remoteHost>${remoteHostNames}</remoteHost>
        <remotePath>${datastorePath}</remotePath>
        <localPath>${datastoreLocalName}</localPath>
        <accessMode>readWrite</accessMode>
        <type>${protocolType}</type>
        <remoteHostNames>${remoteHostNames}</remoteHostNames>
      </spec>
    </CreateNasDatastore>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.CreateNasDatastoreResponse[0].returnval[0]._);
    })).toPromise();
  }

  unmountDatastore(credential, host, port, datastoreSystem, datastore): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RemoveDatastore xmlns="urn:vim25">
      <_this type="HostDatastoreSystem">${datastoreSystem}</_this>
      <datastore type="Datastore">${datastore}</datastore>
    </RemoveDatastore>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RemoveDatastoreResponse[0]);
    })).toPromise();
  }

  /**
   *  VM
   */
  getVMs(credential, host, port, datacenterFolder): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  getVMState(credential, host, port, vm, getAll): Promise<any> {
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise();
  }

  getVMPath(credential, host, port, vm): Promise<any> {
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise();
  }

  getVMRuntime(credential, host, port, vm): Promise<any> {
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

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise();
  }

  queryVMEvents(credential, host, port, vm): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.QueryEventsResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }

  /**
   * Snapshot
   */

  getVMSnapshots(credential, host, port, vm): Promise<any> {
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
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise();
  }



  /**
   * Datastore Upload
   */
  uploadFileToDatastore(url, path, credential) {
    return this.http.post('/api/vmware/upload_to_datastore', {
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

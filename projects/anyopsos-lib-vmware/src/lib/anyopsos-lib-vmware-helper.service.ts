import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionData} from './types/connection-data';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHelperService {

  constructor(private http: HttpClient,
              private logger: AnyOpsOSLibLoggerService) {
  }

  /**
   * Parsers
   */
  parseVMwareObject(data) {
    // String
    if (typeof data === 'string') {
      return (data === 'true' ? true : data === 'false' ? false : data);
    }

    // Array
    if (Array.isArray(data)) {
      const newObj = [];
      // Non standard arrays

      // Case 1
      if (data.length === 1 && typeof data[0] === 'string') {
        return this.parseVMwareObject(data[0]);
      }

      // Case 2
      if (data.length === 1 && data[0] === Object(data[0]) && Object.keys(data[0]).length === 2 && data[0].hasOwnProperty('$') && data[0].hasOwnProperty('_')) {
        if (data[0].$.type) {
          return {
            type: data[0].$.type,
            name: this.parseVMwareObject(data[0]._)
          };
        } else {
          return this.parseVMwareObject(data[0]._);
        }
      }

      // Parse as normal data array
      data.forEach((value, key) => {
        newObj[key] = this.parseVMwareObject(value);
      });

      return newObj;
    }

    // Object
    if (data === Object(data)) {
      let newObj: any = {};
      // Non standard objects

      // Case 1
      if (Object.keys(data).length === 2 && data.hasOwnProperty('name') && data.hasOwnProperty('val')) {
        if (data[data.name[0]] === undefined) {
          newObj[data.name[0]] = this.parseVMwareObject(data.val);
        } else {
          console.log('ejhe,');
          newObj[data[data.name[0]]] = this.parseVMwareObject(data.val);
        }

        return newObj;
      }

      // Case 2
      if (Object.keys(data).length === 2 && data.hasOwnProperty('$') && data.hasOwnProperty('_')) {
        if (data.$.type) {
          newObj.type = data.$.type;
          newObj.name = data._;
        } else {
          newObj = data._;
        }

        return newObj;
      }

      // Case 5
      if (Object.keys(data).length === 1 && data.hasOwnProperty('$') && Object.keys(data.$).length === 1 && data.$.hasOwnProperty('xsi:type')) {
        newObj.xsi_type = data.$['xsi:type'];

        return newObj;
      }

      // Parse as normal data object
      Object.entries(data).forEach(([key, value]) => {

        // Sub special Case 1
        if (key === '$' && value === Object(value) && Object.keys(value).length === 1 && value.hasOwnProperty('xsi:type')) {
          newObj.xsi_type = value['xsi:type'];
          return;
        }

        newObj[key] = this.parseVMwareObject(value);
      });

      return newObj;
    }

    // Any other data type (boolean, number...)
    return data;

  }

  setDynamicProperties(data: {}) {

    // On second iteration, data can be:
    if (typeof data === 'string' || typeof data === 'boolean' || typeof data === 'number') return data;

    return `${Object.entries(data).map(([key, value]) => {

      if (key.charAt(0) === '$') return;

      // If value is an array we don't want the 'childKey' only the 'childValues'
      if (Array.isArray(value)) {

        return `${value.map(
          (childVal) => `<${key}${Object.entries(childVal).map(([k, v]) => {

            // If has a key that starts with '$' means that is a property
            if (k.charAt(0) === '$') return ` ${k.substr(1)}='${v}'`;

          }).join('')}>${this.setDynamicProperties(childVal)}</${key}>`
        ).join('')}`;
      }

      if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') return `<${key}>${value}</${key}>`;

      if (value === Object(value)) {
        return `<${key}${Object.entries(value).map(([k, v]) => {

          // If has a key that starts with '$' means that is a property
          if (k.charAt(0) === '$') return ` ${k.substr(1)}='${v}'`;

        }).join('')}>${

          // If has a key that starts with '_' it's a single value
          (Object.keys(value).some((k) => k.charAt(0) === '_') ?
              value[Object.keys(value).find((k) => {
                return k.charAt(0) === '_';
              })] :
              this.setDynamicProperties(value)
          )

        }</${key}>`;
      }

      console.log('err parsing setDynamicProperties');
      return `<${key}>${value}</${key}>`;
    }).join('')}`;

  }

  /**
   * Custom errorHandler function for VMwareFactory
   */
  private errorHandler(e: any): { status: string, error: any } {
    throw {
      status: 'error',
      error: e
    };
  }

  /**
   * Custom validResponse function for VMwareFactory
   */
  validResponse(data: any): { status: string, data: any } {
    return {
      status: 'ok',
      data
    };
  }

  /**
   * Connections
   */
  getClientVersion(connectionData: ConnectionData): Promise<any> {
    return this.http.post('/api/vmware/getClientVersion', {
      host: connectionData.host,
      port: connectionData.port,
    }).pipe(map((res: any) => {
        if (res.status === 'error') return this.errorHandler(res.data);
        return this.validResponse(res.data.ConfigRoot.clientConnection[0]);
      },
      error => {
        this.logger.error('[VMWare] -> getClientVersion -> Error while doing the call -> ', error);
      })).toPromise();
  }

  connectvCenter(connectionData: ConnectionData): Promise<any> {
    return this.http.post('/api/vmware/connect', {
      host: connectionData.host,
      port: connectionData.port,
      credential: connectionData.credential
    }).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.data);
        return this.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenter -> Error while doing the call -> ', error);
      })).toPromise();
  }

  connectvCenterSoap(connectionData: ConnectionData): Promise<any> {
    return this.http.post('/api/vmware/connectSoap', {
      host: connectionData.host,
      port: connectionData.port,
      credential: connectionData.credential
    }).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.data);
        return this.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenterSoap -> Error while doing the call -> ', error);
      })).toPromise();
  }

  /**
   * Calls
   */
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

  doCallSoap(connectionData: ConnectionData, xml: string, action: string = 'urn:vim25/6.0'): Observable<any> {

    return this.http.post('/api/vmware/callSoap', {
      credential: connectionData.credential,
      host: connectionData.host,
      port: connectionData.port,
      xml: `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>
  <soap:Body>${xml}</soap:Body>
</soap:Envelope>`,
      action
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

  /**
   * Tasks
   */
  private getTaskResults(connectionData, taskId): Promise<any> {
    const xml = `<RetrieveProperties xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Task</type>
          <pathSet>info</pathSet>
        </propSet>
        <objectSet>
          <obj type='Task'>${taskId}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>`;
    return this.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return res;

    })).toPromise();
  }

  getTaskStatus(connectionData: ConnectionData, taskId): Promise<any> {
    const xml = `<RetrieveProperties xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Task</type>
          <pathSet>info.progress</pathSet>
          <pathSet>info.state</pathSet>
          <pathSet>info.cancelable</pathSet>
        </propSet>
        <objectSet>
          <obj type='Task'>${taskId}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>`;
    return this.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      const taskInfo = this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]);

      if (taskInfo['info.state'] === 'running') {
        console.log('running', taskInfo);

        return new Observable(observer => {
          setTimeout(() => {
            observer.next(this.getTaskStatus(connectionData, taskId));
          }, 2000);
        }).toPromise();
      }

      console.log('finished', taskInfo);

      return this.getTaskResults(connectionData, taskId).then((res) => {
        return res;
      });
    })).toPromise();
  }
}

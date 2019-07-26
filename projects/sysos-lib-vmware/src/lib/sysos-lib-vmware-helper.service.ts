import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {map} from "rxjs/operators";
import {Observable} from "rxjs";

import {NGXLogger} from "ngx-logger";
import {connectionData} from "./types/connection-data";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHelperService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
  }

  parseVMwareObject(data) {

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
  validResponse(data: any): { status: string, data: any } {
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

  doCallSoap(connectionData: connectionData, xml: string, action: string = 'urn:vim25/6.0'): Observable<any> {

    return this.http.post('/api/vmware/callSoap', {
      credential: connectionData.credential,
      host: connectionData.host,
      port: connectionData.port,
      xml,
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
}

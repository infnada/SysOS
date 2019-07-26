import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";
import {connectionData} from "../types/connection-data";
import {PerfQuerySpec} from "../types/perf-query-spec";
import {ManagedObjectReference} from "../types/managed-object-reference";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwarePerformanceManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CreatePerfInterval() {

  }

  QueryAvailablePerfMetric(
    connectionData: connectionData,
    managedObject: ManagedObjectReference,
    beginTime?: Date,
    endTime?: Date,
    intervalId?: number
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryAvailablePerfMetric xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <entity type="${managedObject.type}">${managedObject.value}</entity>
      <beginTime>${beginTime}</beginTime>
      <endTime>${endTime}</endTime>
      <intervalId>${intervalId}</intervalId>
    </QueryAvailablePerfMetric>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      data.QueryAvailablePerfMetricResponse[0].returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  QueryPerf(
    connectionData: connectionData,
    querySpec: PerfQuerySpec[]
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerf xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      ${querySpec.forEach((spec) => {
      return `<querySpec>${Object.entries(spec).forEach(([key, value]) => {
        return `<${key}>${value}</${key}>`;
      })}</querySpec>`;
    })}
    </QueryPerf>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.QueryPerfResponse[0].returnval[0]);
    })).toPromise();
  }

  QueryPerfComposite() {

  }

  QueryPerfCounter(
    connectionData: connectionData,
    counterId: number[]
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerfCounter xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      ${counterId.forEach((counter) => {
      return `<counterId>${counter}</counterId>`;
    })}
    </QueryPerfCounter>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.QueryPerfCounterResponse[0].returnval[0]);
    })).toPromise();
  }

  QueryPerfCounterByLevel(
    connectionData: connectionData,
    level: number
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerfCounterByLevel xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <level>${level}</level>
    </QueryPerfCounterByLevel>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      data.QueryPerfCounterByLevelResponse[0].returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  QueryPerfProviderSummary(
    connectionData: connectionData,
    managedObject: ManagedObjectReference
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryPerfProviderSummary xmlns="urn:vim25">
      <_this type="PerformanceManager">PerfMgr</_this>
      <entity type="${managedObject.type}">${managedObject}</entity>
    </QueryPerfProviderSummary>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.QueryPerfProviderSummaryResponse[0].returnval[0]);
    })).toPromise();
  }

  RemovePerfInterval() {

  }

  ResetCounterLevelMapping() {

  }

  UpdateCounterLevelMapping() {

  }

  UpdatePerfInterval() {

  }
}

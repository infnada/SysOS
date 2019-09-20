import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {v4 as uuidv4} from 'uuid';

import {Netdata} from "../types/netdata";

@Injectable({
  providedIn: 'root'
})
export class SysosAppMonitorService {

  private NETDATA;

  private $connections: BehaviorSubject<Netdata[]>;
  private $activeConnection: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    connections: Netdata[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  constructor() {
    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<Netdata[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
  }

  setNetdata(NETDATA) {
    this.NETDATA = NETDATA;
  }

  getNetdata() {
    return this.NETDATA;
  }

  connect(data) {
    let uuid = uuidv4();

    this.dataStore.connections.push({
      uuid: uuid,
      url: data.url,
      description: data.description,
      credential: data.credential,
      autologin: data.autologin,
      save: data.save,
      type: data.type,
      state: 'connected'
    });

    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  getActiveConnection(): Netdata {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

}

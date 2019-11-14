import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibServiceInjectorService {

  private serviceInjectors: {[key: string]: any} = {};

  constructor() {
  }

  set(injectorName: string, injectorInstance: any) {
    this.serviceInjectors[injectorName] = injectorInstance;
  }

  get(injectorName: string) {
    return this.serviceInjectors[injectorName];
  }
}

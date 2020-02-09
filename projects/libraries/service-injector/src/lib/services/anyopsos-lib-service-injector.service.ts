import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibServiceInjectorService {

  private serviceInjectors: { [key: string]: any; } = {};

  constructor() {
  }

  set(injectorName: string, injectorInstance: any): void {
    this.serviceInjectors[injectorName] = injectorInstance;
  }

  get(injectorName: string): any {
    return this.serviceInjectors[injectorName];
  }
}

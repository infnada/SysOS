import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibKubernetesApiService {

  constructor(private http: HttpClient,
              private logger: AnyOpsOSLibLoggerService) {
  }

  /**
   * Custom errorHandler function for Kubernetes
   */
  private errorHandler(e: any): { status: string, error: any } {
    console.error({
      status: 'error',
      error: (e.html && e.html.head[0].title ? e.html.head[0].title : e)
    });

    return {
      status: 'error',
      error: (e.html && e.html.head[0].title ? e.html.head[0].title : e)
    };
  }

  getResourceBySelfLink(object): Promise<any> {
    return this.http.get(`/api/kubernetes/resource/${object.info.mainUuid}/${encodeURIComponent(object.info.data.metadata.selfLink)}`).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.errno ? data.errno : data.data);
        if (!data.data) return this.errorHandler(data.data);

        return data;
      },
      error => {
        this.logger.error('LibKubernetes', ' -> getResourceBySelfLink -> Error while doing the call', null, error);
      })).toPromise();
  }

  getContainerLogsToSocket(connectionUuid: string, terminalUuid: string, namespace: string, pod: string, container: string, showContainersName: boolean = false): Promise<any> {
    return this.http.get(`/api/kubernetes/log/${connectionUuid}/${terminalUuid}/${namespace}/${pod}/${container}/${showContainersName}`).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.errno ? data.errno : data.data);

        return data;
      },
      error => {
        this.logger.error('LibKubernetes', 'getContainerLogsToSocket -> Error while doing the call', null, error);
      })).toPromise();
  }

  endContainerLogs(logUuid: string): Promise<any> {
    return this.http.delete(`/api/kubernetes/log/${logUuid}`).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.errno ? data.errno : data.data);

        return data;
      },
      error => {
        this.logger.error('LibKubernetes', 'endContainerLogs -> Error while doing the call', null, error);
      })).toPromise();
  }

  getContainerShellToSocket(type: string, connectionUuid: string, terminalUuid: string, namespace: string, pod: string, container: string, command: string = '/bin/sh'): Promise<any> {
    return this.http.get(`/api/kubernetes/shell/${type}/${connectionUuid}/${terminalUuid}/${namespace}/${pod}/${container}/${encodeURIComponent(command)}`).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.errno ? data.errno : data.data);

        return data;
      },
      error => {
        this.logger.error('LibKubernetes', 'getContainerShellToSocket -> Error while doing the call', null, error);
      })).toPromise();
  }

  endContainerShell(terminalUuid: string): Promise<any> {
    return this.http.delete(`/api/kubernetes/shell/${terminalUuid}`).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.errno ? data.errno : data.data);

        return data;
      },
      error => {
        this.logger.error('LibKubernetes', 'endContainerShell -> Error while doing the call', null, error);
      })).toPromise();
  }
}

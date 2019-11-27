import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ImDataObject} from '@anyopsos/app-infrastructure-manager';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibKubernetesService {

  constructor(private http: HttpClient,
              private logger: AnyOpsOSLibLoggerService) {
  }

  /**
   * Custom errorHandler function for KubernetesFactory
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

  getResourceBySelfLink(object: ImDataObject): Promise<any> {
    return this.http.get(`/api/kubernetes/${object.info.mainUuid}/${encodeURIComponent(object.info.data.metadata.selfLink)}`).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.errno ? data.errno : data.data);
        if (!data.data) return this.errorHandler(data.data);

        return data;
      },
      error => {
        this.logger.error('[Kubernetes] -> getResourceBySelfLink -> Error while doing the call -> ', error);
      })).toPromise();
  }
}

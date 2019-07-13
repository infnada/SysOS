import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class SysosLibNetappService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
  }

  // netapp-manageability-sdk-ontap-9.3-api-documentation/doc/WebHelp/index.htm


  private parseNetAppObject(data, parent?) {

    if (!parent) parent = {};

    Object.entries(data).forEach(([key, value]) => {

      if (Array.isArray(value) && value.length === 1 && value[0] !== Object(value[0])) {
        parent[key] = (value[0] === "true" ? true : value[0] === "false" ? false : value[0]);
      } else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
        parent[key] = this.parseNetAppObject(value[0], parent[key]);
      } else if (Array.isArray(value) && value.length > 1 && value[0] === Object(value[0])) {
        parent[key] = value;

        Object.entries(value).forEach(([k, v]) => {
          parent[key][k] = this.parseNetAppObject(v, parent[k]);
        });

      } else {
        parent[key] = value;
      }
    });

    return parent;

  }

  /**
   * Custom errorHandler function for NetAppFactory
   */
  private errorHandler(e: any): { status: string, error: any } {
    throw {
      status: 'error',
      error: (e.html && e.html.head[0].title ? e.html.head[0].title : e)
    };
  }

  /**
   * Custom validResponse function for NetAppFactory
   */
  private validResponse(data: any): { status: string, data: any } {
    return {
      status: 'ok',
      data
    };
  }

  private doCall(credential: string, host: string, port: string, path: string, xml: string): Observable<any> {

    return this.http.post('/api/netapp/call', {
      credential,
      host,
      port,
      path,
      xml
    }).pipe(map((data: any) => {
        if (data.status === 'error') return this.errorHandler(data.errno);
        if (!data.data.netapp) return this.errorHandler(data.data.response);
        if (data.data.netapp.results[0].$.status === 'failed') {
          return this.errorHandler(data.data.response.netapp.results[0].$);
        }

        return data.data.netapp.results[0];
      },
      error => {
        this.logger.error('[NetApp] -> doCall -> Error while doing the call -> ', error);
      }));

  }

  /**
   * PUBLIC FUNCTIONS
   */
  getSystemVersion(credential, host, port): Promise<any> {
    return this.doCall(
      credential,
      host, port,
      null,
      `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><system-get-version/></netapp>`
    ).pipe(map((data: any) => {
      return this.validResponse({
        build_timestamp: data['build-timestamp'][0],
        is_clustered: data['is-clustered'][0],
        version: data.version[0],
        version_tuple: {
          generation: data['version-tuple'][0]['system-version-tuple'][0].generation[0],
          major: data['version-tuple'][0]['system-version-tuple'][0].major[0],
          minor: data['version-tuple'][0]['system-version-tuple'][0].minor[0]
        }
      });

    })).toPromise();
  }

  getOntapiVersion(credential, host, port): Promise<any> {
    return this.doCall(
      credential,
      host,
      port,
      null,
      `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><system-get-ontapi-version/></netapp>`
    ).pipe(map((data: any) => {
      return this.validResponse({
        major_version: data['major-version'][0],
        minor_version: data['minor-version'][0]
      });

    })).toPromise();
  }

  getLicenses(credential, host, port): Promise<any> {
    return this.doCall(
      credential,
      host, port,
      null,
      `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><license-v2-status-list-info/></netapp>`
    ).pipe(map((data: any) => {
      const results = [];

      data['license-v2-status']['0']['license-v2-status-info'].forEach(license => {
        results.push(this.parseNetAppObject(license));
      });

      return this.validResponse(results);
    })).toPromise();
  }

  getMetrocluster(credential, host, port): Promise<any> {
    return this.doCall(
      credential,
      host,
      port,
      null,
      `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><metrocluster-get/></netapp>`
    ).pipe(map((data: any) => {
      return this.validResponse({
        local_cluster_name: data.attributes[0]['metrocluster-info'][0]['local-cluster-name'][0],
        local_configuration_state: data.attributes[0]['metrocluster-info'][0]['local-configuration-state'][0]
      });

    })).toPromise();
  }

  getClusterIdentity(credential, host, port): Promise<any> {
    return this.doCall(
      credential,
      host,
      port,
      null,
      `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><cluster-identity-get/></netapp>`
    ).pipe(map((data: any) => {
      return this.validResponse({
        cluster_contact: data.attributes[0]['cluster-identity-info'][0]['cluster-contact'][0],
        cluster_location: data.attributes[0]['cluster-identity-info'][0]['cluster-location'][0],
        cluster_name: data.attributes[0]['cluster-identity-info'][0]['cluster-name'][0],
        cluster_serial_number: data.attributes[0]['cluster-identity-info'][0]['cluster-serial-number'][0],
        cluster_uuid: data.attributes[0]['cluster-identity-info'][0]['cluster-uuid'][0],
        rdb_uuid: data.attributes[0]['cluster-identity-info'][0]['rdb-uuid'][0]
      });
    })).toPromise();
  }

  getQtrees(credential, host, port, vfiler, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <qtree-list-iter>
    <max-records>10</max-records>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </qtree-list-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['qtree-info'].forEach(qtree => {
          results.push(this.parseNetAppObject(qtree));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getQtrees(credential, host, port, vfiler, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getNetInterfaces(credential, host, port, vfiler?, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <net-interface-get-iter>
    <max-records>10</max-records>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </net-interface-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['net-interface-info'].forEach(netiface => {
          results.push(this.parseNetAppObject(netiface));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getNetInterfaces(credential, host, port, vfiler, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getFcpInterfaces(credential, host, port, vfiler?, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <fcp-interface-get-iter>
    <max-records>10</max-records>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </fcp-interface-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['fcp-interface-info'].forEach(fcpiface => {
          results.push(this.parseNetAppObject(fcpiface));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getFcpInterfaces(credential, host, port, vfiler, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getFcpAdapters(credential, host, port, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'>
  <fcp-adapter-get-iter>
    <max-records>10</max-records>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </fcp-adapter-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['fcp-config-adapter-info'].forEach(fcpadapter => {
          results.push(this.parseNetAppObject(fcpadapter));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getFcpAdapters(credential, host, port, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getNFSService(credential, host, port, vfiler): Promise<any> {
    return this.doCall(
      credential,
      host,
      port,
      null,
      `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}><nfs-service-get/></netapp>`
    ).pipe(map((data: any) => {
      return this.validResponse(this.parseNetAppObject(data.attributes[0]['nfs-info'][0]));
    })).toPromise();
  }

  getVservers(credential, host, port, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'>
  <vserver-get-iter>
    <max-records>10</max-records>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </vserver-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['vserver-info'].forEach(vserver => {
          results.push(this.parseNetAppObject(vserver));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getVservers(credential, host, port, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getVolumes(credential, host, port, vfiler, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <volume-get-iter>
    <max-records>10</max-records>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </volume-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {

      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['volume-attributes'].forEach(volume => {
          results.push(this.parseNetAppObject(volume));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getVolumes(credential, host, port, vfiler, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getVolumeFiles(credential, host, port, vfiler, volume, path = '', results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <file-list-directory-iter>
    <path>/vol/${volume}/${path}</path>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </file-list-directory-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        // For each file found
        data['attributes-list'][0]['file-info'].forEach(file => {
          file = this.parseNetAppObject(file);
          if (file.name === '.' || file.name === '..') return;

          file.path = path;
          results.push(file);
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getVolumeFiles(credential, host, port, vfiler, volume, path, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getSnapshots(credential, host, port, vfiler, volume, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <snapshot-get-iter>
    <max-records>10</max-records>
    ${volume ? '<query><snapshot-info><volume>' + volume + '</volume></snapshot-info></query>' : ''}${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </snapshot-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {

      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['snapshot-info'].forEach(snapshot => {
          results.push(this.parseNetAppObject(snapshot));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getSnapshots(credential, host, port, vfiler, volume, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path = '', results = [], nextTag = null): Promise<any> {
    const diPromises = [];
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <file-list-directory-iter>
    <path>/vol/${volume}/.snapshot/${snapshot}${path}</path>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </file-list-directory-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        // For each file found
        data['attributes-list'][0]['file-info'].forEach(file => {
          file = this.parseNetAppObject(file);
          if (file.name === '.' || file.name === '..') return;

          file.path = path;
          results.push(file);

          // Get directories
          if (file['file-type'] === 'directory') {
            diPromises.push(this.getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path + '/' + file.name, results));
          }
        });

        // if directory found
        if (diPromises.length > 0) {

          // Get all files in each found directory
          return Promise.all(diPromises).then(res => {

            res = res[0].data;

            if (data['next-tag']) {
              nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
              return this.getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path, res, nextTag);
            }

            return this.validResponse(res);

          });
        }

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  getSnapshotFileInfo(credential, host, port, vfiler, volume, snapshot): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <file-get-file-info>
    <path>/vol/${volume}/.snapshot/${snapshot}</path>
  </file-get-file-info>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(this.parseNetAppObject(data['file-info'][0]));
    })).toPromise();
  }

  snapshotRestoreFile(credential, host, port, vfiler, volume, snapshot, dst): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <snapshot-restore-file>
    <path>${dst}</path>
    <snapshot>${snapshot}</snapshot>
    <volume>${volume}</volume>
  </snapshot-restore-file>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.data.data.response.netapp);
    })).toPromise();
  }

  createSnapshot(credential, host, port, vfiler, volume, name?): Promise<any> {
    const snapshotName = volume + '_SysOS_' + (name ? name : '') + '_' + new Date().toISOString().split('.')[0].replace(/:/g, '');
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <snapshot-create>
    <async>False</async>
    <snapshot>${snapshotName}</snapshot>
    <volume>${volume}</volume>
  </snapshot-create>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.$.status);
    })).toPromise();
  }

  deleteSnapshot(credential, host, port, vfiler, volume, snapshotName, snapshotUuid): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <snapshot-delete>
    <snapshot>${snapshotName}</snapshot>
    ${snapshotUuid ? '<snapshot-instance-uuid>' + snapshotUuid + '</snapshot-instance-uuid>' : ''}
    <volume>${volume}</volume>
  </snapshot-delete>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.$.status);
    })).toPromise();
  }

  getLuns(credential, host, port, vfiler, volume, results = [], nextTag = null): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <lun-get-iter>
    <max-records>10</max-records>
    ${volume ? '<query><lun-info><volume>' + volume + '</volume></lun-info></query>' : ''}${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </lun-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {

      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (data['attributes-list']) {

        data['attributes-list'][0]['lun-info'].forEach(lun => {
          results.push(this.parseNetAppObject(lun));
        });

        if (data['next-tag']) {
          nextTag = data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getLuns(credential, host, port, vfiler, volume, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }

  cloneVolumeFromSnapshot(credential, host, port, vfiler, parentVolume, volume, snapshot): Promise<any> {
    const xml = `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <volume-clone-create>
    <parent-volume>${parentVolume}</parent-volume>
    <volume>${volume}</volume>
    <space-reserve>none</space-reserve>
    <parent-snapshot>${snapshot}</parent-snapshot>
  </volume-clone-create>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.$.status);
    })).toPromise();
  }

  mountVolume(credential, host, port, vfiler, volume, junction): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <volume-mount>
    <activate-junction>true</activate-junction>
    <junction-path>${junction}</junction-path>
    <volume-name>${volume}</volume-name>
    <export-policy-override>false</export-policy-override>
  </volume-mount>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.$.status);
    })).toPromise();
  }

  unmountVolume(credential, host, port, vfiler, volume): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <volume-unmount>
    <volume-name>${volume}</volume-name>
    <force>True</force>
  </volume-unmount>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.$.status);
    })).toPromise();
  }

  setVolumeOffline(credential, host, port, vfiler, volume): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <volume-offline>
    <name>${volume}</name>
  </volume-offline>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.$.status);
    })).toPromise();
  }

  destroyVolume(credential, host, port, vfiler, volume): Promise<any> {
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <volume-destroy>
    <name>${volume}</name>
  </volume-destroy>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {
      return this.validResponse(data.$.status);
    })).toPromise();
  }

  getNFSExportRulesList(credential, host, port, vfiler, volume): Promise<any> {
    const results = [];
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <nfs-exportfs-list-rules-2>
    <pathname>/${volume}</pathname>
    <persistent>True</persistent>
  </nfs-exportfs-list-rules-2>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {

      data.rules[0]['exports-rule-info-2'][0]['security-rules'][0]['security-rule-info'].forEach(rule => {
        results.push(this.parseNetAppObject(rule));
      });

      return this.validResponse(this.parseNetAppObject(data.rules[0]));
    })).toPromise();
  }

  getExportRules(credential, host, port, vfiler, policy): Promise<any> {
    const results = [];
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <export-rule-get-iter>${policy ? '<query><export-rule-info><policy-name>' + policy + '</policy-name></export-rule-info></query>' : ''}</export-rule-get-iter>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {

      data['attributes-list'][0]['export-rule-info'].forEach(rule => {
        results.push(this.parseNetAppObject(rule));
      });

      return this.validResponse(data);
    })).toPromise();
  }

  setExportRule(credential, host, port, vfiler, policy, client): Promise<any> {
    const results = [];
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <export-rule-create>
    <client-match>${client}</client-match>
    <policy-name>${policy}</policy-name>
    <ro-rule>
      <security-flavor>any</security-flavor>
    </ro-rule>
    <rw-rule>
      <security-flavor>never</security-flavor>
    </rw-rule>
    <rule-index>1</rule-index>
    <super-user-security>
      <security-flavor>any</security-flavor>
    </super-user-security>
  </export-rule-create>
</netapp>`;

    return this.doCall(credential, host, port, null, xml).pipe(map((data: any) => {

      data['attributes-list'][0]['export-rule-info'].forEach(rule => {
        results.push(this.parseNetAppObject(rule));
      });

      return this.validResponse(data);
    })).toPromise();
  }
}

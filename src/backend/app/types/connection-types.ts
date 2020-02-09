import {ConnectionKubernetes} from '@anyopsos/module-kubernetes';
import {ConnectionDocker} from '@anyopsos/module-docker';
import {ConnectionLinux} from '@anyopsos/module-linux';
import {ConnectionSnmp} from '@anyopsos/module-snmp';
import {ConnectionVmware} from '@anyopsos/module-vmware';
import {ConnectionNetapp} from '@anyopsos/module-netapp';

export type ConnectionTypes = ConnectionKubernetes | ConnectionDocker | ConnectionLinux | ConnectionNetapp | ConnectionSnmp | ConnectionVmware;

import {ConnectionKubernetes} from '@anyopsos/module-node-kubernetes';
import {ConnectionDocker} from '@anyopsos/module-node-docker';
import {ConnectionLinux} from '@anyopsos/module-node-linux';
import {ConnectionSnmp} from '@anyopsos/module-node-snmp';
import {ConnectionVmware} from '@anyopsos/module-node-vmware';
import {ConnectionNetapp} from '@anyopsos/module-node-netapp';

export type ConnectionTypes = ConnectionKubernetes | ConnectionDocker | ConnectionLinux | ConnectionNetapp | ConnectionSnmp | ConnectionVmware;

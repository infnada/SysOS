import {ConnectionKubernetes} from './connection-kubernetes';
import {ConnectionDocker} from './connection-docker';
import {ConnectionLinux} from './connection-linux';
import {ConnectionNetapp} from './connection-netapp';
import {ConnectionSnmp} from './connection-snmp';
import {ConnectionVmware} from './connection-vmware';

export type ConnectionTypes = ConnectionKubernetes | ConnectionDocker | ConnectionLinux | ConnectionNetapp | ConnectionSnmp | ConnectionVmware;

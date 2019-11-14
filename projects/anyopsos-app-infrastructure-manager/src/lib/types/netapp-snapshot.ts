export interface NetAppSnapshot {
  'access-time': number;
  'afs-used': number;
  busy: boolean;
  'compress-savings': number;
  'compression-type': string;
  'cumulative-percentage-of-total-blocks': number;
  'cumulative-percentage-of-used-blocks': number;
  'cumulative-total': number;
  'dedup-savings': number;
  dependency: any;
  'inofile-version': number;
  'is-7-mode-snapshot': boolean;
  'is-constituent-snapshot': boolean;
  name: string;
  'percentage-of-total-blocks': number;
  'percentage-of-used-blocks': number;
  'snapshot-instance-uuid': string;
  'snapshot-version-uuid': string;
  total: number;
  'vbn0-savings': number;
  volume: string;
  'volume-provenance-uuid': string;
  vserver: string;
}

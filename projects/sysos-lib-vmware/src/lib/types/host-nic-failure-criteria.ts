export interface HostNicFailureCriteria {
  checkBeacon?: boolean;
  checkDuplex?: boolean;
  checkErrorPercent?: boolean;
  checkSpeed?: string;
  fullDuplex?: boolean;
  percentage?: number;
  speed?: number;
}

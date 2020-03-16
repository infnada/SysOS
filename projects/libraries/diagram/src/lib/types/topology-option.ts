export interface TopologyOption {
  id: string;
  defaultValue: string;
  selectType: string;
  options: {
    label: string;
    value: string;
  }[]
}

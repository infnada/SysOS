export interface Metric {
  id: string;
  label: string;
  format: string;
  value: number;
  max: number;
  min: number;
  priority: number;
}

export interface ImGraphNodeMetric {
  id: string;
  label: string;
  format: string;
  value: string;
  priority: number;
  samples: unknown;
  min: number;
  max: number;
  url: string;
}

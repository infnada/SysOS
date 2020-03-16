export interface NodeMatch {
  label: string;
  length?: number;
  start?: number;
  text?: string;
  truncate?: boolean;
  keyPath: string[];
  metric?: boolean;
}

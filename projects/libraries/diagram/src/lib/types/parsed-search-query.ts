export interface ParsedSearchQuery {
  prefix?: string;
  query?: string;
  metric?: string;
  comp?: 'lt' | 'eq' | 'gt';
  value?: string;
}

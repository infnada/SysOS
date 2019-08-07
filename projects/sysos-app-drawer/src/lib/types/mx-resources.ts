export interface mxResources {
  resources: any[];
  extension: string;
  resourcesEncoded: boolean;
  loadDefaultBundle: boolean;
  loadSpecialBundle: boolean;
  isLanguageSupported(lan: any): boolean;
  getDefaultBundle(basename: any, lan: any): string;
  getSpecialBundle(basename: string, lan: string): string;
  add(basename: string, lan?: string, callback?: () => void): void;
  parse(text: string): void;
  get(key: string, params?: string[], defaultValue?: string): string;
  replacePlaceholders(value: string, params: string[]): string;
  loadResources(callback?: () => void): void;
}

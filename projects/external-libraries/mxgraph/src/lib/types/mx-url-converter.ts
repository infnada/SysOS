/**
 *
 * Converts relative and absolute URLs to absolute URLs with protocol and domain.
 */
export interface mxUrlConverter {
  /**
   * Private helper function to update the base URL.
   */
  updateBaseUrl(): void;
  /**
   * Returns <enabled>.
   */
  isEnabled(): any;
  /**
   * Sets <enabled>.
   */
  setEnabled(value: any): void;
  /**
   * Returns <baseUrl>.
   */
  getBaseUrl(): any;
  /**
   * Sets <baseUrl>.
   */
  setBaseUrl(value: any): void;
  /**
   * Converts the given URL to an absolute URL with protol and domain.
   * Relative URLs are first converted to absolute URLs.
   */
  convert(url: any): any;
}

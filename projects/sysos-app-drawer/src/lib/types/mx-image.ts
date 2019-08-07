/**
 * Encapsulates the URL, width and height of an image.
 */
export interface mxImage {
  /**
   * Constructs a new image.
   * @param src String that specifies the URL of the image.
   * @param width Integer that specifies the width of the image.
   * @param height Integer that specifies the height of the image.
   */
  (src: any, width: any, height: any): void;
  /**
   * String that specifies the URL of the image.
   */
  src: string;
  /**
   * Integer that specifies the width of the image.
   */
  width: number;
  /**
   * Integer that specifies the height of the image.
   */
  height: number;
}

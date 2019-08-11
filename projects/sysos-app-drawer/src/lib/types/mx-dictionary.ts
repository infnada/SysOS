/**
 * A wrapper class for an associative array with object keys. Note: This
 * implementation uses <mxObjectIdentitiy> to turn object keys into strings.
 *
 * Constructor: mxEventSource
 *
 * Constructs a new dictionary which allows object to be used as keys.
 */
export interface mxDictionary {
  (): void;
  /**
   * Clears the dictionary.
   */
  clear(): void;
  /**
   * Returns the value for the given key.
   */
  get(key: any): any;
  /**
   * Stores the value under the given key and returns the previous
   * value for that key.
   */
  put(key: any, value: any): any;
  /**
   * Removes the value for the given key and returns the value that
   * has been removed.
   */
  remove(key: any): any;
  /**
   * Returns all keys as an array.
   */
  getKeys(): any[];
  /**
   * Returns all values as an array.
   */
  getValues(): any[];
  /**
   * Visits all entries in the dictionary using the given function with the
   * following signature: function(key, value) where key is a string and
   * value is an object.
   *
   * Parameters:
   *
   * visitor - A function that takes the key and value as arguments.
   */
  visit(visitor: any): void;
}

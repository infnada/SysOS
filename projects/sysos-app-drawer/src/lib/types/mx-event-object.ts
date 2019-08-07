/**
 * The mxEventObject is a wrapper for all properties of a single event.
 * Additionally, it also offers functions to consume the event and check if it
 * was consumed as follows:
 *
 * @example
 * evt.consume();
 * INV: evt.isConsumed() == true
 */
export interface mxEventObject {
  /**
   * Holds the name.
   */
  name: string;
  /**
   * Holds the properties as an associative array.
   */
  properties: any;
  /**
   * Holds the consumed state. Default is false.
   */
  consumed: boolean;
  /**
   * Constructs a new event object with the specified name. An optional
   * sequence of key, value pairs can be appended to define properties.
   *
   * @example
   * new mxEventObject("eventName", key1, val1, .., keyN, valN)
   */
  constructor(name?: any, ...args: any[]);
  /**
   * Returns <name>.
   */
  getName(): string;
  /**
   * Returns <properties>.
   */
  getProperties(): any;
  /**
   * Returns the property for the given key.
   */
  getProperty(key: any): any;
  /**
   * Returns true if the event has been consumed.
   */
  isConsumed(): boolean;
  /**
   * Consumes the event.
   */
  consume(): void;
}

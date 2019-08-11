/**
 * Base class for objects that dispatch named events. To create a subclass that
 * inherits from mxEventSource, the following code is used.
 *
 * (code)
 * function MyClass() { };
 *
 * MyClass.prototype = new mxEventSource();
 * MyClass.prototype.constructor = MyClass;
 * (end)
 *
 * Known Subclasses:
 *
 * <mxGraphModel>, <mxGraph>, <mxGraphView>, <mxEditor>, <mxCellOverlay>,
 * <mxToolbar>, <mxWindow>
 */
import {mxEventObject} from './mx-event-object';

export interface mxEventSource {
  /**
   * Holds the event names and associated listeners in an array. The array
   * contains the event name followed by the respective listener for each
   * registered listener.
   */
  eventListeners: any;
  /**
   * Specifies if events can be fired. Default is true.
   */
  eventsEnabled: boolean;
  /**
   * Optional source for events. Default is null.
   */
  eventSource: any;
  /**
   * Constructs a new event source.
   */
  (eventSource?: any): void;
  /**
   * Returns <eventsEnabled>.
   */
  isEventsEnabled(): boolean;
  /**
   * Sets <eventsEnabled>.
   */
  setEventsEnabled(value: any): void;
  /**
   * Returns <eventSource>.
   */
  getEventSource(): any;
  /**
   * Sets <eventSource>.
   */
  setEventSource(value: any): void;
  /**
   * Binds the specified function to the given event name. If no event name
   * is given, then the listener is registered for all events.
   *
   * The parameters of the listener are the sender and an <mxEventObject>.
   */
  addListener(name: any, funct: any): void;
  /**
   * Removes all occurrences of the given listener from <eventListeners>.
   */
  removeListener(funct: any): void;
  /**
   * Dispatches the given event to the listeners which are registered for
   * the event. The sender argument is optional. The current execution scope
   * ('this') is used for the listener invocation (see <mxUtils.bind>).
   *
   * Example:
   *
   * (code)
   * fireEvent(new mxEventObject('eventName', key1, val1, .., keyN, valN))
   * (end)
   *
   * Parameters:
   *
   * evt - <mxEventObject> that represents the event.
   * sender - Optional sender to be passed to the listener. Default value is
   * the return value of <getEventSource>.
   */
  fireEvent(evt: mxEventObject, sender?: mxEventSource): void;
}

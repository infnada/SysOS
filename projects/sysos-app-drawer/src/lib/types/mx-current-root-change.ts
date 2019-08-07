/**
 * Action to change the current root in a view.
 *
 * Constructor: mxCurrentRootChange
 *
 * Constructs a change of the current root in the given view.
 */
export interface mxCurrentRootChange {
  constructor(view: any, root: any);
  /**
   * Changes the current root of the view.
   */
  execute(): void;
}

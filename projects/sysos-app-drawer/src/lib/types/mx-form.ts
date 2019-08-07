/**
 * A simple class for creating HTML forms.
 *
 * Constructor: mxForm
 *
 * Creates a HTML table using the specified classname.
 */
export interface mxForm {
  constructor(className: any);
  /**
   * Returns the table that contains this form.
   */
  getTable(): any;
  /**
   * Helper method to add an OK and Cancel button using the respective
   * functions.
   */
  addButtons(okFunct: any, cancelFunct: any): void;
  /**
   * Adds an input for the given name, type and value and returns it.
   */
  addText(name: any, value: any, type: any): any;
  /**
   * Adds a checkbox for the given name and value and returns the textfield.
   */
  addCheckbox(name: any, value: any): HTMLInputElement;
  /**
   * Adds a textarea for the given name and value and returns the textarea.
   */
  addTextarea(name: any, value: any, rows: any): any;
  /**
   * Adds a combo for the given name and returns the combo.
   */
  addCombo(name: any, isMultiSelect: any, size: any): any;
  /**
   * Adds an option for the given label to the specified combo.
   */
  addOption(combo: any, label: any, value: any, isSelected: any): void;
  /**
   * Adds a new row with the name and the input field in two columns and
   * returns the given input.
   */
  addField(name: any, input: any): any;
}

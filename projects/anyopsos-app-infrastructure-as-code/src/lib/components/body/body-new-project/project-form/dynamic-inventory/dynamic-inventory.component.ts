import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {Category} from '../../../../../types/category';
import {Inventory} from '../../../../../types/inventory';

@Component({
  selector: 'saiac-dynamic-inventory',
  templateUrl: './dynamic-inventory.component.html',
  styleUrls: ['./dynamic-inventory.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicInventoryComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicInventoryComponent),
      multi: true,
    }
  ]
})
export class DynamicInventoryComponent implements OnInit {
  @Input() categories: Category[];

  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      inventories: this.formBuilder.array([this.newInventory()]),
    });
    this.form.valueChanges.subscribe(v => {
      this.propagateChange(v);
    });
  }

  validate(_: FormControl): {[key: string]: object} {
    return this.form.valid ? null : {labelValid: {value: this.form.errors}};
  }

  get inventories(): FormArray {
    return this.form.get('inventories') as FormArray;
  }

  inventoryValues(inventoryIndex: number): FormArray {
    return this.inventories.at(inventoryIndex).get('of') as FormArray;
  }

  isCategoryAlreadyInInventory(currentInventoryIndex: number, categoryName: string, categoryValue?: string): boolean {
    return this.inventories.controls.filter((inventory, i) => {

      // Do not match against currentInventoryIndex, otherwise we will not be able to deselect an option
      if (currentInventoryIndex === i) return false;

      if (inventory.get('type').value === 'for') {
        return inventory.get('of').value.find(of => {

          // Disabled when categoryName and categoryValue matches
          // Case used in 'for'
          if (categoryValue) return of.name === categoryName && of.value === categoryValue;

          // Disabled when categoryName matches
          // Case used in 'forEach'
          return of.name === categoryName;
        });
      }

      if (inventory.get('type').value === 'forEach') {
        return inventory.get('of').value.find(of => {
          return of.name === categoryName;
        });
      }

      if (inventory.get('type').value === 'forEachBut') {
        return inventory.get('of').value.find(of => {

          // Disabled when categoryName and categoryValue matches
          // Case used in 'for'
          if (categoryValue) {

            // If categoryName matches
            if (of.name === categoryName) {

              // Disable only if categoryValue is not selected at 'but'
              return of.name === categoryName && inventory.get('but').value.find(but => but.name === categoryName && but.value === categoryValue) === undefined;
            }

            return false;
          }

          // Disabled when categoryName matches
          // Case used in 'forEach'
          return of.name === categoryName;
        });
      }

    }).length !== 0;
  }

  /**
   * Adds row to Inventory list.
   */
  private newInventory(): FormGroup {
    return this.formBuilder.group({
      type: [''],
      of: [[]],
      but: [[]]
    });
  }

  /**
   * Adds inventory if last category key and value has been filled.
   */
  private addInventoryIfNeeded(): void {
    const last = this.inventories.at(this.inventories.length - 1);
    if (this.isInventoryFilled(last) && last.valid) {
      this.inventories.push(this.newInventory());
    }
  }

  /**
   * Returns true if inventory type and values are not empty, false otherwise.
   */
  private isInventoryFilled(inventory: AbstractControl): boolean {
    return inventory.get('type').value.length !== 0 && inventory.get('of').value.length !== 0;
  }

  /**
   * Calls checks on label:
   *  - adds label if last empty label has been filled
   */
  check(): void {
    this.addInventoryIfNeeded();
  }

  /**
   * Returns true when label is editable and is not last on the list.
   * Used to indicate whether delete icon should be shown near label.
   */
  isRemovable(index: number): boolean {
    const lastElement = this.inventories.at(this.inventories.length - 1);
    const currentElement = this.inventories.at(index);

    const currentkey = currentElement.get('type').value;
    const currentValue = currentElement.get('of').value;
    const currentEditable = true; // currentElement.get('editable').value;
    const lastKey = lastElement.get('type').value;
    const lastValue = lastElement.get('of').value;

    return !!(currentEditable && currentkey !== lastKey && currentValue !== lastValue);
  }

  /**
   * Deletes row from labels list.
   */
  remove(index: number): void {
    this.inventories.removeAt(index);
  }

  propagateChange = (_: {inventories: Inventory[]}) => {};

  writeValue(): void {}

  registerOnChange(fn: (_: {inventories: Inventory[]}) => void): void {
    this.propagateChange = fn;
  }
  registerOnTouched(): void {}
}

import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {Category} from '../../../../../types/category';

@Component({
  selector: 'saiac-dynamic-categories',
  templateUrl: './dynamic-categories.component.html',
  styleUrls: ['./dynamic-categories.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicCategoriesComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicCategoriesComponent),
      multi: true,
    }
  ]
})
export class DynamicCategoriesComponent implements OnInit {
  form: FormGroup;

  namePattern: RegExp = new RegExp('^[A-Za-z]*$');

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      categories: this.formBuilder.array([this.newCategory()]),
    });
    this.form.valueChanges.subscribe(v => {
      this.propagateChange(v);
    });
  }

  validate(_: FormControl): {[key: string]: object} {
    return this.form.valid ? null : {labelValid: {value: this.form.errors}};
  }

  get categories(): FormArray {
    return this.form.get('categories') as FormArray;
  }

  categoryValues(categoryIndex: number): FormArray {
    return this.categories.at(categoryIndex).get('values') as FormArray;
  }

  /**
   * Adds row to Category list.
   */
  private newCategory(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.pattern(this.namePattern),
        Validators.maxLength(253)
      ])],
      values: this.formBuilder.array([this.newValue()]),
    });
  }

  /**
   * Adds values to Category
   */
  private newValue(): FormGroup {
    return this.formBuilder.group({
      value: ['', Validators.compose([
        Validators.pattern(this.namePattern),
        Validators.maxLength(253)
      ])],
    });
  }

  /**
   * Validates name within category form.
   * Current checks:
   *  - duplicated key
   */
  private validateKey(categoryIndex: number): void {
    const elem = this.categories.at(categoryIndex).get('name');

    const isUnique = !this.isKeyDuplicated(categoryIndex);

    elem.setErrors(isUnique ? null : {unique: true});
    this.form.updateValueAndValidity();
  }

  /**
   * Returns true if there are 2 or more labels with the same key on the labelList,
   * false otherwise.
   */
  private isKeyDuplicated(index: number): boolean {
    let duplications: number = 0;

    const currentName = this.categories.at(index).get('name').value;
    for (let i = 0; i < this.categories.length; i++) {
      const name = this.categories.at(i).get('name').value;
      if (name.length !== 0 && name === currentName) {
        duplications++;
      }
      if (duplications > 1) {
        return true;
      }
    }

    return false;
  }

  /**
   * Adds category if last category key and value has been filled.
   */
  private addCategoryIfNeeded(): void {
    const last = this.categories.at(this.categories.length - 1);
    if (this.isCategoryFilled(last) && last.valid) {
      this.categories.push(this.newCategory());
    }
  }

  /**
   * Adds category value if last category value has been filled.
   */
  private addCategoryValueIfNeeded(categoryIndex: number): void {
    const lastValue = this.categoryValues(categoryIndex).at(this.categoryValues(categoryIndex).length - 1);
    if (this.isCategoryValueFilled(lastValue) && lastValue.valid) {
      this.categoryValues(categoryIndex).push(this.newValue());
    }
  }

  /**
   * Returns true if category name and values are not empty, false otherwise.
   */
  private isCategoryFilled(category: AbstractControl): boolean {
    return category.get('name').value.length !== 0 && category.get('values').value.length !== 0 && category.get('values').value[0].value.length !== 0;
  }

  /**
   * Returns true if last value is not empty, false otherwise.
   */
  private isCategoryValueFilled(categoryValue: AbstractControl): boolean {
    return categoryValue.get('value').value.length !== 0;
  }

  /**
   * Calls checks on label:
   *  - adds label if last empty label has been filled
   *  - checks for duplicated key and sets validity of element
   */
  check(categoryIndex: number, valueIndex?: number): void {
    this.addCategoryIfNeeded();
    this.addCategoryValueIfNeeded(categoryIndex);
    this.validateKey(categoryIndex);
  }

  /**
   * Returns true when label is editable and is not last on the list.
   * Used to indicate whether delete icon should be shown near label.
   */
  isRemovable(index: number): boolean {
    const lastElement = this.categories.at(this.categories.length - 1);
    const currentElement = this.categories.at(index);

    const currentkey = currentElement.get('name').value;
    const currentValue = currentElement.get('values').value;
    const currentEditable = true; // currentElement.get('editable').value;
    const lastKey = lastElement.get('name').value;
    const lastValue = lastElement.get('values').value;

    return !!(currentEditable && currentkey !== lastKey && currentValue !== lastValue);
  }

  /**
   * Deletes row from labels list.
   */
  remove(index: number): void {
    this.categories.removeAt(index);
  }

  propagateChange = (_: {categories: Category[]}) => {};

  writeValue(): void {}

  registerOnChange(fn: (_: {categories: Category[]}) => void): void {
    this.propagateChange = fn;
  }
  registerOnTouched(): void {}
}

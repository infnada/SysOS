import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'smimkcr-create-from-input',
  templateUrl: './create-from-input.component.html',
  styleUrls: ['./create-from-input.component.scss']
})
export class CreateFromInputComponent implements OnInit {
  @Input() inputData: string;
  @Output() inputDataChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  inputDataChanged() {
    this.inputDataChange.emit(this.inputData);
  }
}

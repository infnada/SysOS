import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amkubernetes-create-resource-create-from-input',
  templateUrl: './create-from-input.component.html',
  styleUrls: ['./create-from-input.component.scss']
})
export class CreateFromInputComponent implements OnInit {
  @Input() inputData: string;
  @Output() private readonly inputDataChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  inputDataChanged(): void {
    this.inputDataChange.emit(this.inputData);
  }

}

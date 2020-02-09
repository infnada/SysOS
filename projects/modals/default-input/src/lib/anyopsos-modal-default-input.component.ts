import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'aminput-anyopsos-modal-default-input',
  templateUrl: './anyopsos-modal-default-input.component.html',
  styleUrls: ['./anyopsos-modal-default-input.component.scss']
})
export class AnyOpsOSModalDefaultInputComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  title: string;
  text: string;
  buttonText: string;
  inputPlaceholder: string;
  inputValue: string;
  inputType: string = 'text';
  inputMaxLength: number = 255;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalDefaultInputComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.text = data.text;
    this.buttonText = data.buttonText;
    this.inputPlaceholder = data.inputPlaceholder;
    this.inputValue = data.inputValue;
    if (data.inputType) this.inputType = data.inputType;
    if (data.inputMaxLength) this.inputMaxLength = data.inputMaxLength;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title;
    this.modalBody.type = this.data.type;
  }

}

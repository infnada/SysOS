import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'amquestion-anyopsos-modal-default-question',
  templateUrl: './anyopsos-modal-default-question.component.html',
  styleUrls: ['./anyopsos-modal-default-question.component.scss']
})
export class AnyOpsOSModalDefaultQuestionComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  text: string;

  // To show some kind of alert box
  boxIcon: string = 'info';
  boxClass: string;
  boxContent: string;

  // Buttons
  yes: string = 'Yes';
  yesClass: string = 'primary';
  no: string = 'No';

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalDefaultQuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.text = data.text;
    if (data.boxIcon) this.boxIcon = data.boxIcon;
    if (data.boxClass) this.boxClass = data.boxClass;
    if (data.boxContent) this.boxContent = data.boxContent;
    if (data.yes) this.yes = data.yes;
    if (data.yesClass) this.yesClass = data.yesClass;
    if (data.no) this.no = data.no;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title;
    this.modalBody.type = this.data.type;
  }

}

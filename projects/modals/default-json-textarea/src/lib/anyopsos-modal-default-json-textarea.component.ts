import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'amjsontextarea-anyopsos-modal-default-json-textarea',
  templateUrl: './anyopsos-modal-default-json-textarea.component.html',
  styleUrls: ['./anyopsos-modal-default-json-textarea.component.scss']
})
export class AnyOpsOSModalDefaultJsonTextareaComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  jsonData: string;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalDefaultJsonTextareaComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.jsonData = data.jsonData;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title;
    this.modalBody.type = this.data.type;
  }

}

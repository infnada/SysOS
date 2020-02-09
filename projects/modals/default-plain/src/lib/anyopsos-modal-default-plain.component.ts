import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'amplain-anyopsos-modal-default-plain',
  templateUrl: './anyopsos-modal-default-plain.component.html',
  styleUrls: ['./anyopsos-modal-default-plain.component.scss']
})
export class AnyOpsOSModalDefaultPlainComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  text: string;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalDefaultPlainComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.text = data.text;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title;
    this.modalBody.type = this.data.type;
  }

}

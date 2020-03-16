import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'amkubernetes-create-resource-anyopsos-modal-kubernetes-create-resource',
  templateUrl: './anyopsos-modal-kubernetes-create-resource.component.html',
  styleUrls: ['./anyopsos-modal-kubernetes-create-resource.component.scss']
})
export class AnyOpsOSModalKubernetesCreateResourceComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  inputData: string;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalKubernetesCreateResourceComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.inputData = data.inputData;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title ?? 'Create a resource';
    this.modalBody.type = this.data.type;
  }

  isCreateDisabled(): boolean {
    return !this.inputData || this.inputData.length === 0;
  }

  inputDataChanged($event) {
    console.log($event);
    console.log(this.inputData);
  }

}

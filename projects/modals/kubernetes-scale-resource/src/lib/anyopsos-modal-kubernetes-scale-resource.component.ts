import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'amkubernetes-scale-resource-anyopsos-modal-kubernetes-scale-resource',
  templateUrl: './anyopsos-modal-kubernetes-scale-resource.component.html',
  styleUrls: ['./anyopsos-modal-kubernetes-scale-resource.component.scss']
})
export class AnyOpsOSModalKubernetesScaleResourceComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  object: DataObject;

  actual = 0;
  desired = 0;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalKubernetesScaleResourceComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.object = data.object;
    this.actual = this.object.info.data.status.readyReplicas ?? this.object.info.data.status.availableReplicas ?? 0;
    this.desired = this.object.info.data.spec.replicas;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title ?? 'Scale a Resource';
    this.modalBody.type = this.data.type;
  }

  noticeContent(): string {
    return `<span>This action is equivalent to: </span>
      <code>kubectl scale ${this.object.info.data.metadata.namespace ? `-n ${this.object.info.data.metadata.namespace}` : ''} ${this.object.type} ${this.object.name} --replicas=${this.desired}</code>`;
  }

}

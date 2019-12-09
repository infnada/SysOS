import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ImDataObject} from '@anyopsos/app-infrastructure-manager';

@Component({
  selector: 'smimksr-anyopsos-modal-infrastructure-manager-kubernetes-scale-resource',
  templateUrl: './anyopsos-modal-infrastructure-manager-kubernetes-scale-resource.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-kubernetes-scale-resource.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent implements OnInit {
  @Input() object: ImDataObject;

  actual = 0;
  desired = 0;

  constructor(public activeModal: NgbActiveModal) {
    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {

      this.actual = this.object.info.data.status.readyReplicas | this.object.info.data.status.availableReplicas | 0;
      this.desired = this.object.info.data.spec.replicas;

    }, 0);
  }

  ngOnInit(): void {
  }

  noticeContent(): string {
    return `<span>This action is equivalent to: </span>
      <code>kubectl scale ${this.object.info.data.metadata.namespace ? `-n ${this.object.info.data.metadata.namespace}` : ''} ${this.object.type} ${this.object.name} --replicas=${this.desired}</code>`;
  }

}

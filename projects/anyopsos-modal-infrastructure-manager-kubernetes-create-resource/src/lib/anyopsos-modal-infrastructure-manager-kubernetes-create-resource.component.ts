import {Component, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimkcr-anyopsos-modal-infrastructure-manager-kubernetes-create-resource',
  templateUrl: './anyopsos-modal-infrastructure-manager-kubernetes-create-resource.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-kubernetes-create-resource.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent implements OnInit {
  inputData: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  isCreateDisabled(): boolean {
    return !this.inputData || this.inputData.length === 0;
  }

  inputDataChanged($event) {
    console.log($event);
    console.log(this.inputData);
  }

}

import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimdot-anyopsos-modal-infrastructure-manager-deploy-ovf-template',
  templateUrl: './anyopsos-modal-infrastructure-manager-deploy-ovf-template.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-deploy-ovf-template.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

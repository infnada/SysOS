import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimdot-sysos-modal-infrastructure-manager-deploy-ovf-template',
  templateUrl: './sysos-modal-infrastructure-manager-deploy-ovf-template.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-deploy-ovf-template.component.scss']
})
export class SysosModalInfrastructureManagerDeployOvfTemplateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimjt-anyopsos-modal-infrastructure-manager-json-textarea',
  templateUrl: './anyopsos-modal-infrastructure-manager-json-textarea.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-json-textarea.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerJsonTextareaComponent implements OnInit {
  @Input() title: string;
  @Input() data: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}

import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smpl-anyopsos-modal-default-plain',
  templateUrl: './anyopsos-modal-default-plain.component.html',
  styleUrls: ['./anyopsos-modal-default-plain.component.scss']
})
export class AnyOpsOSModalDefaultPlainComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() type: boolean = null;

  constructor(public activeModal: NgbActiveModal) {
  }

}

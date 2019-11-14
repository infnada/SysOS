import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smpl-anyopsos-modal-plain',
  templateUrl: './anyopsos-modal-plain.component.html',
  styleUrls: ['./anyopsos-modal-plain.component.scss']
})
export class AnyOpsOSModalPlainComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() type: boolean = null;

  constructor(public activeModal: NgbActiveModal) {
  }

}

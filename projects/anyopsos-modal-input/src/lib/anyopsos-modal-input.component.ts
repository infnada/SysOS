import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smin-anyopsos-modal-input',
  templateUrl: './anyopsos-modal-input.component.html',
  styleUrls: ['./anyopsos-modal-input.component.scss']
})
export class AnyOpsOSModalInputComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() buttonText: string;
  @Input() inputValue: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}

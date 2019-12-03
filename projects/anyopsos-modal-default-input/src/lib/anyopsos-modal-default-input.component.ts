import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smin-anyopsos-modal-default-input',
  templateUrl: './anyopsos-modal-default-input.component.html',
  styleUrls: ['./anyopsos-modal-default-input.component.scss']
})
export class AnyOpsOSModalDefaultInputComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() buttonText: string;
  @Input() inputPlaceholder: string;
  @Input() inputValue: string;
  @Input() inputType: string = 'text';
  @Input() inputMaxLength: number = 255;

  constructor(public activeModal: NgbActiveModal) {
  }

}

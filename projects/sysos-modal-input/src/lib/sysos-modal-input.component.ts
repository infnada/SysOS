import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smin-sysos-modal-input',
  templateUrl: './sysos-modal-input.component.html',
  styleUrls: ['./sysos-modal-input.component.scss']
})
export class SysosModalInputComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() buttonText: string;
  @Input() inputValue: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}

import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smqu-anyopsos-modal-default-question',
  templateUrl: './anyopsos-modal-default-question.component.html',
  styleUrls: ['./anyopsos-modal-default-question.component.scss']
})
export class AnyOpsOSModalDefaultQuestionComponent {
  @Input() title: string;
  @Input() text: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}

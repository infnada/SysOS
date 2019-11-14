import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smqu-anyopsos-modal-question',
  templateUrl: './anyopsos-modal-question.component.html',
  styleUrls: ['./anyopsos-modal-question.component.scss']
})
export class AnyOpsOSModalQuestionComponent {
  @Input() title: string;
  @Input() text: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}

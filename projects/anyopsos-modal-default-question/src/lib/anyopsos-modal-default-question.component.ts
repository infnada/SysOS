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

  // To show some kind of alert box
  @Input() boxIcon: string = 'info';
  @Input() boxContent: string;
  @Input() boxClass: string;

  // Buttons
  @Input() yes: string = 'Yes';
  @Input() yesClass: string = 'primary';
  @Input() no: string = 'No';

  constructor(public activeModal: NgbActiveModal) {
  }

}

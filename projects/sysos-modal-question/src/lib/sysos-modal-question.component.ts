import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smqu-sysos-modal-question',
  templateUrl: './sysos-modal-question.component.html',
  styleUrls: ['./sysos-modal-question.component.scss']
})
export class SysosModalQuestionComponent {
  @Input() title: string;
  @Input() text: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}

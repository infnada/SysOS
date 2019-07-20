import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smpl-sysos-modal-plain',
  templateUrl: './sysos-modal-plain.component.html',
  styleUrls: ['./sysos-modal-plain.component.scss']
})
export class SysosModalPlainComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() type: boolean = null;

  constructor(public activeModal: NgbActiveModal) {
  }

}

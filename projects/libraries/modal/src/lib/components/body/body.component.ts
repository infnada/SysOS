import {Component, Input} from '@angular/core';

import {MatDialogRef} from '@anyopsos/lib-angular-material';

@Component({
  selector: 'almodal-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() dialogRef: MatDialogRef<any>;
  @Input() type: string;
  @Input() title: string;

  constructor() { }

}

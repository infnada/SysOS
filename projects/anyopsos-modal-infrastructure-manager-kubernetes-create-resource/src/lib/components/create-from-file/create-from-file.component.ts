import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'smimkcr-create-from-file',
  templateUrl: './create-from-file.component.html',
  styleUrls: ['./create-from-file.component.scss']
})
export class CreateFromFileComponent implements OnInit {

  newObjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newObjectForm = this.formBuilder.group({
      objectFile: [null, [Validators.required]]
    });
  }

}

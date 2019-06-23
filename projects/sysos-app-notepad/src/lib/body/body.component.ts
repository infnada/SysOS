import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'san-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  editorOptions = {
    automaticLayout: true,
    theme: 'vs-dark',
    language: 'typescript'
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notepad-body',
  templateUrl: './notepad-body.component.html',
  styleUrls: ['./notepad-body.component.scss']
})
export class NotepadBodyComponent implements OnInit {

  editorOptions = {
    automaticLayout: true,
    theme: 'vs-dark',
    language: 'typescript'
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() { }

  ngOnInit() {
  }

}

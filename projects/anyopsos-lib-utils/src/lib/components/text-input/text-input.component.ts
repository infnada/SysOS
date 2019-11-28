import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'slu-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() text: string;
  @Input() readOnly = false;
  @Input() mode = 'yaml';
  @Input() prettify = true;

  editorOptions = {};

  constructor() {
  }

  ngOnInit(): void {
    this.editorOptions = {
      automaticLayout: true,
      theme: 'vs',
      language: this.mode,
      readOnly: this.readOnly,
      fontSize: 14,
      fontFamily: `'Roboto Mono Regular', monospace`
    };

    if (this.prettify) {
      this.prettify_();
    }
  }

  onChange() {
    this.onTextChange(this.text);
  }

  private onTextChange(text: string): void {
    this.textChange.emit(text);
  }

  private isJson(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  private prettify_(): void {
    switch (this.mode) {
      case 'json':
        this.text = this.isJson(this.text) ? JSON.stringify(JSON.parse(this.text), undefined, '\t') : this.text;
        break;
      default:
        // Do nothing when mode is not recognized.
        break;
    }
    this.onTextChange(this.text);
  }
}

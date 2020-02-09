import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeStyle'
})
export class SanitizeStylePipe implements PipeTransform {

  constructor(private readonly sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}

import {Directive, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[capsLock]'
})
export class CapsLockDirective {
  @Output('capsLock') capsLock = new EventEmitter<boolean>();

  constructor() {
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }

}

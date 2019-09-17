import {Directive, Input, EventEmitter, Output, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[slssScrollSpy]'
})
export class ScrollSpyDirective {

  @Input() public spiedTags = [];
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    let currentSection: string;
    const byTag = this.el.nativeElement.querySelectorAll(this.spiedTags.join());
    const scrollTop = event.target.scrollTop;
    const parentOffset = event.target.offsetTop;
    for (const tag of byTag) {
      const element = tag;
      if ((element.offsetTop - parentOffset) <= scrollTop) {
        currentSection = element.id;
      }
    }
    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }

}

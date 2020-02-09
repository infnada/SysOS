import {Directive, Input, EventEmitter, Output, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[alsspyScrollSpy]'
})
export class ScrollSpyDirective {

  @Input() private spiedTags = [];
  @Output() sectionChange = new EventEmitter<string>();
  private currentSection: string;

  constructor(private readonly el: ElementRef) {
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    let currentSection: string;

    const byTag: HTMLElement[] = this.el.nativeElement.querySelectorAll(this.spiedTags.join());
    const scrollTop: number = event.target.scrollTop;
    const parentOffset: number = event.target.offsetTop;

    for (const tag of byTag) {
      const element: HTMLElement = tag;
      if ((element.offsetTop - parentOffset) <= scrollTop) currentSection = element.id;

    }

    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }

}

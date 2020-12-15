import {Directive, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSearchUX]'
})
export class SearchUXDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

}

import {Directive, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';
import { document } from 'ngx-bootstrap/utils/facade/browser';

@Directive({
  selector: '[appSearchUX]'
})
export class SearchUXDirective {


  //lifts search bar up, upon clicking the search button
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }



 @HostListener('click') onClick() {
  this.renderer.setElementStyle(this.elementRef.nativeElement.parentElement,'margin-bottom','7%');
 }
}
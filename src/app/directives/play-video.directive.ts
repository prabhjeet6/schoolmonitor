import { Input,Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';


@Directive({
  selector: '[appPlayVideo]'
})
export class PlayVideoDirective {
  
  @Input() clickedVideo: string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick() {
    this.renderer.removeChild(
        this.elementRef.nativeElement.
        parentElement.parentElement.
        parentElement.parentElement.
        parentElement, this.elementRef.nativeElement.
        parentElement.parentElement.
        parentElement.parentElement.parentElement.children[4]);
    
    var videoPlayerElement=document.createElement('div');
    videoPlayerElement.innerHTML = '<iframe width="420" height="315" src='+this.clickedVideo+'></iframe>';

    this.renderer.insertBefore(this.elementRef.nativeElement.
      parentElement.parentElement.
      parentElement.parentElement.
      parentElement,videoPlayerElement,
      this.elementRef.nativeElement.
      parentElement.parentElement.
      parentElement.parentElement.
      parentElement.children[4]);

      videoPlayerElement.click();


  }
}

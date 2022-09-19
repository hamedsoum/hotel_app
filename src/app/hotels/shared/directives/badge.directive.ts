import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBadge]'
})
export class BadgeDirective {

  @Input('appBadge') appBadge! : string;

  constructor(el : ElementRef, renderer : Renderer2) {
    renderer.addClass(el.nativeElement, 'new_badge');
    renderer.addClass(el.nativeElement, 'mx-1');
    
  }

}

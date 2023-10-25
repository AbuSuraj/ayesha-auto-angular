import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip2]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';

  private tooltip: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.tooltip) {
      this.tooltip = this.renderer.createElement('div') as HTMLElement;
      this.renderer.addClass(this.tooltip, 'tooltip');
      this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipText));
      this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    }
  }

  private hideTooltip() {
    if (this.tooltip) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltip);
      this.tooltip = null;
    }
  }
}

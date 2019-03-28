import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScoreHeighlight]'
})
export class ScoreHeighlightDirective implements OnInit {

  @Input('appScoreHeighlight') score: number;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    // console.log(this.score);
    if (this.score < 10) {
      this.renderer.addClass(this.el.nativeElement, 'offer-danger');
    } else if (this.score < 30) {
      this.renderer.addClass(this.el.nativeElement, 'offer-warning');
    } else if (this.score < 50) {
      this.renderer.addClass(this.el.nativeElement, 'offer-primary');
    } else if (this.score < 80) {
      this.renderer.addClass(this.el.nativeElement, 'offer-info');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'offer-success');
    }

  }




}

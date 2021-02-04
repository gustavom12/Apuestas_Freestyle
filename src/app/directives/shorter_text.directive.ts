import { Directive,ElementRef,OnInit,Input } from '@angular/core';

@Directive({
  selector: '[ShorterText]'
})
export class ShorterDirective implements OnInit{

  constructor(
    public el:ElementRef,
  ) { }

    $el:HTMLElement = this.el.nativeElement
  //replace
  @Input('ShorterText') text: any;
  @Input('replace') replace:string;
  ngOnInit(){

  }
}

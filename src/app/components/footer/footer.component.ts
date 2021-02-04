import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scrollToElement(el){
    const $el = document.querySelector(el)
    $el.scrollIntoView({block: "end", behavior: "smooth"})
  }
  focusElement(el){
    const $el = document.querySelector(el)
    $el.focus()
    console.log($el)
  }
}

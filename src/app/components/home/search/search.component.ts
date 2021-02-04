import { Router } from '@angular/router';
import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  error;
  @Output()Reload = new EventEmitter
  @Input("search")search = "";
  constructor(private router:Router) { }

  @HostListener("document:keypress", ['$event'])
    OnEnter(e){
      if(e.key === "Enter"){
        this.Search()
      }
    }
  ngOnInit(): void {

  }
  Search(){
    this.router.navigateByUrl(`/search/${this.search}`)
    this.Reload.emit(this.search)
  }

}

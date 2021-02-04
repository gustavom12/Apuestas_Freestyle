import { HttpService } from '@services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass']
})
export class SearchPageComponent implements OnInit {

  constructor(private router: Router, private _http: HttpService) { }
  search = ""
  apuestas = []
  ngOnInit(): void {
    this.searchApuestas("")
  }
  searchApuestas (e){
    setTimeout(()=>{
      this.search = this.router.url.replace("/search/", "")
      this.apuestas = []
      console.log(e)
      this._http.get(`/search/${this.search}`)
      .subscribe((res:any)=>{
        console.log("dds")
        this.apuestas = res.apuestas
      })
    },500)
  }
  trackByMethod(index:number, el:any): number {
    return index;
  }

}

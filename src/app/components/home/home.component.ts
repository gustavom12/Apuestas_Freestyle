import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './../../services/http.service';
import {Subscription} from "rxjs"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public _http: HttpService) { }
  apuestas;
  subscription: Subscription = new Subscription();
  ngOnInit(){
    this._http.get("/apuestas").subscribe((data:any)=>this.apuestas = data)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  trackByMethod(index:number, el:any): number {
    return index;
  }
}

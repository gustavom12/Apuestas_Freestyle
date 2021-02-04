import { HttpService } from './../../../services/http.service';
import { Freestyler } from './../../../interfaces/main-interfaces';
import { Subscription } from 'rxjs';
import { Apuesta } from '@interfaces/main-interfaces';
import { Component, OnInit, Input, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements AfterViewInit{
  @Input("apuesta")Apuesta: Apuesta ;
  @Input("apostado")Apostado
  @ViewChild("leftAvatar")leftAvatar
  @ViewChild("rightAvatar")rightAvatar
  @ViewChild("apuestaContainer")apuestaContainer
  rightFreestylerApostado = false
  leftFreestylerApostado = false
  Subscription = new Subscription()
  leftFreestyler : Freestyler;
  rightFreestyler:Freestyler;
  FreestylerApostadoId;

  constructor(private _http: HttpService) { }

  ngAfterViewInit(): void {
    this.FreestylerApostadoId = this.Apostado.freestylerApostado
    console.log(this.Apostado)
    this.leftFreestyler = this.Apuesta.leftFreestyler
    this.rightFreestyler = this.Apuesta.rightFreestyler
    const $leftAvatar:HTMLDivElement = this.leftAvatar.nativeElement
    const $rightAvatar:HTMLDivElement = this.rightAvatar.nativeElement
    $leftAvatar.style.backgroundImage  = `url(${this.leftFreestyler.imgUrl})`
    $rightAvatar.style.backgroundImage  = `url(${this.rightFreestyler.imgUrl})`
    this.setPercentOfPoints(this.Apuesta.leftPoints,this.Apuesta.rightPoints)
    if(this.FreestylerApostadoId === this.Apuesta.leftFreestyler._id){
      this.leftFreestylerApostado = true
      }else{
      this.rightFreestylerApostado = true
    }
  }
  setPercentOfPoints(leftPoints = 50,RightPoints = 50){
    if(!leftPoints){leftPoints = 1}
    if(!RightPoints){RightPoints = 1}
    //First, search max width of the container and search html elements
    const container = this.apuestaContainer.nativeElement,
      $Points       = container.querySelector("#Points"),
      $width        = window.getComputedStyle(container).width,
      $leftPoints   = container.querySelector("#leftPoints"),
      $rightPoints  = container.querySelector("#rightPoints"),
      width =  Number($width.replace("px","")) / 2,
      totalPoints = leftPoints + RightPoints
    let leftWidth = leftPoints / totalPoints * width,
      rightWidth = RightPoints / totalPoints * width,
      leftPercent = leftPoints / totalPoints * 100,
      rightPercent = RightPoints / totalPoints * 100
    $leftPoints.style.width = `${leftWidth}px`
    $rightPoints.style.width = `${rightWidth}px`
    $leftPoints.innerHTML = `${Math.round(leftPercent) }%`
    $rightPoints.innerHTML = `${Math.round(rightPercent)}%`
  }
}

import { Subscription } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Input, Component, OnInit, ViewChild, HostListener, ɵbypassSanitizationTrustStyle, AfterViewInit } from '@angular/core';
import {Apuesta, Freestyler} from "@interfaces/main-interfaces";
import { LoginAuthService } from './../../services/login-auth.service';
@Component({
  selector: 'app-apuestas',
  templateUrl: './apuestas.component.html',
  styleUrls: ['./apuestas.component.sass']
})
export class ApuestasComponent implements AfterViewInit {
  @ViewChild("leftAvatar")leftAvatar
  @ViewChild("rightAvatar")rightAvatar
  @ViewChild("apuestaContainer")apuestaContainer
  @ViewChild("Points")Points
  @ViewChild("apostarDiv")ApostarDiv
  @ViewChild("apostarButton")apostarButton
  @ViewChild("toggleApuestaB")toggleApuestaB
  @Input("apuesta")Apuesta:Apuesta ;
  Subscription = new Subscription()
  leftFreestyler: Freestyler;
  rightFreestyler:Freestyler;
  points;
  logged;
  notLoggedError;
  inputValue = 0;
  apostarPor;
  puntosAGanarDiv;
  puntosApostados;
  puntosAGanar;
  leftPercent;
  rightPercent;
  User;
  FreestylerApostado:Freestyler;

  constructor(private _http: HttpService,private _loginAuth: LoginAuthService) {

  }

  public ngAfterViewInit(): void {

    const $leftAvatar:HTMLDivElement = this.leftAvatar.nativeElement
    const $rightAvatar:HTMLDivElement = this.rightAvatar.nativeElement
    $leftAvatar.style.backgroundImage  = `url(${this.Apuesta.leftFreestyler.imgUrl})`
    $rightAvatar.style.backgroundImage  = `url(${this.Apuesta.rightFreestyler.imgUrl})`
    //Set percent, for example: left has 7 points voted, and rigth 3, percent will be 70% and 30%
    this.setPercentOfPoints(this.Apuesta.leftPoints,this.Apuesta.rightPoints)
    this.Subscription.add(
      //Verify if user is already logged
      this._loginAuth.IsLogged().subscribe((user:any)=>{
        this.User = user.user
        user.user.points ? this.points = user.user.points : this.points = 0
        this.logged = true
      },err=>{
        this.logged = false
      })
    )
  }
  //Set percent, for example: left has 7 points voted, and rigth 3, percent will be 70% and 30%
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
    //set global variable to use then
    this.leftPercent =Math.round(leftPercent)
    this.rightPercent = Math.round(rightPercent)
  }
  //toggle Apuesta Div, if user is not logged, div will not appear
  toggleApuesta(){
    if(this.logged){
        //Toggle div or send error
      const apostarDiv:HTMLDivElement = this.ApostarDiv.nativeElement,
      buttonToggle:HTMLButtonElement = this.toggleApuestaB.nativeElement
      buttonToggle.textContent.includes("Apostar")
        ? buttonToggle.innerHTML = "<h5 class='m-auto sizeh5'>Ocultar</h5>"
        : buttonToggle.innerHTML = "<h5 class='m-auto sizeh5'>Apostar</h5>"
      apostarDiv.classList.toggle("d-none")
      buttonToggle.classList.toggle("ocultar")
    }else{
      this.notLoggedError = "Inicia sesión para poder apostar"
      setTimeout(()=>{
        this.notLoggedError = ""
      },3000)
    }
  }
  //Set points and freestyler that you will vote
  RangeOnChange(value){
    if(value >= 0){
      this.apostarPor = this.Apuesta.rightFreestyler.nombre
      this.puntosAGanar = value * this.leftPercent / 100
      this.puntosAGanarDiv = `${Math.round(this.puntosAGanar)} + ${value}`
      this.FreestylerApostado = this.Apuesta.rightFreestyler
    }else{
      this.FreestylerApostado = this.Apuesta.leftFreestyler
      this.apostarPor = this.Apuesta.leftFreestyler.nombre
      this.puntosAGanar = Math.abs( value * this.rightPercent / 100)
      this.puntosAGanarDiv = `${Math.round(this.puntosAGanar)} + ${Math.abs(value)}`
    }
    const pointsDiv = this.Points.nativeElement
    console.log(pointsDiv)
    value = value.toString()
    let texto = value.replace("-","")
    this.puntosApostados = Number(texto)
    pointsDiv.innerHTML = texto
  }
  //Send values to backend, this updates "apuesta" values and updates user values
  Apostar(){
    const button:HTMLButtonElement = this.apostarButton.nativeElement
    button.disabled = true
    let error:any
    const newPoints = this.points - this.puntosApostados
    //esto es para saber cual de ambos freestylers fué votado
    let putApuesta = {}
    if(this.FreestylerApostado === this.Apuesta.leftFreestyler){
      const puntos = this.Apuesta.leftPoints + this.puntosApostados
      putApuesta = {
        leftPoints: puntos,
        rightPoints: this.Apuesta.rightPoints
      }
    }else{
      const puntos = this.Apuesta.rightPoints + this.puntosApostados
      putApuesta = {
        leftPoints: this.Apuesta.leftPoints,
        rightPoints: puntos
      }
    }
    console.log(this.User,this.Apuesta,"dsa")
    this._http.put(`/users/apostar/${this.User._id}`,{
      "apuestaId": this.Apuesta._id,
      "usedPoints": this.puntosApostados,
      "winPoints": this.puntosAGanar,
      "freestylerApostado": this.FreestylerApostado._id
    }).subscribe(data=> data,err=>error = true)
    if(error) error = "Ocurrió un error,intentelo más tarde"
    this._http.put(`/users/${this.User._id}`,{
      points: newPoints
    }).subscribe(data=> data,err=>error = true)
    if(error) error = "Ocurrió un error,intentelo más tarde"
    this._http.put(`/apuestas/${this.Apuesta._id}`,putApuesta)
      .subscribe(data=> data,err=>error = true)
    if(error) error = "Ocurrió un error,intentelo más tarde"
    const div:HTMLDivElement = this.ApostarDiv.nativeElement
    if(error){
      div.insertAdjacentHTML("beforeend",`
        <p class="text-center text-danger"> ${error} </p>`)
    }else{
      div.insertAdjacentHTML("beforeend",`
        <p class="text-center text-success"> Haz apostado con éxito </p>`)
      setTimeout(()=>{location.reload()},2000)
    }
    }
}

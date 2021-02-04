import { Apuesta } from '@interfaces/main-interfaces';
import { LoginAuthService } from './../../services/login-auth.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-apuestas',
  templateUrl: './mis-apuestas.component.html',
  styleUrls: ['./mis-apuestas.component.sass']
})
export class MisApuestasComponent implements OnInit {

  constructor(private _http: HttpService, private _loginAuth: LoginAuthService) { }
  logged
  user
  apuestas = [];
  apostado
  ngOnInit(): void {
    this._loginAuth.IsLogged().subscribe((user:any)=>{
      this.user = user.user
      this.apostado = user.user.apuestas
      this.logged = true
      //gets Every apuesta
      user.user.apuestas.forEach((el:any)=>{
        this._http.get(`/apuestas/${el.apuestaId}`).subscribe((data:any)=>{
          this.apuestas.push(data)
        })
      })
    },err=>{
      this.logged = false
    })
  }
  getApuestas(){

  }
}

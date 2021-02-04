import { LoginAuthService } from './../../services/login-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private _loginAuth: LoginAuthService) { }
  logged:any = false
  points
  ngOnInit(): void {
    this._loginAuth.IsLogged().subscribe((user:any)=>{
      user.user.points ? this.points = user.user.points : this.points = 0
      this.logged = true
    },err=>{
      this.logged = false
    })
  }
  toggle(el){
    const $el:HTMLDivElement = document.querySelector(el)
    $el.classList.toggle("open")
  }

  cerrarSesion(){
    localStorage.clear()
    setTimeout(() => {
      location.reload()
    }, 700);
  }
}

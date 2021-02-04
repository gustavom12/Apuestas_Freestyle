import { EncryptService } from './../../services/encrypt.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@services/http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  Form: FormGroup;
  error;
  success;
  loading = false
  login = false
  register = false
  constructor(private _builder: FormBuilder,private _http: HttpService,private router: Router, private route: ActivatedRoute, private _encript: EncryptService) { }

  ngOnInit(): void {
    document.querySelector("footer").classList.remove("mt-5")
    this.Form = this._builder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
    //toggles containers, depending of urls
    if(this.router.url === "/login")this.login = true
    if(this.router.url === "/register")this.register = true
  }
  //send values to backend
  OnSubmit(values){
    this.error = false
    this.loading = true
    //login
    if(this.login){
      this._http.post("/login",values).subscribe((res:any)=>{
        const encryptedEmail = this._encript.encrypt(values.email),
        encryptedPass = this._encript.encrypt(values.password)
        localStorage.setItem("1",encryptedEmail)
        localStorage.setItem("2",encryptedPass)
        this.loading = false
          window.history.pushState("", "", '/')
        setTimeout(() => {
          location.reload()
        }, 1000);
      },err=>{
        let notError = false
        if(err.status === 200){
          const encryptedEmail = this._encript.encrypt(values.email),
            encryptedPass = this._encript.encrypt(values.password)
          localStorage.setItem("1",encryptedEmail)
          localStorage.setItem("2",encryptedPass)
          window.history.pushState("", "", '/')
          setTimeout(() => {
            location.reload()
          }, 1000);
          notError = true
        }
        this.loading = false
        if(!notError && err.error){this.error = err.error}
      })
    }
    //register
    if(this.register){
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      values.username = values.email
      if(!emailRegex.test(values.email)){
        this.error = "introduce un email válido"
        this.loading = false
        return;
      }
      if(values.password.length < 8){
        this.error = "La contraseña debe tener al menos 8 dígitos"
        this.loading = false
        return;
      }
      const confirmPass:any = document.getElementById("Contraseña2")
      if(confirmPass.value !== values.password){
        this.error = "Las contraseñas no coinciden"
        this.loading = false
        return;
      }
      if(values){}
    this._http.post("/register",values).subscribe((data:any)=>{
      const encryptedEmail = this._encript.encrypt(values.email),
        encryptedPass = this._encript.encrypt(values.password)
      localStorage.setItem("1",encryptedEmail)
      localStorage.setItem("2",encryptedPass)
      window.history.pushState("", "", '/')
      setTimeout(() => {
        location.reload()
      }, 1000);
    },(err:any)=>{
      if(typeof err.error === "object"){this.error = "ocurrió un error, intentelo nuevamente"}
      else this.error = err.error
      this.loading = false
      if(!err.error){this.error = "ocurrió un error, intentelo nuevamente"}
    })
    }

  }

}

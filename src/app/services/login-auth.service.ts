import { tap } from 'rxjs/operators';
import { EncryptService } from './encrypt.service';
import {HttpService} from "./http.service"
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  isLogged
  constructor(private _http: HttpService, private _encript:EncryptService) { }
  IsLogged(){
    let encryptedEmail = "",
        encryptedPass = ""
    if(localStorage.getItem("1") && localStorage.getItem("2")){
      encryptedEmail = localStorage.getItem("1")
      encryptedPass = localStorage.getItem("2")
    }
    const email = this._encript.decrypt(encryptedEmail),
      pass = this._encript.decrypt(encryptedPass)
    return this._http.get(`/users?email=${email}&password=${pass}`)
  }

}

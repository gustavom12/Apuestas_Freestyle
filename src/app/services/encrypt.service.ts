import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  //Service to encrypt and decrypt Strings
  constructor() { }
  secretPassword = environment.password;
  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretPassword).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretPassword).toString(CryptoJS.enc.Utf8);
  }
}

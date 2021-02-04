import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {tap} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  url:string = "https://freestyle-backend.herokuapp.com";
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ3VzdGF2b19tZXJjYWRvIiwicGFzc3dvcmQiOiI0MzU1MzQ4NiIsImlhdCI6MTYxMDgxNDYxMn0.HJCx1UUzN0oE-Z-QfoBKrtLD5z-QQYoXTsrCdREsWlk";
  get(getName = "productos"){
    return this.http.get(`${this.url}${getName}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
    }}).pipe(
      tap(
        success => {return success},
        (err:any) =>{
          return err
        }
      )
    )
  }
  post(postUrl:string,body){
    return this.http.post(`${this.url}${postUrl}`,body, {
      headers: {
        Authorization: `Bearer ${this.token}`
    }}).pipe(
      tap(
        success => {return success},
        (err:any) =>{
          return err
        }
      )
    )
  }
  put(postUrl:string,body){
    return this.http.put(`${this.url}${postUrl}`,body, {
      headers: {
        Authorization: `Bearer ${this.token}`
    }}).pipe(
      tap(
        success => {return success},
        (err:any) =>{
          return err
        }
      )
    )
  }

  // getToken(getName = "productos"){
  //   this.http.post( `${this.url}/auth/local`, {
  //     identifier: environment.tokenIdentifier,
  //     password: environment.password,
  //   }).subscribe((data:any)=>{
  //     this.get(getName)
  //   })
  // }

}

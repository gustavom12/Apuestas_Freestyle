import { Freestyler } from './../../../interfaces/main-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@services/http.service';
@Component({
  selector: 'app-apuestas-adm',
  templateUrl: './apuestas-adm.component.html',
  styleUrls: ['./apuestas-adm.component.sass']
})
export class ApuestasADMComponent implements OnInit {
  Form: FormGroup;
  error;
  success;
  freestylers:Freestyler[];
  constructor(private _builder: FormBuilder,private _http: HttpService) { }

  ngOnInit(): void {
    this._http.get("/freestylers").subscribe((res:Freestyler[])=>{
      this.freestylers = res
      console.log(res)
    })
    this.Form = this._builder.group({
      leftFreestylerId: ["",Validators.required],
      leftPoints: [0],
      rightFreestylerId: ["",Validators.required],
      rightPoints: [0],
      finishDate: [0,Validators.required],
      organization: [""]
    })
  }
  OnSubmit(values){
    this.error = false
    console.log(values)
    this._http.post("/apuestas",values).subscribe((data:any)=>{
      console.log(data)
      if(data.status){
        this.success = data.status
        console.log("succed")
        setTimeout(() => {
          this.success = false
        }, 5000);
    }
      if(data.error){
        this.error = data.error.message
        console.log("succeerr")
      }
    })
  }
}

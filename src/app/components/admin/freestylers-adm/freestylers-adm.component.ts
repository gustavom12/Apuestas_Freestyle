import { HttpService } from '@services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-freestylers-adm',
  templateUrl: './freestylers-adm.component.html',
  styleUrls: ['./freestylers-adm.component.sass']
})
export class FreestylersADMComponent implements OnInit {
  Form: FormGroup;
  error;
  success
  constructor(private _builder: FormBuilder,private _http: HttpService) { }

  ngOnInit(): void {
    this.Form = this._builder.group({
      nombre: ["",Validators.required],
      pais: ["",Validators.required],
      imgUrl: ["",Validators.required]
    })
  }
  OnSubmit(values){
    this.error = false
    console.log(values)
    this._http.post("/freestylers",values).subscribe((data:any)=>{
      console.log(data)
      if(data.status){
        this.success = data.status
        console.log("succed")
        setTimeout(() => {
          this.success = false
        }, 4000);
    }
      if(data.error){
        this.error = data.error.message
        console.log("succeerr")
      }
    })
  }
}

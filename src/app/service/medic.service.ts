import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Medic } from '../model/medic';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic>{
  //private url :string = `${environment.HOST}/medics`;

  //Declarando Variables Reactivas
  private medicChange: Subject<Medic[]> = new Subject<Medic[]>;
  private messageChange: Subject<string> = new Subject<string>;
  
  constructor(protected override http:HttpClient){
    super(http, `${environment.HOST}/medics`);
  }
 // constructor(private http:HttpClient) { }


  //Getters y Setters de las variables Reactivas
  setMedicChange(data:Medic[]){
      this.medicChange.next(data);
  }

  getMedicChange(){
    return this.medicChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Signos } from '../model/signos';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignosService extends GenericService<Signos> {
  private signosChange: Subject<Signos[]> = new Subject<Signos[]>;
  private messageChange: Subject<string> = new Subject<string>;
  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/signos`);
   }

   //Getter y Setter Variables Reactivas
   setSignosChange(data: Signos[]){
    this.signosChange.next(data);
   }

   getSignosChange(){
    return this.signosChange.asObservable();
   }

   setMessageChange(data: string){
    this.messageChange.next(data);
   }

   getMessageChange(){
    return this.messageChange.asObservable();
   }

}

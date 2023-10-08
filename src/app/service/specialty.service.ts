import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Specialty } from '../model/specialty';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private url: string =`${environment.HOST}/specialties`;

  //Declarando Variables Reactivas
  private specialtyChange: Subject<Specialty[]> = new Subject<Specialty[]>;
  private messageChange: Subject<string> = new Subject<string>;

  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Specialty[]>(this.url);
  }

  findById(id:number){
    return this.http.get<Specialty>(`${this.url}/${id}`);
  }

  save(data:Specialty){
    return this.http.post(this.url, data);
  }

  update(id:number, data:Specialty){
    return this.http.put(`${this.url}/${id}`,data);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  //Getters y Setters de las variables Reactivas

  setSpecialtyChange(data: Specialty[]){
    this.specialtyChange.next(data);
  }

  getSpecialtyChange(){
    return this.specialtyChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}

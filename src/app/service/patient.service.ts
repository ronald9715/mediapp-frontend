import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http'
import { Patient } from '../model/patient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url:string = `${environment.HOST}/patients`;
  private patientChange: Subject<Patient[]> = new Subject<Patient[]>;
  private messageChange: Subject<string> = new Subject<string>;

  //inyeccion de dependencia
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Patient[]>(this.url);
  }

  findById(id: number){
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  save(patient: Patient){
    return this.http.post(this.url, patient);
  }

  update(id:number, patient:Patient){
    return this.http.put(`${this.url}/${id}`, patient);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listPageable(p:number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`)
  }

  //////////////////////////////////////

  getPatientChange(){
    return this.patientChange.asObservable();
  }

  setPatientChange(data:Patient[] ){
    this.patientChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  setMessageChange(data:string ){
    this.messageChange.next(data);
  }
}

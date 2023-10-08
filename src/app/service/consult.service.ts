import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Consult } from '../model/consult';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Exam } from '../model/exam';
import { ConsultListExamDTO } from '../dto/consultListExamI';
import { FilterConsultDTO } from '../dto/filterConsultDTO';

/*interface ConsultListExamDTO{
  consultDTO: Consult,
  listExam: Exam[]
}*/

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
 private url:string = `${environment.HOST}/consults`

 constructor(private http: HttpClient){

 }

 saveTransactional(dto: ConsultListExamDTO){
  return this.http.post(this.url, dto);
 }

 search(dto: FilterConsultDTO){
  return this.http.post<Consult[]>(`${this.url}/search/others`, dto);
 }

 searchByDates(date1: string, date2: string){
  return this.http.get<Consult[]>(`${this.url}/search/dates?date1=${date1}&date2=${date2}`);
 }

 getExamsByIdConsult(idConsult: number){
  return this.http.get<any>(`${environment.HOST}/consultexams/${idConsult}`)
 }

 callProcedureOrFunction(){
  return this.http.get<any>(`${this.url}/callProcedureProjection`);
 }

 //PDF
 generateReport(){
  return this.http.get(`${this.url}/generateReport`, {responseType: 'blob'});
 }

 generateReport2(){
  return this.http.get(`${this.url}/generateReport2`, {responseType: 'blob'});
 }

 //Save Image

 saveFile(data: File){
  const formData: FormData = new FormData();
  formData.append('file', data);
  return this.http.post(`${this.url}/saveFile`, formData);
 }

 readFile(id: number){
  return this.http.get(`${this.url}/readFile/${id}`, {responseType:'blob'})
 }
}

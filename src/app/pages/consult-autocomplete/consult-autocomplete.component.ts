import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { duration } from 'moment';
import { Observable, map } from 'rxjs';
import { ConsultListExamDTO } from 'src/app/dto/consultListExamI';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ConsultService } from 'src/app/service/consult.service';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-consult-autocomplete',
  templateUrl: './consult-autocomplete.component.html',
  styleUrls: ['./consult-autocomplete.component.css']
})
export class ConsultAutocompleteComponent implements OnInit {

  form:FormGroup;

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];
  //Se creo para el Autocomplete
  patientsFiltered$: Observable<Patient[]>
  medicsFiltered$: Observable<Medic[]>
  patientControl: FormControl = new FormControl();
  medicControl: FormControl = new FormControl();

  specialtySelected: Specialty;
  minDate: Date = new Date();
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  diagnosis: string;
  treatment: string;


  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar
  ){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      patient: this.patientControl, //new FormControl(),
      medic: this.medicControl,//new FormControl(),
      specialty: new FormControl(),
      exam: new FormControl(),
      consultDate: new FormControl(),
      diagnosis:new FormControl(),
      treatment: new FormControl()
    })

    this.loadInitialData();
    this.patientsFiltered$ = this.patientControl.valueChanges.pipe(map(val=>this.filterPatients(val)));
    this.medicsFiltered$ = this.medicControl.valueChanges.pipe(map(val=>this.filterMedics(val)));
  }

  loadInitialData(){
    this.patientService.findAll().subscribe(data=>
      this.patients = data
    )

    this.medicService.findAll().subscribe(data=>
      this.medics = data
    )

    this.specialtyService.findAll().subscribe(data=>
      this.specialties = data  
    )

    this.examService.findAll().subscribe(data=>
      this.exams = data  
    )
  }

  filterPatients(val:any){

    if(val?.idPatient > 0){
      return this.patients.filter(el=>
        el.firstName.toLocaleLowerCase().includes(val.firstName.toLocaleLowerCase())||el.lastName.toLocaleLowerCase().includes(val.lastName.toLocaleLowerCase())
        )
    }else{
      return this.patients.filter(el=>
        el.firstName.toLocaleLowerCase().includes(val?.toLocaleLowerCase())||el.lastName.toLocaleLowerCase().includes(val?.toLocaleLowerCase())
        )
    }
    
  }

  filterMedics(val:any){

    if(val?.idMedic > 0){
      return this.medics.filter(el=>
        el.primaryName.toLocaleLowerCase().includes(val.primaryName.toLocaleLowerCase())||el.surname.toLocaleLowerCase().includes(val.surname.toLocaleLowerCase())
        )
    }else{
      return this.medics.filter(el=>
        el.primaryName.toLocaleLowerCase().includes(val?.toLocaleLowerCase())||el.surname.toLocaleLowerCase().includes(val?.toLocaleLowerCase())
        )
    }
    
  }

  showPatient(val:any){
    return val? `${val.firstName} ${val.lastName}` : val;
  }

  showMedic(val:any){
    return val? `${val.primaryName} ${val.surname}` : val;
  }

  addDetail(){
    const det = new ConsultDetail();
    det.diagnosis = this.form.value['diagnosis'];
    det.treatment = this.form.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index:number){
    this.details.splice(index, 1);

  }

  addExam(){
    if (this.form.value['exam'] != null) {
      this.examsSelected.push(this.form.value['exam']);
    } else {
      this._snackBar.open('Please select an exam','INFO', {duration:2000})
    }
  }

  save(){
    const consult = new Consult();
    consult.patient = this.form.value['patient']
    consult.medic = this.form.value['medic']
    consult.specialty = this.form.value['specialty']

    consult.details = this.details;
    consult.numConsult = "c1";
    consult.consultDate = moment(this.form.value['consultDate']).format('YYYY-MM-DDTHH:mm:ss');

    console.log("Viendo ", consult);
    const dto: ConsultListExamDTO = {
      consultDTO: consult,
      listExam: this.examsSelected
     }

     this.consultService.saveTransactional(dto).subscribe(()=>{
      this._snackBar.open('CREATED', 'INFO', {duration:2000});
      setTimeout(()=>{
        this.cleanControl();
      },2000);

     });
  }

  cleanControl(){
    this.form.reset();
    this.patientControl.reset();
    this.medicControl.reset();
    this.details = [];
    this.examsSelected = [];
  }

  
}

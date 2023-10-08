import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
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
  selector: 'app-consult-wizard',
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css']
})
export class ConsultWizardComponent implements OnInit {
 
  firstFormGroup:FormGroup
  secondFormGroup:FormGroup
  patients: Patient[]
  medics: Medic[]
  specialties: Specialty[]
  exams: Exam[]

  minDate: Date = new Date()

  details: ConsultDetail[] = []
  examsSelected: Exam[] = []

  medicSelected: Medic
  consults: number[] = []
  consultSelected: number;

  @ViewChild('stepper') stepper: MatStepper

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private consultService: ConsultService
    ){

  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      'patient':[new FormControl(), Validators.required],
      'specialty':[new FormControl(), Validators.required],
      'exam':[new FormControl(), Validators.required],
      'consultDate':[new FormControl(new Date()), Validators.required],
      'diagnosis':new FormControl('', [Validators.required]),
      'treatment':new FormControl('',[ Validators.required])
    })
    this.secondFormGroup = this._formBuilder.group({});
    this.loadInitialData();
  }

  loadInitialData(){
    this.patientService.findAll().subscribe(data=> this.patients = data);
    this.medicService.findAll().subscribe(data=> this.medics = data);
    this.specialtyService.findAll().subscribe(data=> this.specialties = data);
    this.examService.findAll().subscribe(data=> this.exams = data);

    for (let index = 1; index <= 30; index++) {
      this.consults.push(index);
      
    }
  }

  addDetail(){
    const det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index:number){
    this.details.splice(index, 1)
  }

  addExam(){
    
    if(this.firstFormGroup.value['exam'] != null){
      this.examsSelected.push(this.firstFormGroup.value['exam'] );
      
    }else{
      this._snackBar.open('Select an exam', 'INFO', {duration:2000})
    }
  }

  selectMedic(medic: Medic){
    this.medicSelected = medic;
  }

  selectConsult(index: number){
    this.consultSelected = index;
  }

  get f(){
    return this.firstFormGroup.controls;
  }

  save(){
    const consult = new Consult();
    consult.patient = this.firstFormGroup.value['patient']
    consult.medic = this.medicSelected
    consult.specialty = this.firstFormGroup.value['specialty']
    consult.numConsult = `c${this.consultSelected}`
    consult.details = this.details
    consult.consultDate = moment(this.firstFormGroup.value['consultDate']).format('YYYY-MM-DDTHH:mm:ss');

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
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();

    this.details = [];
    this.examsSelected = [];
    this.consultSelected = null;
    this.medicSelected = null;
  }

}

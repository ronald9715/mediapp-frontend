import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { Signos } from 'src/app/model/signos';
import { PatientService } from 'src/app/service/patient.service';
import { SignosService } from 'src/app/service/signos.service';

@Component({
  selector: 'app-signos-edit',
  templateUrl: './signos-edit.component.html',
  styleUrls: ['./signos-edit.component.css']
})
export class SignosEditComponent implements OnInit {
  
  patients: Patient[];
  idPatientSelected: number;

  dateSelected: Date;
  minDate: Date = new Date();

  temperatura:string;
  pulso:string;
  ritmo:string;

  id:number;
  isEdit:boolean = false;

  constructor(private patientService: PatientService,
    private signoService: SignosService,
    private route: ActivatedRoute,
    private router: Router
    ){

  }
  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    this.patientService.findAll().subscribe(data=> this.patients = data)
    if(this.isEdit){
      this.signoService.findById(this.id).subscribe(data=>{
        console.log(data);
        this.idPatientSelected = data.patient.idPatient;
        this.dateSelected = moment(data.date).toDate();
        this.temperatura = data.temperatura;
        this.pulso = data.pulso;
        this.ritmo = data.ritmo;

      })
    }
  }

  save(){
    const patient = new Patient();
    patient.idPatient = this.idPatientSelected;

    const signos = new Signos();
    signos.patient = patient;
    signos.date = moment(this.dateSelected).format('YYYY-MM-DD');
    signos.pulso = this.pulso;
    signos.ritmo = this.ritmo;
    signos.temperatura = this.temperatura;

    if (this.isEdit) {
      //UPDATE
      this.signoService.update(this.id, signos).pipe(switchMap(()=>{
        return this.signoService.findAll();
      }))
      .subscribe(data=>{
        this.signoService.setSignosChange(data);
        this.signoService.setMessageChange('UPDATED!');
      })
    }else{
      this.signoService.save(signos).pipe(switchMap(()=>{
        return this.signoService.findAll();
      }))
      .subscribe(data=>{
        this.signoService.setSignosChange(data);
        this.signoService.setMessageChange('CREATED!');
      })
    }
    this.router.navigate(['/pages/signos'])
  
  }

  

}

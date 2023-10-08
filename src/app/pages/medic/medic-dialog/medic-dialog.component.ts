import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {

  medic: Medic;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService
  ){

  }
  ngOnInit(): void {
    this.medic = {...this.data};
  }

  operate(){
    console.log("Medic Info",this.medic)
    if(this.medic != null && this.medic.idMedic>0){
      //UPDATE
      
      this.medicService.update(this.medic.idMedic, this.medic)
      .pipe(switchMap(()=>this.medicService.findAll()))
      .subscribe(data=>{
        this.medicService.setMedicChange(data)
        this.medicService.setMessageChange('UPDATED!')
      })
    }else{
      //INSERT
      this.medicService.save(this.medic)
      .pipe(switchMap(()=>this.medicService.findAll()))
      .subscribe(data=>{
        this.medicService.setMedicChange(data)
        this.medicService.setMessageChange('CREATED!')
      })
    }

    this.cancel()

  }

  cancel(){
    this._dialogRef.close();
  }

}
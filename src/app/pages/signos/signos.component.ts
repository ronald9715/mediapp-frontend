import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { Signos } from 'src/app/model/signos';
import { SignosService } from 'src/app/service/signos.service';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit{

  displayedColumns:string[] = ['id','Patient','Date', 'Temperatura','Pulso', 'Ritmo','Actions']
  dataSource: MatTableDataSource<Signos>
  

  constructor(
    private signosService: SignosService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
    ){

  }

  ngOnInit(): void {
    //Variables Reactivas
    this.signosService.getSignosChange().subscribe(data=>{
      this.createTable(data);
    })
    this.signosService.getMessageChange().subscribe(data=>{
      this._snackBar.open(data, 'INFO',{duration:2000})
    })

    this.signosService.findAll().subscribe(data=>{
      this.createTable(data);
    })
  }

  createTable(data: Signos[]){
    this.dataSource = new MatTableDataSource(data);
  }

  applyFilter(e:any){
    this.dataSource.filter = e.target.value.trim();
  }

  delete(id: number){
    this.signosService.delete(id)
    .pipe(switchMap(()=>this.signosService.findAll()))
    .subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.signosService.setMessageChange('DELETED')
    })
  }

  checkChildren(){
    return this.route.children.length !=0
  }

}

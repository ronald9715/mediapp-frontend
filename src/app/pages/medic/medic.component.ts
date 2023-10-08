import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';


@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {
  displayedColumns: string[] = ['id', 'PrimaryName','Surname','CMP','Photo',"actions"];
  dataSource:MatTableDataSource<Medic>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(
    private medicService:MedicService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog
    ){}

  ngOnInit() {

    this.medicService.getMedicChange().subscribe(data=>{
      this.createTable(data);
    })

    this.medicService.getMessageChange().subscribe(data=>{
      this._snackBar.open(data,'INFO', {duration:3000});
    })
    this.medicService.findAll().subscribe(data=>{
      this.createTable(data);
    })
  }

  createTable(data:Medic[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e:any){
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(data?:Medic){
    this._matDialog.open(MedicDialogComponent,{
      width:'750px',
      data: data
    })
  }

  delete(id:number){
    this.medicService.delete(id).pipe(switchMap(()=>
      this.medicService.findAll()
    ))
    .subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.medicService.setMessageChange('DELETED!');
    })
  }
    
}

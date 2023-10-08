import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Specialty } from 'src/app/model/specialty';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {
  
  displayedColumns:string[] = ['id','Name','Description','Actions']
  dataSource:MatTableDataSource<Specialty>;
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route:ActivatedRoute,
    private specialtyService:SpecialtyService,
    private _snackBar: MatSnackBar){

  }
  ngOnInit(): void {

    this.specialtyService.getSpecialtyChange().subscribe(data=>{
      this.createTable(data)
    })

    this.specialtyService.getMessageChange().subscribe(data=>{
      this._snackBar.open(data,'INFO',{duration:3000})
    })

    this.specialtyService.findAll().subscribe(data=>{
      this.createTable(data)
    })
  }

  createTable(data:Specialty[]){
    this.dataSource = new MatTableDataSource(data);
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e:any){
    this.dataSource.filter = e.target.value.trim();
  }

  delete(id:number){
    this.specialtyService.delete(id)
    .pipe(switchMap(()=>this.specialtyService.findAll()))
    .subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.specialtyService.setMessageChange('DELETED')
    })
  }

  checkChildren(){
    return this.route.children.length !=0
  }
}

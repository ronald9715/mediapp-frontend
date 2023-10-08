import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  displayedColumns: string[] = ['id','ExamName','Description','Actions']
  dataSource: MatTableDataSource<Exam> 
  constructor(
    private examService:ExamService,
    private _snackBar:MatSnackBar
    ){}

  ngOnInit(): void {
    this.examService.getExamChange().subscribe(data=>{
      this.createTable(data);
    })

    this.examService.getMessageChange().subscribe(data=>{
      this._snackBar.open(data,'INFO',{duration:3000})
    })

    this.examService.findAll().subscribe(data=>{
      this.createTable(data)
    })
  }

  createTable(data:Exam[]){
    this.dataSource = new MatTableDataSource(data)
  }
  applyFilter(e:any){
    this.dataSource.filter = e.target.value.trim();
  }

  delete(id:number){
    this.examService.delete(id).pipe(switchMap(()=>
      this.examService.findAll()
    ))
    .subscribe(data=>{
      this.examService.setExamChange(data);
      this.examService.setMessageChange('DELETED');
    })
  }
}

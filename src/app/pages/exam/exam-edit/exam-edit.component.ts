import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {
  form:FormGroup;
  id:number;
  isEdit:boolean = false ;

  constructor(private examService:ExamService,
    private route: ActivatedRoute,
    private router: Router
    ){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idExam: new FormControl(0),
      nameExam: new FormControl(''),
      descriptionExam: new FormControl('')
    })

    this.route.params.subscribe(data=>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })


  }

  initForm(){
    if(this.isEdit){
      this.examService.findById(this.id).subscribe(data=>{
        this.form = new FormGroup({
          idExam : new FormControl(data.idExam),
          nameExam:new FormControl(data.nameExam),
          descriptionExam:new FormControl(data.descriptionExam)
        })
      })
    }
  }

  operate(){
    const exam: Exam = new Exam();
    exam.idExam = this.form.value['idExam'];
    exam.nameExam = this.form.value['nameExam'];
    exam.descriptionExam = this.form.value['descriptionExam']

    if(this.isEdit){
        this.examService.update(this.id, exam).pipe(switchMap(()=>
          this.examService.findAll()
        ))
        .subscribe(data=>{
          this.examService.setExamChange(data);
          this.examService.setMessageChange('UPDATED')
        })
    }else{
        this.examService.save(exam).pipe(switchMap(()=>
        this.examService.findAll()
      ))
      .subscribe(data=>{
        this.examService.setExamChange(data);
        this.examService.setMessageChange('INSERTED')
    })
    }

    

    this.router.navigate(['/pages/exam'])
  }

  
}

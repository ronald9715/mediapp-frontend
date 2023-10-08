import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Specialty } from 'src/app/model/specialty';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-specialty-edit',
  templateUrl: './specialty-edit.component.html',
  styleUrls: ['./specialty-edit.component.css']
})
export class SpecialtyEditComponent implements OnInit {
  
  form: FormGroup;
  id: number;
  isEdit: boolean = false;

  constructor(private specialtyService: SpecialtyService,
  private route: ActivatedRoute,
  private router: Router  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idSpecialty: new FormControl(0),
      name: new FormControl(''),
      description: new FormControl('')
    })

    this.route.params.subscribe(data=>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    if(this.isEdit){
      this.specialtyService.findById(this.id).subscribe(data=>{
        this.form = new FormGroup({
          idSpecialty: new FormControl(data.idSpecialty),
          name: new FormControl(data.name),
          description: new FormControl(data.description)
        })
      })
    }
  }

  operate(){
    const specialty : Specialty = new Specialty();
    specialty.idSpecialty = this.form.value['idSpecialty'];
    specialty.name = this.form.value['name'];
    specialty.description = this.form.value['description'];

    if(this.isEdit){
      //UPDATE
      console.log(this.id);
      this.specialtyService.update(this.id,specialty).pipe(switchMap(()=>{
        return this.specialtyService.findAll()
      }
        
      ))
      .subscribe(data=>{
        console.log(data);
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange('UPDATED')
      })
    }else{
      //INSERT
      this.specialtyService.save(specialty).pipe(switchMap(()=>{
        return this.specialtyService.findAll()
      }))
      .subscribe(data=>{
        this.specialtyService.setSpecialtyChange(data)
        this.specialtyService.setMessageChange('INSERTED')
      })
    }
   

    this.router.navigate(['/pages/specialty'])

  }
}

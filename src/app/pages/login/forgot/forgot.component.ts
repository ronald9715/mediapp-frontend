import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  
  email: string;
  message: string;
  error: string;

  constructor(
    private loginService: LoginService,
    public route: ActivatedRoute
  ){
    
  }
  sendMail(){
    this.loginService.sendMail(this.email).subscribe(data=>{
      if (data === 1) {
        this.message = "Mail Sent!";
        this.error = null;
      }else{
        this.error = "User not exits";
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import '../../../assets/login-animation.js'
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  username:string;
  password:string;
  message:string;
  error:string;
  email:any;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}
  ngOnInit(): void {
   
  }

  login(){
    this.loginService.login(this.email, this.password).subscribe(data=>{
      sessionStorage.setItem('token', data.jwtToken);
      this.router.navigate(['/pages/dashboard']);
    })
  }

  ngAfterViewInit(){
    (window as any).initialize();
  }

}

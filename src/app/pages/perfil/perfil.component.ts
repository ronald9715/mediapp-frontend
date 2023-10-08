import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
 
  nombre: string;
  roles: string[];

  ngOnInit(): void {
    this.getUserAndRoles();
  }

  getUserAndRoles(){
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('token');
    const decodeToken = helper.decodeToken(token);
    console.log(decodeToken);

    this.nombre = decodeToken.sub;
    this.roles = decodeToken.role.split(",");

  }

}

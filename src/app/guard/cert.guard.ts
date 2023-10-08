import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../service/login.service";
import { MenuService } from "../service/menu.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs";
import { Menu } from "../model/menu";

export const CertGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
    const router = inject(Router);
    const loginService = inject(LoginService);
    const menuService = inject(MenuService);

    //Verificar esta logueado
    const rpta = loginService.isLogged();
    if(!rpta){
        loginService.logout();
    }
    //Verificar si el token no esta expirado
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('token')
    if (!helper.isTokenExpired(token)) {
        //Verificar si tienes el rol necesaio
        //URL
        const url = state.url;
        
        const decodeToken = helper.decodeToken(token);
        const username = decodeToken.sub;

        return menuService.getMenusByUser(username).pipe(map((data:Menu[])=>{
            let count = 0;
            for(let m of data){
                console.log(url);
                console.log(m.url)
                if(url.startsWith(m.url)){
                    count ++;
                    break;
                }
            }

            if (count > 0) {
                return true;
            }else{
                router.navigate(['/pages/not-403']);
                return false;
            }
        }))
    }else{
        loginService.logout();
        return false;
    }
    
    
}
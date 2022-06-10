import { Injectable, Inject } from '@angular/core'; 

@Injectable({
    providedIn: 'root'
  })

export class AuthService{
    isAuthenticated="";
    username="";
    password="";
    getAuthStatus():boolean{
        let login
        this.username = JSON.parse(localStorage.getItem('username'));
        this.password = JSON.parse(localStorage.getItem('password'));
        this.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
        if(this.username && this.password && this.isAuthenticated){
            login= true;
        } else {
            login= false;
        }
        console.log("Auth status " + login)
        return login
    }
    login(username, password, company){
        localStorage.setItem('username',JSON.stringify(username));
        localStorage.setItem('password',JSON.stringify(password));
        localStorage.setItem('company',JSON.stringify(company));
        if(company == 'adec'){
            localStorage.setItem('ClientId',JSON.stringify('356DAAA6-44B5-46B1-BE61-44AD5A5C034F'));
        }else if(company == 'finelle'){
            localStorage.setItem('ClientId',JSON.stringify('D3B2430C-03F8-4BB0-9A32-36C5DD26B11A'));
        }
        localStorage.setItem('isAuthenticated',JSON.stringify(true));
    }

    logout(){
        localStorage.clear()
        
    }
}
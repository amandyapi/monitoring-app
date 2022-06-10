import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username= "";
  password="";
  
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
   
 }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }


  
  login(){
    this.ngxService.start();
    if(this.username == "adec" && this.password == "@D3cCi~#"){
      this.toastr.success("Chargement en cours", 'Connexion réussie',);
      this.AuthService.login(this.username,this.password,("adec"))
      this.ngxService.stop();
      this.router.navigate(['/dashboard/dashboard2']);
    }else if(this.username == "finelle" && this.password =="F1n3lLE@2~#"){
      this.AuthService.login(this.username,this.password,"finelle")
      this.ngxService.stop();
      this.toastr.success("Chargement en cours", 'Connexion réussie',);
      this.router.navigate(['/dashboard/dashboard2']);
    } else{
      //this.ngxService.stop();
      this.toastr.error("Accès incorrect", 'Erreur',);
    }
  }
  
}

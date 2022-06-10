import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html'
})
export class Login2Component {
  constructor(  
    private router: Router,
  ) {}

  loginform = true;
  recoverform = false; 

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  login(){
    this.router.navigate(['/dashboard/dashboard2']);
  }
}

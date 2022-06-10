import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core'; 
import { KioskModel } from '../models/kiosk.model';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { ServiceData, ServiceModel } from '../models/service.model';

@Injectable({
    providedIn: 'root'
  })

export class ServicesService{
    username= '';
    password= '';
    clientId='';
    constructor(
      private http: HttpClient
    ){
      this.clientId = JSON.parse(localStorage.getItem('ClientId'));
      this.username = JSON.parse(localStorage.getItem('username'));
      this.password = JSON.parse(localStorage.getItem('password'));
      
    }

    getServicesList(){
    // server
    const headers = new  HttpHeaders({
      Authorization: 'Basic '+ btoa(this.username +":" +this.password),     
      "Content-Type": "application/json",
      'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
    });
    return this.http.get<ServiceData>('https://sk-automate.tech/paymentsboapi/services?clientid='+ this.clientId,
    {responseType: 'json', headers}); 
 
    }

}
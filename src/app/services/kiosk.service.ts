import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { KioskModel } from '../models/kiosk.model';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable({
    providedIn: 'root'
  })

export class KioskService{
    username= '';
    password= '';
    clientId='';
    constructor(
      private http: HttpClient
    ){
      this.username = JSON.parse(localStorage.getItem('username'));
      this.password = JSON.parse(localStorage.getItem('password'));
      //this.clientId = JSON.parse(localStorage.getItem('ClientId'));
    }

    getKiosksList(){
    // server
    var auth = 'Basic '+ btoa(this.username +":" +this.password);
    console.log('auth ', auth);
    const headers = new  HttpHeaders({
      Authorization: 'Basic '+ btoa(this.username +":" +this.password),
      "Content-Type": "application/json",
      'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
    });
    return this.http.get<KioskModel[]>('https://sk-automate.tech/paymentsboapi/Ekassir/Points',
    {responseType: 'json', headers});


    }

    getOnlineKiosks(){
      // server
      const headers = new  HttpHeaders({
        Authorization: 'Basic '+ btoa(this.username +":" +this.password),
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS',

      });

      return this.http.get<KioskModel[]>('https://sk-automate.tech/paymentsboapi/Ekassir/Points?online=true',
      {responseType: 'json', headers});


      }

      getOfflineKiosks(){
        // server
        const headers = new  HttpHeaders({

          Authorization: 'Basic '+ btoa(this.username +":" +this.password),
          "Content-Type": "application/json",
         'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS',

        });

        return this.http.get<KioskModel[]>('https://sk-automate.tech/paymentsboapi/Ekassir/Points?online=false',
        {responseType: 'json', headers});


        }

    getKioskDetails(kioskId){
      var auth = 'Basic '+ btoa(this.username +":" +this.password);
      console.log('auth ', auth);
      const headers = new  HttpHeaders({
        Authorization: 'Basic '+ btoa(this.username +":" +this.password),
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
      });

      return this.http.get<any>('https://sk-automate.tech/paymentsboapi/kiosks/' + kioskId,
      {responseType: 'json', headers});
    }

    updateKioskDetails(kioskId, clientId, payload){
      var auth = 'Basic '+ btoa(this.username +":" +this.password);
      console.log('auth ', auth);
      const headers = new  HttpHeaders({
        Authorization: 'Basic '+ btoa(this.username +":" +this.password),
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
      });

      return this.http.put<any>('https://sk-automate.tech/paymentsboapi/kiosks/' + kioskId, payload,
      {responseType: 'json', headers});
    }

}

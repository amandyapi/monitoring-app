import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core'; 
import { KioskModel } from '../models/kiosk.model';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { TransactionModel } from '../models/transaction.model';
import { TransactionData } from '../models/transactionData.model';

@Injectable({
    providedIn: 'root'
  })

export class TransactionService{
    username= '';
    password= '';
    constructor(
      private http: HttpClient
    ){
      this.username = JSON.parse(localStorage.getItem('username'));
      this.password = JSON.parse(localStorage.getItem('password'));
    }

    getAllTransactions(taille){
    // server
    const headers = new  HttpHeaders({
      Authorization: 'Basic '+ btoa(this.username +":" +this.password),     
      "Content-Type": "application/json",
      'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
    });
    return this.http.get<TransactionData>('https://sk-automate.tech/paymentsboapi/transactions?pagesize=' +taille,
    {responseType: 'json', headers});
     
 
    } 

    getTransactionById(id){
      // server
      const headers = new  HttpHeaders({
        Authorization: 'Basic '+ btoa(this.username +":" +this.password),     
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS',

      });
  
      return this.http.get<TransactionModel[]>('https://sk-automate.tech/paymentsboapi/Ekassir/Points?online=true',
      {responseType: 'json', headers});
      
   
      }

}
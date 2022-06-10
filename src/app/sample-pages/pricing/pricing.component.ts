import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TransactionModel } from 'src/app/models/transaction.model';
import { TransactionData } from 'src/app/models/transactionData.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  templateUrl: './pricing.component.html',
  styleUrls:['./pricing.component.css']
})
export class PricingComponent {
  allTransactions: TransactionData;
  latestTransactions: TransactionModel[];
  transactionsTotal: number= 0;
  transactionsSuccess: number= 0;
  transactionsFailed:number= 0;
  transactionsHold:number= 0;

  constructor(
    private transaction: TransactionService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) {
  }

  async ngAfterViewInit() {
    await this.GetAllTransactions();

   }
  
  async GetAllTransactions(){
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.transaction.getAllTransactions(100))
    .toPromise()
    .then((res) => {
     this.allTransactions= res;
     this.allTransactions.data.forEach(transaction => {
       if(transaction.status == 0) {
         this.transactionsSuccess++
       }
       if(transaction.status == 1) {
        this.transactionsFailed++
      }
      if(transaction.status == 2) {
        this.transactionsHold++
      }
      this.latestTransactions = this.allTransactions.data
      
     });
     this.transactionsTotal =this.allTransactions.totalItemsCount;


     this.toastr.success('Kiosk', 'Success');
     this.ngxService.stop();
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    });

  }


}

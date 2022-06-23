import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { KioskModel } from 'src/app/models/kiosk.model';
import { TransactionModel } from 'src/app/models/transaction.model';
import { TransactionData } from 'src/app/models/transactionData.model';
import { KioskService } from 'src/app/services/kiosk.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements AfterViewInit {
  allTransactions: TransactionData;
  latestTransactions: TransactionModel[];
  subtitle: string;
  kioskTotal: number= 0;
  onlineKiosk: number = 0;
  transactionsTotal: number= 0;
  transactionsSuccess: number= 0;
  transactionsFailed:number= 0;
  transactionsHold:number= 0;
  offlineKiosk= this.kioskTotal - this.onlineKiosk;
  kioskList: KioskModel[];

  dateNow= new Date();

  constructor(
    private kioskService: KioskService,
    private transaction: TransactionService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) {
    this.subtitle = 'This is some text within a card block.';
    console.log(this.dateNow);
    console.log(this.dateNow.getDate());
  }

  ngOnInit(){
    setTimeout(function () {
      $(function () {
        $('#transactions').DataTable({
            dom: 'Bfrtip',
            language: {
              url: "http://cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json"
            }
        });
      });
    }, 3000);
  }


  async ngAfterViewInit() {
    await this.getKiosksList();
    // await this.getOnlineKiosk();
    // await this.getOfflineKiosk();
    await this.GetAllTransactions();
    await this.GetLatestTransactions();

   }
  async getKiosksList(){
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.kioskService.getKiosksList())
    .toPromise()
    .then((res) => {
      console.log(res)
     this.kioskList= res;
     this.kioskTotal= this.kioskList.length
     this.kioskList.forEach(kiosk => {
      if(kiosk.pointsMonitorings[0].online == true){
        this.onlineKiosk++
      }else if(kiosk.pointsMonitorings[0].online == false){
       this.offlineKiosk++
     }
     });
     console.log('Total kiosk: ', this.kioskTotal)
     this.toastr.success('Kiosk', 'Success');
     this.ngxService.stop();
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    });
  }
/*
  async getOnlineKiosk(){
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.kioskService.getOnlineKiosks())
    .toPromise()
    .then((res) => {
      console.log(res)
     this.onlineKiosk= res;
     this.kioskEnable= this.onlineKiosk.length
      console.log('Enable kiosk: ', this.kioskEnable)
     this.toastr.success('Kiosk', 'Success');
     this.ngxService.stop();
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    });
  }

  async getOfflineKiosk(){
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.kioskService.getOfflineKiosks())
    .toPromise()
    .then((res) => {
      console.log(res)
     this.offlineKiosk= res;
     this.kioskDisable= this.offlineKiosk.length
     console.log('Disable kiosk: ', this.kioskDisable)

     this.toastr.success('Kiosk', 'Success');
     this.ngxService.stop();
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    });
  } */

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

  async GetLatestTransactions(){
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.transaction.getAllTransactions(10))
    .toPromise()
    .then((res) => {
     this.latestTransactions= res.data;
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    });

  }
}

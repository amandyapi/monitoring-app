import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TransactionModel } from 'src/app/models/transaction.model';
import { TransactionData } from 'src/app/models/transactionData.model';
import { TransactionService } from 'src/app/services/transaction.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './pricing.component.html',
  styleUrls:['./pricing.component.css']
})
export class PricingComponent {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  allTransactions: TransactionData;
  latestTransactions: TransactionModel[];
  transactionsTotal: number= 0;
  transactionsSuccess: number= 0;
  transactionsFailed:number= 0;
  transactionsHold:number= 0;
  currentTrasaction: any;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private transaction: TransactionService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) {
  }

  async ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
    };

    this.currentTrasaction = {
      operationRef: "",
      clientCode: "",
      clientAccount: "",
      creditAccount: "",
      amount: 0,
      serviceName: "",
      created: "",
      kioskName: "",
      status: "",
      billetage: {
        note_10000: "",
        note_5000: "",
        note_2000: "",
        note_1000: ""
      }
    }

    setTimeout(function () {
      $(function () {
        $('#transactions').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'csv', 'excel', 'pdf'
            ]
        });
      });
    }, 3000);

    //await this.GetAllTransactions();
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
      this.dtTrigger.next();
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setCurrentTransaction(transaction){
    this.currentTrasaction = {
      operationRef: "",
      clientCode: "",
      clientAccount: "",
      creditAccount: "",
      amount: 0,
      serviceName: "",
      created: "",
      kioskName: "",
      status: "",
      billetage: {
        note_10000: "",
        note_5000: "",
        note_2000: "",
        note_1000: ""
      }
    }

    this.currentTrasaction = {
      operationRef: transaction.operationRef,
      clientCode: transaction.clientCode,
      clientAccount: transaction.clientAccount,
      creditAccount: transaction.creditAccount,
      amount: transaction.amount,
      serviceName: transaction.service.name,
      created: transaction.created,
      kioskName: transaction.kiosk.name,
      status: transaction.status,
      billing: {
        note_10000: transaction.note_10000,
        note_5000: transaction.note_5000,
        note_2000: transaction.note_2000,
        note_1000: transaction.note_1000
      }
    }
  }

  GetTransaction(id){

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

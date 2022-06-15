import { Component } from '@angular/core';
import { KioskModel } from 'src/app/models/kiosk.model';
import { KioskService } from 'src/app/services/kiosk.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  kioskList: KioskModel[];
  kioskTotal: number= 0;
  onlineKiosk: number = 0;
  offlineKiosk: number= 0;

  currentKiosk: any = {

  };

  billing: any = {
    Note_10000: 0,
    Note_5000: 0,
    Note_2000: 0,
    Note_1000: 0
  };

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private kioskService: KioskService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService

  ){

  }
  ngOnInit(){
    setTimeout(function () {
      $(function () {
        $('#kiosks').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'csv', 'excel', 'pdf'
            ]
        });
      });
    }, 3000);
  }

  ngAfterViewInit() {
    this.getKiosksList();
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

  async getKiosksDetails(kioskId){
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.kioskService.getKioskDetails(kioskId))
    .toPromise()
    .then((res) => {
      let bill = res as any;

      this.billing = {
        Id: bill.id,
        ClientId: bill.clientId,
        Note_10000: bill.note_10000,
        Note_5000: bill.note_5000,
        Note_2000: bill.note_2000,
        Note_1000: bill.note_1000
      }
      this.ngxService.stop();
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    });
  }

 async updateKioskBilling(){
    console.log('New Billing', this.billing);
    //return false;
    this.modalService.dismissAll();
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.kioskService.updateKioskDetails(this.billing))
    .toPromise()
    .then((res) => {
      console.log('Update result', res);
      this.ngxService.stop();
      this.toastr.success('Mise à jour du billetage', 'Success');
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    });
  }

  setCurrentKiosk(kiosk){
    console.log('Guichet', kiosk);

    this.currentKiosk = {
      Id: kiosk.id,
      ExtId: kiosk.extId,
      Name: kiosk.name,
      Enable: kiosk.enable,
      InputDate: kiosk.inputDate,
      Removed: kiosk.removed,
      ConfigId: kiosk.configId,
      PointType: kiosk.pointType,
      ClientId: kiosk.clientId,
      Adress: kiosk.address,
      TimeZoneName: kiosk.timeZoneName,
      AutoDaylightTime: kiosk.autoDaylightTime,
      GroupId: kiosk.groupId,
      PointsCassettes: [],
      PointsMonitorings: [],
      Billing: {
        Note_10000: 0,
        Note_5000: 0,
        Note_2000: 0,
        Note_1000: 0
      }
    };

    let PointsCassettes = [];
    let PointsMonitorings = [];

    kiosk.pointsCassettes.forEach(elt => {
      PointsCassettes.push({
            TotalCashInput: elt.totalCashInput,
            TotalCashOutput: elt.totalCashOutput,
            OutputCassetteCapacity: elt.outputCassetteCapacity,
            OutputCassetteCount: elt.outputCassetteCount,
            InputCassetteCapacity: elt.inputCassetteCapacity,
            InputCassetteCount: elt.inputCassetteCount
      });
    });

    kiosk.pointsMonitorings.forEach(elt => {
      PointsMonitorings.push({
            Id: elt.id,
            LastActive: elt.lastActive,
            State: elt.state,
            VersionLogic: elt.versionLogic,
            VersionFlash: elt.versionFlash,
            VersionService: elt.versionService,
            PrinterLenta: elt.printerLenta,
            CashcodeStatus: elt.cashcodeStatus,
            Online: elt.online,
            Metka: elt.metka,
            MsgCount: elt.msgCount,
            PaymentDate: elt.paymentDate,
            NoteDate: elt.noteDate,
            NoteFinishedDate: elt.noteFinishedDate,
            Status: elt.status,
            BlockReason: elt.blockReason,
            StateDate: elt.stateDate,
            ErrorDevices: elt.errorDevices,
            AllDevicesErrors: elt.allDevicesErrors,
            NotIgnoredDevicesErrors: elt.notIgnoredDevicesErrors,
            ServerId: elt.serverId,
      });
    });
    this.currentKiosk.PointsCassettes = PointsCassettes;
    this.currentKiosk.PointsMonitorings = PointsMonitorings;
  }

  open(content) {
    console.log('modal openend');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

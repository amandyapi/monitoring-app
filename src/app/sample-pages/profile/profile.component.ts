import { Component } from '@angular/core';
import { KioskModel } from 'src/app/models/kiosk.model';
import { KioskService } from 'src/app/services/kiosk.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  kioskList: KioskModel[];
  kioskTotal: number= 0;
  onlineKiosk: number = 0;
  offlineKiosk: number= 0;
  constructor(
    private kioskService: KioskService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService

  ){

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


}

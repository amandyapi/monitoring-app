import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceModel } from 'src/app/models/service.model';

@Component({
  templateUrl: 'invoice.component.html'
})
export class InvoiceComponent {

  servicesList: ServiceModel[]
  constructor(
    private services: ServicesService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) {

    }

  async ngAfterViewInit() {
    await this.getServicesList();
   }
  async getServicesList(){
    this.ngxService.start();
    this.toastr.info('Traitement en cours', 'Info');
    (await this.services.getServicesList())
    .toPromise()
    .then((res) => {
      console.log(res)
     this.servicesList= res.data;
     this.toastr.success('Services', 'Success');
     this.ngxService.stop();
    })
    .catch((err) => {
      this.ngxService.stop();
      console.warn('une erreur', err)
      this.toastr.error(err.error, 'Erreur');
    }); 
  }

  
  
}

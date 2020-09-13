import { Component, OnInit , ViewChild , OnDestroy,} from '@angular/core';
import {DataService} from '../data.service'
import {Subject} from 'rxjs'
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  vehicles:any
  isLoading:boolean = true;
  company_id : string
  company_name : string
  modalRef:BsModalRef
  
  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private notifier:NotifierService,private modalService:BsModalService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.company_id = params['id'];
      this.company_name = params['name']
      this.dataService.getVehiclesOfCompany(this.company_id).subscribe(data => {
        this.vehicles = data
        this.dtTrigger.next()
        this.isLoading = false;
      });
    })
    
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getVehicles(){
    this.dataService.getVehiclesOfCompany(this.company_id).subscribe(data => {
        this.vehicles = data
        this.vehicles = data
        this.rerender()
        this.isLoading = false
     })
  }

  disableVehicles(id:number,name:string){
    this.isLoading = true
    this.dataService.disableVehicle(id).subscribe(data=> {
    console.log(data)
    this.notifier.show({
      type: 'warning',
      message: name +' Vehicles  disabled successfully',
     });
    this.getVehicles()
    })
}

enableVehicles(id: number,name:string) {
   this.isLoading = true
   this.dataService.enableVehicle(id).subscribe(data => {
    console.log(data)
    this.notifier.show({
      type: 'success',
      message: name+' Vehicles  enabled successfully',

    });
    this.getVehicles()
  })
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}
openModal(Vehicle_disable_modal) {
  this.modalRef = this.modalService.show(Vehicle_disable_modal);
}

}

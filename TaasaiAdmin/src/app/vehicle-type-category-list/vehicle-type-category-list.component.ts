import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'


@Component({
  selector: 'app-vehicle-type-category-list',
  templateUrl: './vehicle-type-category-list.component.html',
  styleUrls: ['./vehicle-type-category-list.component.css']
})
export class VehicleTypeCategoryListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  name:string
  vehicleCategories:any
  isLoading:boolean=true;
  modalRef:BsModalRef;
  
  constructor(private router:Router,private dataService: DataService,private notifier: NotifierService,private modalService:BsModalService) { }

  ngOnInit() {
    
    this.dataService.getVehicleTypeCategories().subscribe(data => {
      this.vehicleCategories = data
      this.dtTrigger.next()
      console.log(this.vehicleCategories)
      this.isLoading=false;
      });
  }

  getVehicleTypeCategories(){
    this.dataService.getVehicleTypeCategories().subscribe(data => {
      this.vehicleCategories = data
      this.rerender()
      this.isLoading = false
      console.log(this.vehicleCategories)
    });
  }
  navigateToTypeList(id:number,name:string){
    this.router.navigate(["admin/vehicletypecategory/types/" + id+"/"+name])
  }

  navigateToEdit(id: number, name: string) {
    this.router.navigate(["admin/vehicletypecategory/edit/" + name + "/" + id])
  }
  disablevehicleCategory(id:number,name:string){
    this.isLoading = true
    this.dataService.disableVehicleTypeCategory(id).subscribe(data=> {
    this.notifier.show({
      type: 'warning',
      message: name +' VehicleType disabled successfully',
    });
    this.getVehicleTypeCategories()
    })
  }

  enablevehicleCategory(id: number,name:string) {
    this.isLoading = true
    this.dataService.enableVehicleTypeCategory(id).subscribe(data => {
    this.notifier.show({
      type: 'success',
      message: name +' VehicleType enabled successfully',
    });
    this.getVehicleTypeCategories()
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
  openModal(VehicleCategory_disable_modal) {
    this.modalRef = this.modalService.show(VehicleCategory_disable_modal);
  }

}

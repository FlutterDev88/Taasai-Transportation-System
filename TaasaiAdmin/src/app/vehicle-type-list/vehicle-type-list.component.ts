import { Component, OnInit , ViewChild , OnDestroy,} from '@angular/core';
import {DataService} from '../data.service'
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal'
@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html',
  styleUrls: ['./vehicle-type-list.component.css']
})
export class VehicleTypeListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  vehicletypes:any;
  isLoading:boolean =true;
  category_id:string
  category_name:string
  modalRef:BsModalRef


  constructor(private activatedRoute:ActivatedRoute,private router:Router,private dataService:DataService,private notifier:NotifierService,private modalService:BsModalService) { }

 
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.category_id = params['id'];
      this.category_name = params['name'];
      this.dataService.getVehicleTypes(this.category_id).subscribe(data => {
        this.vehicletypes = data
        this.dtTrigger.next()
        this.isLoading = false;
      })
    });

    
  }
  navigateToEdit(id: number, name: string) {
    this.router.navigate(["admin/vehicletypecategory/types/"+this.category_id+"/"+this.category_name+"/edit/" + name + "/" + id])
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getVehicleTypes(){
    this.dataService.getVehicleTypes(this.category_id).subscribe(data => {
        this.vehicletypes = data
        this.vehicletypes = data
        this.rerender()
        this.isLoading = false
     })
  }

  disableVehicleTypes(id:number,name:string){
      this.isLoading = true
      this.dataService.disableVehicleTypes(id).subscribe(data=> {
      console.log(data)
      this.notifier.show({
        type: 'warning',
        message: name +' Vehicle Types disabled successfully',
       });
      this.getVehicleTypes()
      })
  }

  enableVehicleTypes(id: number,name:string) {
     this.isLoading = true
     this.dataService.enableVehicleTypes(id).subscribe(data => {
      console.log(data)
      this.notifier.show({
        type: 'success',
        message: name+' Vehicle Types enabled successfully',

      });
      this.getVehicleTypes()
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
  openModal(VehicleType_disable_modal) {
    this.modalRef = this.modalService.show(VehicleType_disable_modal);
  }

}

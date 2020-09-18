import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit,OnDestroy {
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  isAdmin = false;

  locations:any;
  isLoading=true;
  modalRef: BsModalRef;

  constructor(private router:Router,private authenticationService: AuthService,private dataService: DataService,private notifier: NotifierService,private modalService: BsModalService) {
    const currentUser = this.authenticationService.currentUserValue;

    this.isAdmin = currentUser.IsAdmin;
  }

  ngOnInit() {
      this.dtOptions = {
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [
          'copy',
          'print',
          'excel'
        ],
        
      }
    this.dataService.getLocations().subscribe(data => {
      this.locations = data
      this.dtTrigger.next()
      this.isLoading = false;
    })
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getLocations(){
    this.dataService.getLocations().subscribe(data => {
      this.locations = data
      this.rerender()
      this.isLoading = false
    })
  }
  navigateToFareList(id:number,name:string,currency:string){
    this.router.navigate(["admin/locations/fares/"+id+"/"+name+"/"+currency])
  }
  navigateToEdit(id:number,name:string,currency:string){
    this.router.navigate(["admin/editOperator/"+id+"/"+name])
  }

  navigateToZoneList(id: number, name: string) {
    this.router.navigate(["admin/locations/zones/" + id + "/" + name])
  }
  disableLocation(id:number,name:string){
    this.isLoading = true
    this.dataService.disableLocation(id).subscribe(data=> {
      console.log(data)
      this.notifier.show({
        type: 'warning',
        message: name +' Location disabled successfully',
      });
      this.getLocations()
    })
  }
  enableLocation(id: number,name:string) {
    this.isLoading = true
    this.dataService.enableLocation(id).subscribe(data => {
      console.log(data)
      this.notifier.show({
        type: 'success',
        message: name+' Location enabled successfully',

      });
      this.getLocations()
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

  openModal(location_disable_modal) {
    this.modalRef = this.modalService.show(location_disable_modal);
  }
}

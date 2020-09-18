import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  drivers: any;
  isLoading = true;
  modalRef: BsModalRef;

  constructor(private dataService: DataService, private notifier: NotifierService,
              private activatedRoute: ActivatedRoute, private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.dataService.GetDrivers().subscribe(data => {
      this.drivers = data;
      this.dtTrigger.next();
      this.isLoading = false;
    });
  }

  getDocStatus(isProfileCompleted: boolean) {
    let value = 'Submitted';
    if (!isProfileCompleted) {
       value = 'Not Submitted';
     }
    return value;
  }

  getDrivers() {
    this.dataService.GetDrivers().subscribe(data => {
      this.drivers = data;
      this.rerender();
      this.isLoading = false;
    });
  }


  disableDriver(id: number, name: string) {
   this.isLoading = true;
   this.dataService.disableDriver(id).subscribe(data => {
      console.log(data);
      this.notifier.show({
        type: 'warning',
        message: name + ' Driver disabled successfully',
      });
      this.getDrivers();
    });
  }
  enableDriver(id: number, name: string) {
    this.isLoading = true;
    this.dataService.enableDriver(id).subscribe(data => {
      console.log(data);
      this.notifier.show({
        type: 'success',
        message: name + ' Driver enabled successfully',

      });
      this.getDrivers();
    });

  }
  navigateToVehicleAssignments(id: number, name: string) {
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  openModal(driver_disable_modal) {
    this.modalRef = this.modalService.show(driver_disable_modal);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

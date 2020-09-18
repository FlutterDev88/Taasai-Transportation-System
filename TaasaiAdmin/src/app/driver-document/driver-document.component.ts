import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {DataService} from '../data.service';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-driver-document',
  templateUrl: './driver-document.component.html',
  styleUrls: ['./driver-document.component.css']
})
export class DriverDocumentComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  docs: any;
  isLoading = true;
  modalRef: BsModalRef;

  name = "";
  constructor(private dataService: DataService, private notifier: NotifierService,
              private activatedRoute: ActivatedRoute, private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.dataService.getOperatorDocs().subscribe(data => {
      this.docs = data;
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
  createDoc() {
    this.isLoading = true;
    this.dataService.addOperatorDoc(this.name).subscribe(data => {
      console.log(data);
      this.notifier.show({
        type: 'warning',
        message: name + ' Driver Doc Added successfully',
      });
      this.getDrivers();
    });
  }

  getDrivers() {
    this.dataService.getOperatorDocs().subscribe(data => {
      this.docs = data;
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

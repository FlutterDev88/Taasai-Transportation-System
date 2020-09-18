import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NotifierService } from 'angular-notifier';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  companies: any;
  isLoading = true;
  modalRef:BsModalRef

  constructor(private router: Router, private dataService: DataService, private notifier: NotifierService,private modalService:BsModalService) { }

  ngOnInit() {
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    }
    this.dataService.getCompanies().subscribe(data => {
      this.companies = data
      this.dtTrigger.next()
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getCompanies() {
    this.dataService.getCompanies().subscribe(data => {
      this.companies = data
      this.rerender()
      this.isLoading = false
    })
  }
  navigateToDriverList(id: number, name: string) {
    this.router.navigate(["admin/companies/" + id + "/" + name + "/drivers"])
  }

  navigateVehicleList(id: number, name: string) {
    this.router.navigate(["admin/companies/" + id + "/" + name +"/vehicles"])
  }
  disableCompany(id: number, name: string) {
    this.isLoading = true
   this.dataService.disableCompany(id).subscribe(data => {
      console.log(data)
      this.notifier.show({
        type: 'warning',
        message: name + ' Company disabled successfully',
      });
      this.getCompanies()
    })
  }
  enableCompany(id: number, name: string) {
    this.isLoading = true
    this.dataService.enableCompany(id).subscribe(data => {
      console.log(data)
      this.notifier.show({
        type: 'success',
        message: name + ' Company enabled successfully',

      });
      this.getCompanies()
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
  openModal(company_disable_modal) {
    this.modalRef = this.modalService.show(company_disable_modal);
  }
}

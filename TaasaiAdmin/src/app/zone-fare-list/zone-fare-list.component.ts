import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { NotifierService } from 'angular-notifier';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-zone-fare-list',
  templateUrl: './zone-fare-list.component.html',
  styleUrls: ['./zone-fare-list.component.css']
})
export class ZoneFareListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  location_id: number
  location_name: string
  fares: any
  isLoading: boolean = true;
  modalRef: BsModalRef;

  constructor(private activatedRouter: ActivatedRoute,private router:Router, private dataService: DataService, private notifier: NotifierService,private modalService: BsModalService) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.location_id = +params['id'];
      this.location_name = params['name'];
      this.dataService.getZoneFares(this.location_id).subscribe(data => {
        this.fares = data
        this.dtTrigger.next()
        this.isLoading = false;
      });
    });


  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  

  getFares() {
    this.dataService.getZoneFares(this.location_id).subscribe(data => {
      this.fares = data
      this.rerender()
      this.isLoading = false;
    })
  }
  disableFare(id: string, name: string) {
    console.log(id)
    this.isLoading = true
    this.dataService.disableZoneFare(id).subscribe(data => {
      console.log(data)
      this.notifier.show({
        type: 'warning',
        message: name + ' Fare  disabled successfully',
      });
      this.getFares()
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
  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }
}

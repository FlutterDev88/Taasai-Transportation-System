import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { NotifierService } from 'angular-notifier';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private notifier:NotifierService,private dataService:DataService,private modalService:BsModalService) { }
  location_id:string
  location_name:string
  zones:any
  isLoading = true;
  modalRef:BsModalRef
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.location_id = params['id'];
      this.location_name = params['name']
        this.dataService.getZones(this.location_id).subscribe((result:any)=>{
            this.zones = result
            this.dtTrigger.next()
            this.isLoading = false
        })
    });
  }
  disableZone(id: number, name: string) {
    this.isLoading = true
    this.dataService.disableZone(id).subscribe(data => {
      console.log(data)
      this.notifier.show({
        type: 'warning',
        message: name + ' Location disabled successfully',
      });
      this.dataService.getZones(this.location_id).subscribe((result: any) => {
        this.zones = result
        this.rerender()

        this.isLoading = false

      })
    })
  }
  enableZone(id: number, name: string) {
    this.isLoading = true
    this.dataService.enableZone(id).subscribe(data => {
      console.log(data)
      this.notifier.show({
        type: 'success',
        message: name + ' Location enabled successfully',

      });
      this.dataService.getZones(this.location_id).subscribe((result: any) => {
        this.zones = result
        this.rerender()

        this.isLoading = false

      })
    })
  }
  navigateToZoneFareList(id: number, name: string) {
    this.router.navigate(["admin/locations/zones/" + id + "/" + name+"/fares"])
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  openModal(Zone_disable_modal) {
    this.modalRef = this.modalService.show(Zone_disable_modal);
  }
  
}

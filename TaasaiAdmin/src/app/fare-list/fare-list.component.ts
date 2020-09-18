import { Component, OnInit , ViewChild , OnDestroy,} from '@angular/core';
import {DataService} from '../data.service'
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-fare-list',
  templateUrl: './fare-list.component.html',
  styleUrls: ['./fare-list.component.css']
})
export class FareListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  location_id:number
  location_name:string
  location_currency:string
  fares:any
  isLoading:boolean = true;
  modalRef: BsModalRef;

  constructor(private router:ActivatedRoute, private navRouter: Router,private dataService:DataService,private notifier:NotifierService,private modalService: BsModalService ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.location_id = +params['id'];
      this.location_name = params['name'];
      this.location_currency = params['currency'];
      this.dataService.getFares(this.location_id).subscribe(data => {
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
  getFares(){
    this.dataService.getFares(this.location_id).subscribe(data => {
        this.fares = data
        this.rerender()
        this.isLoading = false;
     })
  }
  disableFare(id:string,name:string,template){
    console.log(id)
    this.isLoading = true
    this.dataService.disableFare(id).subscribe(data=> {
    console.log(data)
    this.notifier.show({
      type: 'warning',
      message: name +' Fare  deleted successfully',
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
  navigateToEdit(){
    this.navRouter.navigate(['admin/locations/editfares/' + this.location_id + '/' + this.location_name ]);
  }
  openModal(Fare_disable_modal) {
    this.modalRef = this.modalService.show(Fare_disable_modal);
  }
  }

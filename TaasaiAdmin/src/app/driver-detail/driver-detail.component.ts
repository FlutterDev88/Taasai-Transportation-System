import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {

  ride: any;
  details: any;
  driverId: any;
  docDetails = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private notifier: NotifierService, private router: Router) { }

  getDocStatus(isProfileCompleted: boolean) {
    let value = 'Submitted';
    if (!isProfileCompleted) {
      value = 'Not Submitted';
    }
    return value;
  }

  disableDriver() {
    this.dataService.disableDriver(this.details.DriverDetails.ID).subscribe(data => {
      console.log(data);
      this.notifier.show({
        type: 'warning',
        message: this.details.DriverDetails.Name + ' Driver disabled successfully',
      });
      this.getDetails();
    });
  }

  enableDriver() {
    this.dataService.enableDriver(this.details.DriverDetails.ID).subscribe(data => {
      console.log(data);
      this.notifier.show({
        type: 'success',
        message: this.details.DriverDetails.Name + ' Driver Approved successfully',

      });
      this.getDetails();
    });

  }

  getApprovalStatus(isActive: boolean) {
    let value = 'Approved';
    if (!isActive) {
      value = 'Not Approved';
    }
    return value;
  }
  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.driverId = params.id;
      this.getDetails();
    });
  }

  getDetails() {
    this.dataService.getDriverDetails(this.driverId).subscribe((data: any) => {
      this.details = data;

      data.DocsRequired.forEach((item) => {
        const docData = {
          Document: {},
          UploadedDocument: {},
        };
        docData.Document = item;

        data.UploadedDocs.forEach((uploadedDoc) => {
          if (uploadedDoc.DocID === item.ID) {
            docData.UploadedDocument = uploadedDoc;
          }
        });

        this.docDetails.push(docData);
      });

      console.log(this.details);
    });
  }
  getStatusColor(id: number) {
    const status = ['#e67e22', '#3498db', '#2980b9', '#2ecc71', '#1abc9c', '#d35400', '#e74c3c'];
    return status[id];
  }
}

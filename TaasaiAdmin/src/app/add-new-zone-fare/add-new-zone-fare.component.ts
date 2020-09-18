import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-new-zone-fare',
  templateUrl: './add-new-zone-fare.component.html',
  styleUrls: ['./add-new-zone-fare.component.css']
})
export class AddNewZoneFareComponent implements OnInit {

  public location_id: string;
  location_name: string;
  location_currency: string;
  public vehicle_type_id: string;
  public base_fare: number;
  public minimum_fare: number;
  public distance_fare: number;
  public duration_fare: number;
  public trafficFactor: number;
  public cancellationTimeLimit: number;
  public cancellationFee: number;
  public waitingTimeLimit: number;
  public waitingFee: number;
  public tax: number;
  isLoading = true;
  getlocations: any;
  locations: any;
  vehicletypes: any;

  fareForm: FormGroup;
  submitted = false;


  constructor(private dataService: DataService, private router: Router, private activetedRoute: ActivatedRoute, private formBuilder: FormBuilder, private notifier: NotifierService) { }

  ngOnInit() {
    this.fareForm = this.formBuilder.group({
      vehicle_type_id: ['', Validators.required],
      base_fare: ['', Validators.required],
      minimum_fare: ['', Validators.required],
      cancellationTimeLimit: ['', Validators.required],
      waitingTimeLimit: ['', Validators.required],
      cancellationFee: ['', Validators.required],
      waitingFee: ['', Validators.required],
      distance_fare: ['', Validators.required],
      duration_fare: ['', Validators.required],
      Tax: ['', Validators.required],
      trafficFactor: ['', Validators.required],
    });

    this.activetedRoute.params.subscribe(params => {
      this.location_id = params.id;
      this.location_name = params.name;
      this.onLocationSelected(this.location_id);
    });


  }

  onLocationSelected(location_id: string) {
    this.isLoading = true;
    this.dataService.getUnAssignedVehicleTypeForZone(Number(location_id)).subscribe(data => {
      console.log(data);
      this.vehicletypes = data;
      console.log(this.vehicletypes);
    });
  }

  get f() {
    return this.fareForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.fareForm.invalid) {
      return;
    }
    this.dataService.addNewZoneFare(
        this.location_id, this.vehicle_type_id,
        this.base_fare, this.minimum_fare,
        this.duration_fare, this.distance_fare,
        this.waitingTimeLimit, this.waitingFee,
        this.cancellationTimeLimit, this.cancellationFee,
        this.tax, this.trafficFactor
    ).subscribe((data: any) => {
      console.log(data.Message);
      if (data.Status) {
        this.notifier.show({
          type: 'success',
          message: data.Message,

        });
        this.router.navigate(['admin/locations/zones/' + this.location_id + '/' + this.location_name + '/fares']);
      } else {
        this.notifier.show({
          type: 'error',
          message: data.Message,
        });
      }
    });
  }
  onCancel() {
    this.router.navigate(['admin/locations/zones/' + this.location_id + '/' + this.location_name + '/fares']);
  }
}

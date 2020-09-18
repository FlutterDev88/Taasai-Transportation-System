import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-edit-fare',
  templateUrl: './edit-fare.component.html',
  styleUrls: ['./edit-fare.component.css']
})
export class EditFareComponent implements OnInit {
  public location_id: string;
  public fare_id: number;
  location_name: string;
  location_currency: string;
  public vehicle_type_id: string;
  public vehicle_type: string;
  public base_fare: number;
  public minimum_fare: number;
  public distance_fare: number;
  public duration_fare: number;
  public trafficFactor: number;
  public cancellationTimeLimit: number;
  public cancellationFee: number;
  public waitingTimeLimit: number;
  public waitingFee: number;
  public Tax: number;
  isLoading = true;
  getlocations: any;
  locations: any;
  vehicletypes: any;

  fareForm: FormGroup;
  submitted = false;

  constructor(private dataService: DataService, private router: Router, private activetedRoute: ActivatedRoute, private formBuilder: FormBuilder, private notifier: NotifierService) {

  }

  ngOnInit() {
    this.fareForm = this.formBuilder.group({
      vehicle_type: ['', Validators.required],
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

      this.dataService.getFareByID(this.location_id).subscribe((data: any) => {
        console.log(data);
        this.fare_id = data.ID;
        this.vehicle_type = data.VehicleTypeName;
        this.base_fare = data.BaseFare;
        this.minimum_fare = data.MinimumFare;
        this.cancellationTimeLimit = data.CancellationTimeLimit;
        this.waitingTimeLimit = data.WaitingTimeLimit;
        this.cancellationFee = data.CancellationFee;
        this.waitingFee = data.WaitingFee;
        this.distance_fare = data.DistanceFare;
        this.duration_fare = data.DurationFare;
        this.Tax = data.Tax;
        this.trafficFactor = data.TrafficFactor;
      });

    });


  }

  onLocationSelected(location_id: string) {
    this.isLoading = true;
    this.dataService.LocationSelected(Number(location_id)).subscribe(data => {
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
    this.dataService.editFare(
        this.fare_id,
        this.base_fare, this.minimum_fare,
        this.duration_fare, this.distance_fare,
        this.waitingTimeLimit, this.waitingFee,
        this.cancellationTimeLimit, this.cancellationFee,
        this.Tax, this.trafficFactor
    ).subscribe((data: any) => {
      console.log(data.Message);
      if (data.Status) {
        this.notifier.show({
          type: 'success',
          message:  data.Message,

        });
        this.router.navigate(['admin/locations/fares/' + this.location_id + '/' + this.location_name + '/$']);
      } else {
        this.notifier.show({
          type: 'error',
          message: data.Message,
        });
      }
    });
  }
  onCancel() {
    this.router.navigate(['admin/locations/fares/' + this.location_id + '/' + this.location_name + '/$']);
  }
}

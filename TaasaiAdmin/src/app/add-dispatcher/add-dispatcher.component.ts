import { Component, OnInit ,ViewChild, ɵConsole} from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { AgmMap } from '@agm/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dispatcher',
  templateUrl: './add-dispatcher.component.html',
  styleUrls: ['./add-dispatcher.component.css']
})
export class AddDispatcherComponent implements OnInit {

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  @ViewChild(AgmMap) map: any;

  dispatcherForm:FormGroup;
  location:object
  lat:number=0;
  lng:number=0;
  pickup_lat:string;
  pickup_lng:string
  drop_lat:string;
  drop_lng:string;
  origin:any;
  destination:any;
  name:string;
  pickup_location = false;
  drop_location = false ;
  location_direction =false;
  submitted = false;

  constructor(private dataservice:DataService,private router:Router,private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.dispatcherForm = this.formbuilder.group({
      name :['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required]],
      pickup_address:['',[Validators.required]],
      drop_address:['',[Validators.required]],
      schedule_time:['',[Validators.required]],
      service_type:['',Validators.required]


    });
  }
  pickupAddress(address:any){
    this.pickup_location =true;
    this.pickup_lat = address.geometry.location.lat()
    console.log(this.pickup_lat)
    this.pickup_lng = address.geometry.location.lng()
    console.log(this.pickup_lng)
    parseFloat(this.pickup_lat);
    parseFloat(this.pickup_lng);
    this.origin = { lat: this.pickup_lat, lng: this.pickup_lng };
  }

  dropAddress(address:any){
    this.drop_location = true;
    this.location_direction = true;
    this.drop_lat = address.geometry.location.lat()
    console.log(this.drop_lat)
    this.drop_lng = address.geometry.location.lng()
    console.log(this.drop_lng)
    parseFloat(this.drop_lat);
    parseFloat(this.drop_lng);
    this.destination = { lat:  this.drop_lat, lng: this.drop_lng };
  }

  get f(){
    return this.dispatcherForm.controls;
  }
  onSubmit(){
    this.submitted =true;

    if(this.dispatcherForm.invalid){
      return;
    }
  }
}

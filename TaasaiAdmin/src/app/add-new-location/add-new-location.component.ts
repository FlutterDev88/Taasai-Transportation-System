import { Component, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { AgmMap } from '@agm/core';
import { LatLng } from '../_models/LatLng';
import { DataService } from '../data.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { isError } from 'util';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.css']
})
export class AddNewLocationComponent implements OnInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild(AgmMap) map: any;
  locationForm: FormGroup;
  submitted = false;
  polygon: any;
  latitude: number;
  longitude: number;
  name: string;
  locationName: string;
  currency: string;
  address: string;
  email: string;
  platformCommission: number;
  referAmount: number;
  operatorCommission: number;
  driverWorkTime: number;
  driverRestTime: number;
  password: string;
  confirmPassword: string;
  distance: number = 10 * 1000;
  paths: Array<any> = [];
  docsCount = 0;
  constructor(private dataService: DataService, private router: Router,
              private formBuilder: FormBuilder, private notifier: NotifierService) { }

  public handleAddressChange(address: any) {
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.paths = [];
    for (let i = 0; i < 360; i = i + 45) {
      this.paths.push(this.createCoordinate(i));
    }
    if (this.polygon == null) {
      this.map._mapsWrapper.createPolygon({
        paths: this.paths,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.3,
        editable: true,
      }).then((polygon: any) => {
        this.polygon = polygon;
      });
    } else {
      this.polygon.setPath(this.paths);
    }


  }

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
        address : ['', Validators.required],
        name: ['', Validators.required],
        locationName: ['', Validators.required],
        currency: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.required],
        platformCommission: ['', Validators.required],
      referAmount: ['', Validators.required],
        operatorCommission: ['', Validators.required],
        driverWorkTime: ['', Validators.required],
        driverRestTime: ['', Validators.required],
        docsCount: ['', Validators.required],
        docs: this.formBuilder.array([]),
    });

  }


  get f() {
    return this.locationForm.controls;
  }

  onDocsCountChange(value) {
    this.locationForm.setControl('docs', this.formBuilder.array([]));
    const fa = (this.locationForm.get('docs')as FormArray);
    for (let i = 0; i < Number(value); i++) {
      fa.push(this.formBuilder.group({
        Name: ['', Validators.required]
      }));
    }
  }

  createCoordinate(bearing) {
      const radius = 6371e3; // meters
      const δ = Number(this.distance) / radius; // angular distance in radians
      const θ = this.toRad(Number(bearing));
      const φ1 = this.toRad(this.latitude);
      const λ1 = this.toRad(this.longitude);

      const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));

      let λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));

      λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalise to -180..+180°

      return {lng: this.toDeg(λ2), lat: this.toDeg(φ2)}; // [lon, lat]
  }

  toDeg(value: number) { return value * 180 / Math.PI; }

  toRad(value: number) { return value * Math.PI / 180; }

  onSubmit() {
    this.submitted = true;
    console.log((this.locationForm.get('docs')as FormArray).getRawValue());
    if (this.locationForm.invalid) {
      return;
    }

    console.log('address =' + this.f.address.value);
    console.log('address =' + this.f.name.value);
    console.log('address =' + this.f.currency.value);


    let path: Array<LatLng>;
    path = this.polygon.getPath();

    const polygonPoints = [];
    path.forEach(element => {
      polygonPoints.push({Lat: element.lat(), Lng: element.lng()});
    });
    polygonPoints.push(polygonPoints[0]);

    this.dataService.addNewOperator(polygonPoints, this.currency, this.name, this.email,
        this.locationName, this.platformCommission, this.operatorCommission,
        this.driverWorkTime, this.driverRestTime, (this.locationForm.get('docs')as FormArray).getRawValue(),
        this.password, this.confirmPassword, this.referAmount).subscribe((data: any) => {
      if (data.Status) {
        this.notifier.show({
          type: 'success',
          message: this.name + ' ' + data.Message,

        });
        this.router.navigate(['admin/locations']);
      } else {
        this.notifier.show({
          type: 'error',
          message: data.Message,

        });
      }
    });
  }
  onCancel() {
    this.router.navigate(['admin/locations']);
  }

}

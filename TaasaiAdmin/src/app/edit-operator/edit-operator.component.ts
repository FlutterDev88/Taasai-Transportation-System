import {Component, OnInit, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {AgmMap} from '@agm/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {LatLng} from '../_models/LatLng';

@Component({
  selector: 'app-edit-operator',
  templateUrl: './edit-operator.component.html',
  styleUrls: ['./edit-operator.component.css']
})
export class EditOperatorComponent implements OnInit {
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
  operatorCommission: number;
  driverWorkTime: number;
  driverRestTime: number;
  password: string;
  confirmPassword: string;
  distance: number = 10 * 1000;
  paths: Array<any> = [];
  docsCount = 0;
  operatorId = 0;
  operatorName = "";
  constructor(private dataService: DataService,private activetedRoute: ActivatedRoute, private router: Router,
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
      email: ['', Validators.required],
      platformCommission: ['', Validators.required],
      operatorCommission: ['', Validators.required],
      driverWorkTime: ['', Validators.required],
      driverRestTime: ['', Validators.required],
    });

    this.activetedRoute.params.subscribe(params => {
      this.operatorId = params.id;
      this.operatorName = params.name;

      this.dataService.getOperatorByID(""+this.operatorId).subscribe((result: any) => {
        this.address = result.LocationName;
        this.locationName = result.LocationName;
        this.name = result.Name;
        this.email = result.Email;
        this.platformCommission = result.PlatformCommission;
        this.operatorCommission = result.OperatorCommission;
        this.driverWorkTime = result.DriverWorkTime;
        this.driverRestTime = result.DriverRestTime;
        this.currency = result.Currency;
      });

      this.dataService.getCoordinates(""+this.operatorId).subscribe((result: any) => {
        var coordinatesArray = result.Coordinates.split(",")

        coordinatesArray.forEach(element => {
          var latLngArray = element.split(" ")
          var latLng = { lng: Number(latLngArray[1]), lat: Number(latLngArray[0]) }
          this.paths.push(latLng)


        });
        console.log(this.paths)

        this.map._mapsWrapper.createPolygon({
          paths: this.paths,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.20,
          editable: true,
        }).then((polygon: any) => {
          this.polygon = polygon
        });
        this.map._mapsWrapper.setCenter(this.getLatLonCenterFromGeom(this.paths))
        this.map._mapsWrapper.setZoom(10)

      });
    });




  }

  getLatLonCenterFromGeom = (coords) => {
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    const centerLat = arrAvg(coords.map(c => c.lat));
    const centerLon = arrAvg(coords.map(c => c.lng));

    if (isNaN(centerLat) || isNaN(centerLon))
      return null;
    else return { lat: centerLat, lng: centerLon };
  }
  get f() {
    return this.locationForm.controls;
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

    this.dataService.editOperator(this.operatorId,polygonPoints, this.currency, this.name, this.email,
        this.locationName, this.platformCommission, this.operatorCommission,
        this.driverWorkTime, this.driverRestTime).subscribe((data: any) => {
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

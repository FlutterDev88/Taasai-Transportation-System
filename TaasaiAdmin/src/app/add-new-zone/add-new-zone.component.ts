import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { AgmMap, LatLng, LatLngBounds } from '@agm/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-new-zone',
  templateUrl: './add-new-zone.component.html',
  styleUrls: ['./add-new-zone.component.css']
})
export class AddNewZoneComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @ViewChild(AgmMap) map: any;

  locationForm: FormGroup;
  submitted: boolean = false
  docsCount = 0;
  polygon: any;
  cityPolygon:any;
  location_id:string;
  location_name:string;
  latitude: number
  longitude: number
  name: string
  purpose: string
  addres: string
  distance: number = 2 * 1000
  paths: Array<any> = [

  ]
  cityPolygonPoints: Array<any> = []
  constructor(private activatedRoute:ActivatedRoute,private dataService: DataService, private router: Router, private formBuilder: FormBuilder, private notifier: NotifierService) { }



  public handleAddressChange(address: any) {
    this.latitude = address.geometry.location.lat()
    this.longitude = address.geometry.location.lng()
    this.paths = []
    for (var i = 0; i < 360; i = i + 45) {
      this.paths.push(this.createCoordinate(i))

    }
    if (this.polygon == null) {
      this.map._mapsWrapper.createPolygon({
        paths: this.paths,
        strokeColor: '#474787',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#2c2c54',
        fillOpacity: 0.75,
        editable: true,
      }).then((polygon: any) => {
        this.polygon = polygon
      });
    } else {
      this.polygon.setPath(this.paths)
    }


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

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      address: ['', Validators.required],
      name: ['', Validators.required],

      docsCount: ['', Validators.required],
      docs: this.formBuilder.array([]),
    });
    this.activatedRoute.params.subscribe(params => {
      this.location_id = params['id'];
      this.location_name = params['name']
      this.dataService.getCoordinates(this.location_id).subscribe((result: any) => {
        var coordinatesArray = result.Coordinates.split(",")
        

        coordinatesArray.forEach(element => {
          var latLngArray = element.split(" ")
          var latLng = { lng: Number(latLngArray[1]), lat: Number(latLngArray[0]) }
          this.cityPolygonPoints.push(latLng)
          

        });
        console.log(this.cityPolygonPoints)

        this.map._mapsWrapper.createPolygon({
          paths: this.cityPolygonPoints,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.20,
          editable: false,
        }).then((polygon: any) => {
          this.cityPolygon = polygon
        });
        this.map._mapsWrapper.setCenter(this.getLatLonCenterFromGeom(this.cityPolygonPoints))
        this.map._mapsWrapper.setZoom(10)

      })
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
    var radius = 6371e3 //meters
    var δ = Number(this.distance) / radius // angular distance in radians
    var θ = this.toRad(Number(bearing));
    var φ1 = this.toRad(this.latitude)
    var λ1 = this.toRad(this.longitude);

    var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));

    var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));

    λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalise to -180..+180°

    return { lng: this.toDeg(λ2), lat: this.toDeg(φ2) }; //[lon, lat]
  }

  toDeg(value: number) { return value * 180 / Math.PI; }

  toRad(value: number) { return value * Math.PI / 180; }

  onSubmit() {
    this.submitted = true
    if (this.locationForm.invalid) {
      return
    }

    var path: Array<LatLng>
    path = this.polygon.getPath()
    var polygonPoints = []
    path.forEach(element => {
      polygonPoints.push({ "Lat": element.lat(), "Lng": element.lng() })
    });
    polygonPoints.push(polygonPoints[0])
    this.dataService.addNewZone(polygonPoints,this.location_id,this.name,(this.locationForm.get('docs')as FormArray).getRawValue()).subscribe((result:any)=>{
      if (result.Status) {
        this.notifier.show({
          type: 'success',
          message: this.name + ' ' + result.Message,

        });
        this.router.navigate(["admin/locations/zones/" + this.location_id + "/" + this.location_name ])
      } else {
        this.notifier.show({
          type: 'error',
          message: result.Message,

        });
      }
    })
  }
  onCancel() {
    this.router.navigate(["admin/locations/zones/" + this.location_id + "/" + this.location_name ])
  }
}

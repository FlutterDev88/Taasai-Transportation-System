import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-add-new-vehicles',
  templateUrl: './add-new-vehicles.component.html',
  styleUrls: ['./add-new-vehicles.component.css']
})
export class AddNewVehiclesComponent implements OnInit {

  locationList:any
  vehicletypes:any
  isLoading:boolean =true;
  public location_id:string
  getlocations:any
  locations:any
  public vehicle_type_id:any
  public vehicle_name:string
  public vehicle_brand:any
  public vehicle_model:any
  public vehicle_number:any
  public seat_capacity:string
  public vehicle_color:any
  public image:any
  company_id:string
  company_name:string
  vehicleForm:FormGroup;
  submitted:boolean = false;
  company_assignment_id = "0"
  vehicle_image:string = "Choose vehicle image"

  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private notifier:NotifierService) { }

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        this.company_id = params['id'];
        this.company_name = params['name']
        this.dataService.getActiveLocationsForCompany(this.company_id).subscribe(data => {
          this.getlocations = data
          console.log(this.getlocations)
        });
      })
    
      this.vehicleForm = this.formBuilder.group({
        location_id:['',Validators.required],
        vehicle_type_id:['',Validators.required],
        vehicle_name:['',Validators.required],
        vehicle_brand:['',Validators.required],
        vehicle_model:['',Validators.required],
        vehicle_number:['',Validators.required],
        seat_capacity:['',Validators.required],
        vehicle_color:['',Validators.required],
        vehicleImage:['',Validators.required],
      })
  }

  onLocationSelected(location_id:string){
      this.isLoading =true;
      this.dataService.getVehicleTypesWithFare(Number(location_id)).subscribe((data:any)=> {
        this.vehicletypes=data
        //alert(this.vehicletypes.Message)
        console.log(this.vehicletypes.Message)
      });
  }

  onSelectImage(files: FileList){
      this.image = files.item(0);
      this.vehicle_image = files.item(0).name  
        
  }
  get f(){
     return this.vehicleForm.controls;
  }
  onSubmit(){
      this.submitted =true;
      if(this.vehicleForm.invalid){
        return
      }

      let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
     let formData:FormData = new FormData();
      //console.log(this.location_id,this.vehicle_type_id,this.vehicle_name,this.vehicle_brand,this.vehicle_model,this.image,this.vehicle_number,this.seat_capacity,this.vehicle_color)
        this.getlocations.forEach(element => {
          if(element.LocationID  == this.location_id){
            this.company_assignment_id = element.ID;
            console.log("company_location_assignment_id = "+this.company_assignment_id )
          }
        });  
        formData.append('location_id', this.company_assignment_id);
        formData.append('vehicle_type_id',this.vehicle_type_id);
        formData.append('name',this.vehicle_name);
        formData.append('brand',this.vehicle_brand);
        formData.append('model',this.vehicle_model);
        formData.append('image',this.image);
        formData.append('vehicle_number',this.vehicle_number);
        formData.append('seat_capacity',this.seat_capacity);
        formData.append('color',this.vehicle_color);
        
      this.dataService.addNewVehicle(formData,headers).subscribe((data:any)=>{
        console.log(data)
        if(data.Status){
          this.notifier.show({
              type: 'success',
              message: this.vehicle_name + ' ' + data.Message,
        
            });
          this.navigateVehicleList()  
        }else{
            this.notifier.show({
              type: 'error',
              message: data.Message,
        
            });
        }
      });
  }
  onCancel(){
    this.navigateVehicleList()
  }
  navigateVehicleList() {
    this.router.navigate(["admin/companies/" + this.company_id + "/" + this.company_name + "/vehicles"])
  }
}
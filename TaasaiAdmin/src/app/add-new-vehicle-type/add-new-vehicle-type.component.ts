import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {DataService} from '../data.service'
import { Router,ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-new-vehicle-type',
  templateUrl: './add-new-vehicle-type.component.html',
  styleUrls: ['./add-new-vehicle-type.component.css']
})

export class AddNewVehicleTypeComponent implements OnInit {
  title ='App works'
  vehicleForm:FormGroup;     
  submitted:boolean=false
  name:string
  description:string
  vehicle_category_id:string
  category_name:string
  activeimage: File = null;
  inactiveimage:  File = null;
  vehicleCategories:any
  inactive_image_label = "Choose Inactive Image"
  active_image_label = "Choose Active Image"
  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private router:Router,private formBuilder: FormBuilder,private notifier:NotifierService) { }

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      name :['',Validators.required],
      inactiveimage:['',Validators.required],
      activeimage:['',Validators.required],
      description:['',Validators.required]
    });
    this.activatedRoute.params.subscribe(params => {
      this.vehicle_category_id = params['id'];
      this.category_name = params['name']
    });
  }
  activeImage(files: FileList){  
     this.activeimage =  files.item(0);    
    this.active_image_label = files.item(0).name
  
  }
  inactiveImage(files: FileList){
    this.inactiveimage = files.item(0); 
    this.inactive_image_label = files.item(0).name

  }

  get f(){
    return this.vehicleForm.controls;
  }
  onSubmit(){
    this.submitted=true
    if(this.vehicleForm.invalid){
      return
    }
    console.log(this.name)
    console.log(this.inactiveimage)
    console.log(this.activeimage)
    let formData:FormData = new FormData();
        formData.append('active_image', this.activeimage);
        formData.append('inactive_image', this.inactiveimage);
        formData.append('name', this.name );
        formData.append('vehicle_category_id',this.vehicle_category_id);
        formData.append('description', this.description );
    let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    this.dataService.OnVehicleTypeSubmit(formData,headers).subscribe((data:any)=> {
    console.log(data)
    if(data.Status){
    this.notifier.show({
      type: 'success',
      message: this.name + ' ' + data.Message,
      });
      this.router.navigate(["admin/vehicletypecategory/types/" + this.vehicle_category_id+"/"+this.category_name])
    }
    else{
      this.notifier.show({
        type: 'error',
        message: data.Message,
        });
    }
  });
  }
  onCancel(){
    this.router.navigate(["admin/vehicletypecategory/types/" + this.vehicle_category_id+"/"+this.category_name])
  }
}


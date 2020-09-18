import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
interface MobileNumber {
  number: string;
  internationalNumber:string;
  countryCode:string;
}
@Component({
  selector: 'app-add-new-drivers',
  templateUrl: './add-new-drivers.component.html',
  styleUrls: ['./add-new-drivers.component.css']
})
export class AddNewDriversComponent implements OnInit {

  public locationList:any
  public location_id:string
  public name:string
  mobile_number:any
  license_number:string
  image: File = null;
  driver_image:string = "Choose Driver Image";
  
  driverForm:FormGroup;
  submitted:boolean=false
  company_id:string
  company_name:string
  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private notifier:NotifierService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.company_id = params['id'];
      this.company_name = params['name']
      this.dataService.getActiveLocationsForCompany(this.company_id).subscribe(data => {
        this.locationList = data
      });
    })

      

    this.driverForm =this.formBuilder.group({
        name:['',Validators.required],
        location_id:['',Validators.required],
        mobile_number:['',Validators.required],
        license_number:['',Validators.required],
        driverimage:['',Validators.required],
    });
  }

  driverImage(files: FileList){      
    this.image =  files.item(0);
    this.driver_image =  files.item(0).name;        
  }

  onClick(){
    
  }

  get f(){
    return this.driverForm.controls;
  }
  onSubmit(){
    this.submitted=true
    if(this.driverForm.invalid){
      if (!this.driverForm.get('mobile_number').valid){
        this.notifier.show({
          type: 'error',
          message: "Sorry ! The mobile number is invalid",
        });
      }
      return
    }
    let code=this.mobile_number.internationalNumber
    let x = code.split(" ");
    let dial_code=x[0];
    console.log(x[0]);
    let formData:FormData = new FormData();
        formData.append('name', this.name);
        formData.append('location_id', this.location_id);
        formData.append('dial_code', dial_code);
        formData.append('mobile_number', this.mobile_number.number);
        formData.append('license_number', this.license_number);
        formData.append('image', this.image );
      //  console.log(this.name,this.location_id,this.dial_code,this.mobile_number,this.license_number,this.image)
    let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    this.dataService.addNewDriver(formData,headers).subscribe((data:any)=> {
      if(data.Status){
        this.notifier.show({
          type: 'success',
          message: this.name + ' ' + data.Message, 
        });
        this.navigateToDriverList()
      }else{
        this.notifier.show({
          type: 'error',
          message: data.Message,
        });
      
      }
    });
  }
  onCancel(){
    this.navigateToDriverList()
  }
  navigateToDriverList() {
    this.router.navigate(["admin/companies/" + this.company_id + "/" + this.company_name + "/drivers"])
  }
}

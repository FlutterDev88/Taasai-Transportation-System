import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {DataService} from '../data.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-add-new-vehicle-type-category',
  templateUrl: './add-new-vehicle-type-category.component.html',
  styleUrls: ['./add-new-vehicle-type-category.component.css']
})
export class AddNewVehicleTypeCategoryComponent implements OnInit {

  vehicleCategoryForm:FormGroup;
  submitted:boolean = false;
  action_name:string
  name:string
  vehicleCategories:any
  isLoading:boolean;

  constructor(private route:ActivatedRoute,private dataService:DataService,private formBuilder:FormBuilder,private notifier:NotifierService,private router:Router) { }

  ngOnInit() {
    this.vehicleCategoryForm = this.formBuilder.group({
        name:['',Validators.required]
    });
  }
  
  get f(){
    return this.vehicleCategoryForm.controls;
  }

  onCancel(){
    this.router.navigate(["admin/vehicletypecategory"])
  }

  onSubmit(){
    this.submitted=true
    if(this.vehicleCategoryForm.invalid){
      return
    }  
    this.dataService.addNewVehicleTypeCategory(this.name).subscribe((data:any) => {
    if(data.Status){
      this.notifier.show({
          type: 'success',
          message: this.name + ' ' + 'Vehicle Type Category is Created Successfully',
      });  
      this.router.navigate(["admin/vehicletypecategory"])
    }else{
      this.notifier.show({
        type: 'error',
        message: data.Message,    
      }); 
     
    }
    });
  }
}


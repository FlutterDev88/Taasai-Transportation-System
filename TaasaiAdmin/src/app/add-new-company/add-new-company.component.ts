import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrls: ['./add-new-company.component.css']
})
export class AddNewCompanyComponent implements OnInit {

  public locationList: any
  public location_id: any
  locations: Array<number> = [
        
  ]
  public name: string
  email:string
  commission:number
  password:string
  confirmPassword:string
  companyForm: FormGroup;
  submitted: boolean = false
  config = {
    displayKey: "Name", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
        height: 'auto' ,//height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Locations' // text to be displayed when no item is selected defaults to Select,
        
  }

  constructor(private dataService: DataService, private router: Router, private formBuilder: FormBuilder, private notifier: NotifierService) { }
  ngOnInit() {
    this.dataService.getActiveLocations().subscribe(data => {
      this.locationList = data
    });

    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      location_id:['',Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      commission: ['', Validators.required]
    });
  }
  onClick() {
    //return this.dial_code
  }

  get f() {
    return this.companyForm.controls;
  }
  onSubmit() {
    this.submitted = true
    if (this.companyForm.invalid) {
      return
    } 
    this.locations=[]
   for(let i=0;i<this.location_id.length;i++){
     console.log(this.location_id[i].ID) 
     this.locations.push(this.location_id[i].ID);
   }
   console.log(this.locations)
   // console.log(this.location_id,this.name,this.email,this.password,this.confirmPassword)
   this.dataService.addNewCompany(this.commission,this.name,this.email,this.password,this.confirmPassword,this.locations).subscribe((data:any)=> {
      console.log(data)
      if(data.Status){
      this.notifier.show({
        type: 'success',
        message: this.name + ' ' + data.Message,
        });
        this.router.navigate(["admin/companies"])
      }
      else{
        this.notifier.show({
          type: 'error',
          message: data.Message,
          });
      }
    });
}
  onCancel() {
    this.router.navigate(["admin/companies"])
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-vehicle-type',
  templateUrl: './edit-vehicle-type.component.html',
  styleUrls: ['./edit-vehicle-type.component.css']
})
export class EditVehicleTypeComponent implements OnInit {

  title = 'App works'
  vehicleForm: FormGroup;
  submitted: boolean = false
  name: string
  description: string
  id:number
  vehicle_category_id: string
  category_name: string
  activeimage: File = null;
  inactiveimage: File = null;
  vehicleCategories: any
  isNewImages = false
  inactive_image_label = "Choose Inactive Image"
  active_image_label = "Choose Active Image"
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private notifier: NotifierService) { }

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      name: ['', Validators.required],
      inactiveimage: [''],
      activeimage: [''],
      description: ['', Validators.required],
      isNewImages:[false]
    });
    this.activatedRoute.params.subscribe(params => {
      this.vehicle_category_id = params['categoryId'];
      this.category_name = params['categoryName']
      this.id = +params['id'];
      this.name = params['name']
      this.dataService.getVehicleTypeWithID(this.id).subscribe((result:any)=>{
        this.name = result.Name
        this.description = result.Description
      })
    });
  }
  activeImage(files: FileList) {
    this.activeimage = files.item(0);
    this.active_image_label = files.item(0).name

  }
  inactiveImage(files: FileList) {
    this.inactiveimage = files.item(0);
    this.inactive_image_label = files.item(0).name
  }
  onCheckboxChanged(event:any){
    this.isNewImages = !this.isNewImages
    console.log("called")
  }
  get f() {
    return this.vehicleForm.controls;
  }
  onSubmit() {
    this.submitted = true
    if (this.vehicleForm.invalid) {
      return
    }
    console.log(this.name)
    console.log(this.inactiveimage)
    console.log(this.activeimage)
    let formData: FormData = new FormData();
    if(this.isNewImages){
      formData.append('active_image', this.activeimage);
      formData.append('inactive_image', this.inactiveimage);
      formData.append('is_new_images', "true");
    }
    formData.append('name', this.name);
    formData.append('id', String(this.id));
    formData.append('vehicle_category_id', this.vehicle_category_id);
    formData.append('description', this.description);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.dataService.editVehicleType(formData, headers).subscribe((data: any) => {
      console.log(data)
      if (data.Status) {
        this.notifier.show({
          type: 'success',
          message: this.name + ' ' + data.Message,
        });
        this.router.navigate(["admin/vehicletypecategory/types/" + this.vehicle_category_id + "/" + this.category_name])
      }
      else {
        this.notifier.show({
          type: 'warning',
          message: data.Message,
        });
      }
    });
  }
  onCancel() {
    this.router.navigate(["admin/vehicletypecategory/types/" + this.vehicle_category_id + "/" + this.category_name])
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-vehicle-category',
  templateUrl: './edit-vehicle-category.component.html',
  styleUrls: ['./edit-vehicle-category.component.css']
})
export class EditVehicleCategoryComponent implements OnInit {

  vehicleCategoryForm: FormGroup;
  submitted: boolean = false;
  name: string
  id:number
  vehicleCategories: any
  isLoading: boolean;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private formBuilder: FormBuilder, private notifier: NotifierService, private router: Router) { }

  ngOnInit() {
    this.vehicleCategoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.name = params['name']
    })
  }

  get f() {
    return this.vehicleCategoryForm.controls;
  }

  onCancel() {
    this.router.navigate(["admin/vehicletypecategory"])
  }

  onSubmit() {
    this.submitted = true
    if (this.vehicleCategoryForm.invalid) {
      return
    }
    this.dataService.editVehicleTypeCategory(this.id,this.name).subscribe((data: any) => {
      if (data.Status) {
        this.notifier.show({
          type: 'success',
          message: this.name + ' ' + 'Vehicle Type Category is updated Successfully',
        });
        this.router.navigate(["admin/vehicletypecategory"])
      } else {
        this.notifier.show({
          type: 'warning',
          message: data.Message,
        });

      }
    });
  }
}

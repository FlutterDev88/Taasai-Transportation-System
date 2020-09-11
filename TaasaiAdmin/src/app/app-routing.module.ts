import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationListComponent } from './location-list/location-list.component';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';
import { FareListComponent } from './fare-list/fare-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { AddNewVehicleTypeComponent } from './add-new-vehicle-type/add-new-vehicle-type.component';
import { AddNewFareComponent } from './add-new-fare/add-new-fare.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { AddNewDriversComponent } from './add-new-drivers/add-new-drivers.component';
import { AddNewVehiclesComponent } from './add-new-vehicles/add-new-vehicles.component';
import { ManageVehicleAssignmentComponent } from './manage-vehicle-assignment/manage-vehicle-assignment.component';
import { AddNewVehicleTypeCategoryComponent } from './add-new-vehicle-type-category/add-new-vehicle-type-category.component';
import { RidesListComponent } from './rides-list/rides-list.component';
import { VehicleTypeCategoryListComponent } from './vehicle-type-category-list/vehicle-type-category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { AddNewZoneComponent } from './add-new-zone/add-new-zone.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddNewCompanyComponent } from './add-new-company/add-new-company.component';
import { EditVehicleCategoryComponent } from './edit-vehicle-category/edit-vehicle-category.component';
import { EditVehicleTypeComponent } from './edit-vehicle-type/edit-vehicle-type.component';
import { ZoneFareListComponent } from './zone-fare-list/zone-fare-list.component';
import { AddNewZoneFareComponent } from './add-new-zone-fare/add-new-zone-fare.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { AddDispatcherComponent } from './add-dispatcher/add-dispatcher.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { PassengerRideHistoryListComponent } from './passenger-ride-history-list/passenger-ride-history-list.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import {DriverDocumentComponent} from './driver-document/driver-document.component';
import {EditFareComponent} from './edit-fare/edit-fare.component';
import {EditOperatorComponent} from './edit-operator/edit-operator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vehicletypecategory', component: VehicleTypeCategoryListComponent },
      { path: 'vehicletypecategory/new', component: AddNewVehicleTypeCategoryComponent },
      { path: 'vehicletypecategory/edit/:name/:id', component: EditVehicleCategoryComponent },
      { path: 'drivers/:id/:name/new', component: AddNewDriversComponent },
      { path: 'locations', component: LocationListComponent },
      { path: 'editOperator/:id/:name', component: EditOperatorComponent  },
      { path: 'locations/editfares/:id/:name', component: EditFareComponent  },
      { path: 'locations/fares/:id/:name/:currency', component: FareListComponent  },
      { path: 'locations/new', component: AddNewLocationComponent },
      { path: 'vehicletypecategory/types/:id/:name', component: VehicleTypeListComponent},
      { path: 'locations/fares/:id/:name/:currency/new', component: AddNewFareComponent},
      { path: 'vehicletypecategory/types/:categoryId/:categoryName/edit/:name/:id', component: EditVehicleTypeComponent },
      { path: 'vehicletypecategory/types/:id/:name/new', component: AddNewVehicleTypeComponent },
      { path: 'dispatcher', component: AddDispatcherComponent },

      { path: 'rides', component: RidesListComponent},
      { path: 'rides/:id', component: RideDetailComponent },
      { path: 'locations/zones/:id/:name', component: ZoneListComponent},
      { path: 'locations/zones/:id/:name/fares', component: ZoneFareListComponent },
      { path: 'locations/zones/:id/:name/new', component: AddNewZoneComponent },
      { path: 'locations/zones/:id/:name/fares/new', component: AddNewZoneFareComponent },
      { path: 'companies', component: CompanyListComponent },
      { path: 'companies/new', component: AddNewCompanyComponent},
      { path: 'companies/:id/:name/vehicles', component: VehiclesListComponent },
      { path: 'companies/:id/:name/vehicles/new', component: AddNewVehiclesComponent },
      { path: 'drivers', component: DriverListComponent },
      { path: 'documents', component: DriverDocumentComponent },
      { path: 'drivers/:id', component: DriverDetailComponent },

      { path: 'companies/:id/:name/drivers/new', component: AddNewDriversComponent },
      { path: 'companies/:companyId/:companyName/drivers/assignments/:id/:name', component: ManageVehicleAssignmentComponent },
      { path: 'passenger', component: PassengerListComponent},
      { path: 'passengerRideHistory/:id/:name', component: PassengerRideHistoryListComponent}

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

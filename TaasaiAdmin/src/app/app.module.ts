import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule,HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BsDropdownModule} from 'ngx-bootstrap'
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input'
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UiSwitchModule } from 'ngx-ui-switch';
import {ModalModule} from 'ngx-bootstrap/modal'

//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


import { LocationListComponent } from './location-list/location-list.component';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';
import { AddNewVehicleTypeComponent } from './add-new-vehicle-type/add-new-vehicle-type.component';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { FareListComponent } from './fare-list/fare-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { AddNewFareComponent } from './add-new-fare/add-new-fare.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

import {JwtInterceptor} from './_interceptors/JwtInterceptor'
import {ErrorInterceptor} from './_interceptors/ErrorInterceptor'
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
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
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { EditVehicleCategoryComponent } from './edit-vehicle-category/edit-vehicle-category.component';
import { EditVehicleTypeComponent } from './edit-vehicle-type/edit-vehicle-type.component';
import { ZoneFareListComponent } from './zone-fare-list/zone-fare-list.component';
import { AddNewZoneFareComponent } from './add-new-zone-fare/add-new-zone-fare.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { AddDispatcherComponent } from './add-dispatcher/add-dispatcher.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { PassengerRideHistoryListComponent } from './passenger-ride-history-list/passenger-ride-history-list.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { DriverDocumentComponent } from './driver-document/driver-document.component';
import { EditFareComponent } from './edit-fare/edit-fare.component';
import { EditOperatorComponent } from './edit-operator/edit-operator.component'


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 64,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 2000,
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LocationListComponent,
    AddNewLocationComponent,
    VehicleTypeListComponent,
    AddNewVehicleTypeComponent,
    FareListComponent,
    DriverListComponent,
    VehiclesListComponent,
    AddNewFareComponent,
    MainComponent,
    LoginComponent,
    AddNewDriversComponent,
    AddNewVehiclesComponent,
    ManageVehicleAssignmentComponent,
    AddNewVehicleTypeCategoryComponent,
    RidesListComponent,
    VehicleTypeCategoryListComponent,
    DashboardComponent,
    ZoneListComponent,
    AddNewZoneComponent,
    CompanyListComponent,
    AddNewCompanyComponent,
    EditVehicleCategoryComponent,
    EditVehicleTypeComponent,
    ZoneFareListComponent,
    AddNewZoneFareComponent,
    RideDetailComponent,
    AddDispatcherComponent,
    PassengerListComponent,
    PassengerRideHistoryListComponent,
    DriverDetailComponent,
    DriverDocumentComponent,
    EditFareComponent,
    EditOperatorComponent,

    
  ],
  imports: [
    GooglePlaceModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    NgxIntlTelInputModule,
    NgSelectModule,
    SelectDropDownModule,
    FormsModule, ReactiveFormsModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCk1umsH1wQJk3_KWZLRXYy51rjsc8-fH8'
    }),
    AgmDirectionModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    UiSwitchModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

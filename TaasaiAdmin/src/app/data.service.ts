import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseURL = 'http://35.197.237.60:4001/admin';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  getDataCount(): any {
    return this.http.get(baseURL + '/getDataCount');
  }
  getCompanies(): any {
    return this.http.get(baseURL + '/getCompanies');
  }
  getRideDetail(id: string): any {
    return this.http.get(baseURL + '/getRideDetail/' + id);
  }
  getRideLocations(id: string): any {
    return this.http.get(baseURL + '/getRideLocations/' + id);
  }
  disableCompany(id: number): any {
    return this.http.put(baseURL + '/disableCompany/' + id, {});

  }

  enableCompany(id: number): any {
    return this.http.put(baseURL + '/enableCompany/' + id, {});
  }

  addNewZone(polygon: any, location_id: string, name: string, pickupPoints: any) {
    return this.http.post(baseURL + '/addNewZone', { PickupPoints: pickupPoints, Name: name, LocationID: Number(location_id), Polygon: polygon });
  }

  constructor(private http: HttpClient) {

  }

  getLocations() {
    return this.http.get(baseURL + '/getLocations');
  }
  getOperatorDocs() {
    return this.http.post(baseURL + '/getOperatorDocs', { });
  }
  addOperatorDoc( name ) {
    return this.http.post(baseURL + '/addOperatorDoc', { Name: name });
  }

  getZones(id: string) {
    return this.http.get(baseURL + '/getZones/' + id);
  }
  getCoordinates(id: string) {
    return this.http.get(baseURL + '/getCoordinates/' + id);
  }
  disableLocation(id: number) {
    return this.http.put(baseURL + '/disableLocation/' + id, {});
  }
  enableLocation(id: number) {
    return this.http.put(baseURL + '/enableLocation/' + id, {});
  }

  disableZone(id: number) {
    return this.http.put(baseURL + '/disableZone/' + id, {});
  }
  enableZone(id: number) {
    return this.http.put(baseURL + '/enableZone/' + id, {});
  }
  getVehicleTypes(id: string) {
    return this.http.get(baseURL + '/getVehicleTypes/' + id);
  }

  getVehicleTypeWithID(id: number) {
    return this.http.get(baseURL + '/getVehicleTypeWithID/' + id);
  }
  disableVehicleTypes(id: number) {
    return this.http.put(baseURL + '/disableVehicleType/' + id, {});
  }
  enableVehicleTypes(id: number) {
    return this.http.put(baseURL + '/enableVehicleType/' + id, {});
  }

  disableVehicle(id: number) {
    return this.http.put(baseURL + '/disableVehicle/' + id, {});
  }
  enableVehicle(id: number) {
    return this.http.put(baseURL + '/enableVehicle/' + id, {});
  }

  disableDriverAssignment(id: number) {
    return this.http.put(baseURL + '/disableDriverAssignment/' + id, {});
  }
  enableDriverAssignment(id: number) {
    return this.http.put(baseURL + '/enableDriverAssignment/' + id, {});
  }
  disableDriver(id: number) {
    return this.http.put(baseURL + '/disableDriver/' + id, {});
  }
  getDriverDetails(id: number) {
    return this.http.get(baseURL + '/getDriverDetailsWithDoc/' + id, {});
  }
  enableDriver(id: number) {
    return this.http.put(baseURL + '/enableDriver/' + id, {});
  }

  disableVehicleTypeCategory(id: number) {
    return this.http.put(baseURL + '/disableVehicleCategory/' + id, {});
  }
  enableVehicleTypeCategory(id: number) {
    return this.http.put(baseURL + '/enableVehicleCategory/' + id, {});
  }
  disableFare(FareId: string) {
    console.log(FareId);
    const params = {FareId: parseInt(FareId)};
    return this.http.put(baseURL + '/disableFare', params);
  }

  disableZoneFare(FareId: string) {
    console.log(FareId);
    const params = { FareId: parseInt(FareId) };
    return this.http.put(baseURL + '/disableZoneFare', params);
  }
  getFares(id: number) {
    return this.http.get(baseURL + '/getFares/' + id);
  }

  getZoneFares(id: number) {
    return this.http.get(baseURL + '/getZoneFares/' + id);
  }
  GetDrivers(): any {
    // var parms={"companyId":companyId}
    return this.http.get(baseURL + '/getDrivers', {});
  }
  getVehiclesOfCompany(id: string) {
    return this.http.get(baseURL + '/getVehiclesOfCompany/' + id);
  }
  getVehicles() {
    return this.http.get(baseURL + '/getVehicles');
  }
  OnVehicleTypeSubmit(formData, headers) {
    return this.http.post(baseURL + '/addNewVehicleType', formData, headers);
  }

  editVehicleType(formData, headers) {
    return this.http.post(baseURL + '/editVehicleType', formData, headers);
  }
  getActiveLocations() {
    return this.http.get(baseURL + '/getActiveLocations');
  }

  getActiveLocationsForCompany(id: string) {
    return this.http.get(baseURL + '/getActiveLocationsForCompany/' + id);
  }
  getActiveVehicleType() {
    return this.http.get(baseURL + '/getActiveVehicleType');
  }
  LocationSelected(ref: number) {
    return this.http.get(baseURL + '/getUnAssignedVehicleType/' + ref);
  }


  getUnAssignedVehicleTypeForZone(ref: number) {
    return this.http.get(baseURL + '/getUnAssignedVehicleTypeForZone/' + ref);
  }
  addNewVehicleTypeCategory(Name: string) {
    return this.http.post(baseURL + '/addNewVehicleTypeCategory', {Name});
  }

  editVehicleTypeCategory(id: number, name: string) {
    return this.http.post(baseURL + '/editVehicleTypeCategory', { Name: name , ID: id});
  }
  getVehicleTypeCategories() {
    return this.http.get(baseURL + '/getVehicleTypeCategories');
  }
  getActiveVehicleTypeCategories() {
    return this.http.get(baseURL + '/getActiveVehicleTypeCategories');
  }
  addNewVehicleAssignment(vehicle_id: string, driver_id: number) {
    const params = { VehicleID: parseInt(vehicle_id), DriverID: driver_id};
    return this.http.post(baseURL + '/addNewVehicleAssignment', params);
  }

  getVehicleAssignments(driver_id: number) {
    console.log(driver_id);
    return this.http.get(baseURL + '/getVehicleAssignments/' + driver_id);
  }

  addNewFare(location_id: string, vehicle_type_id: string,
             base_fare: number, minimumFare: number,
             duration_fare: number, distance_fare: number,
             waitingTimeLimit: number, waitingFee: number,
             cancellationTimeLimit: number, cancellationFee: number ,
             tax: number, trafficFactor: number
  ) {
    const params = {
      OperatorID: parseInt(location_id),
      VehicleTypeID: parseInt(vehicle_type_id),
      BaseFare: base_fare,
      MinimumFare: minimumFare,
      DurationFare: duration_fare,
      DistanceFare: distance_fare,
      WaitingTimeLimit: (waitingTimeLimit),
      WaitingFee: waitingFee,
      CancellationTimeLimit: (cancellationTimeLimit),
      CancellationFee: cancellationFee,
      Tax: tax,
      TrafficFactor: trafficFactor
    };
    console.log(params);
    return this.http.post(baseURL + '/addNewFare', params );
  }

  editFare(fare_id: number,
             base_fare: number, minimumFare: number,
             duration_fare: number, distance_fare: number,
             waitingTimeLimit: number, waitingFee: number,
             cancellationTimeLimit: number, cancellationFee: number ,
             tax: number, trafficFactor: number
  ) {
    const params = {
      ID: fare_id,
      BaseFare: base_fare,
      MinimumFare: minimumFare,
      DurationFare: duration_fare,
      DistanceFare: distance_fare,
      WaitingTimeLimit: (waitingTimeLimit),
      WaitingFee: waitingFee,
      CancellationTimeLimit: (cancellationTimeLimit),
      CancellationFee: cancellationFee,
      Tax: tax,
      TrafficFactor: trafficFactor
    };
    console.log(params);
    return this.http.put(baseURL + '/editFare', params );
  }

  addNewZoneFare(
      location_id: string, vehicle_type_id: string,
      base_fare: number, minimumFare: number,
      duration_fare: number, distance_fare: number,
      waitingTimeLimit: number, waitingFee: number,
      cancellationTimeLimit: number, cancellationFee: number ,
      tax: number, trafficFactor: number
  ) {
    const params = {
      ZoneID: parseInt(location_id),
      VehicleTypeID: parseInt(vehicle_type_id),
      BaseFare: base_fare,
      MinimumFare: minimumFare,
      DurationFare: duration_fare,
      DistanceFare: distance_fare,
      WaitingTimeLimit: (waitingTimeLimit),
      WaitingFee: waitingFee,
      CancellationTimeLimit: (cancellationTimeLimit),
      CancellationFee: cancellationFee,
      Tax: tax,
      TrafficFactor: trafficFactor
    };
    console.log(params);
    return this.http.post(baseURL + '/addNewZoneFare', params);
  }

  getVehicleTypesWithFare(ref: number) {
    return this.http.get(baseURL + '/getVehicleTypesWithFare/' + ref);
  }

  getFareByID(id: string) {
    return this.http.get(baseURL + '/getFareByID/' + id);
  }
  getOperatorByID(id: string) {
    return this.http.get(baseURL + '/GetOperatorByID/' + id);
  }

  addNewOperator(polygon: any, currency: string, name: string, email: string, locationName: string,
                 platformCommission: number, operatorCommission: number,
                 workTime: number, restTime: number, docs: Array<any>, password: string, confirmPassword: string, referAmount: number) {
    return this.http.post(baseURL + '/addNewOperator',
        {
          Name: name,
          Currency: currency,
          Polygon: polygon,
          Email: email,
          LocationName: locationName,
          PlatformCommission: platformCommission,
          OperatorCommission: operatorCommission,
          WorkTime: workTime,
          RestTime: restTime,
          Docs: docs,
          Password: password,
          ConfirmPassword: confirmPassword,
          ReferAmount:referAmount
        });
  }

  editOperator(operatorID:number,polygon: any, currency: string, name: string, email: string, locationName: string,
                 platformCommission: number, operatorCommission: number,
                 workTime: number, restTime: number) {
    return this.http.put(baseURL + '/editOperator/'+operatorID,
        {
          Name: name,
          Currency: currency,
          Polygon: polygon,
          Email: email,
          LocationName: locationName,
          PlatformCommission: platformCommission,
          OperatorCommission: operatorCommission,
          WorkTime: workTime,
          RestTime: restTime,
        });
  }

  addNewVehicle(formData, headers) {
    return this.http.post(baseURL + '/addNewVehicle', formData, headers);
  }

  addNewDriver(formData, headers) {
    return this.http.post(baseURL + '/addNewDriver', formData, headers);
  }
  getRides(RideStatus: string) {
    return this.http.post(baseURL + '/getRides', {RideStatus: parseInt(RideStatus)});
  }
  addNewCompany(Commission: number, Name: string, Email: string, Password: string, ConfirmPassword: string, Locations: any) {
    // tslint:disable-next-line:radix
    console.log(parseInt(Locations));
    const parms = {Commission, Name, Email, Password, ConfirmPassword, Locations};
    return this.http.post(baseURL + '/addNewCompany', parms);
  }
  getPassenger() {
    return this.http.get(baseURL + '/getAllPassengers');
  }
  getRidesForPassenger(passengerId: number) {
    return this.http.get(baseURL + '/getRidesForPassenger/' + passengerId);
  }
}

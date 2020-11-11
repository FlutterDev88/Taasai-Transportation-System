import 'package:passenger_app/models/ride.dart';
import 'package:passenger_app/models/vehicle.dart';

import 'driver.dart';

class RideAcceptResponse {
  Ride ride;
  Driver driver;
  RideAcceptResponse(this.ride, this.driver);

  RideAcceptResponse.fromJson(Map<String,dynamic> json){
    ride = Ride.fromJson(json["RideDetails"]);
    driver = Driver.fromJson(json["DriverDetails"]);
  }

}
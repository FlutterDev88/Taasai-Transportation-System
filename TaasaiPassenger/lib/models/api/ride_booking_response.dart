import 'package:passenger_app/models/ride.dart';

class RideBookingResponse {
  bool status;
  String message;
  Ride ride;

  RideBookingResponse({this.status,this.message,this.ride});

  RideBookingResponse.fromJson(Map<String,dynamic> json){
    this.status = json["Status"];
    this.message = json["Message"];
    this.ride = Ride.fromJson(json["RideDetails"]);
  }

  RideBookingResponse.withError(String errorMessage){
    this.status = false;
    this.message = errorMessage;
  }
}
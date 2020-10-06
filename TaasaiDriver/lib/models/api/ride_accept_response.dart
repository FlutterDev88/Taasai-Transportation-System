import 'package:flutter/cupertino.dart';

import '../ride.dart';

class RideStop{
  String name;
  double latitude;
  double longitude;
  RideStop({this.name,this.longitude,this.latitude});
  RideStop.fromJson(Map<String, dynamic>json){
    this.name = json['Location'];
    this.latitude = json['Latitude'];
    this.longitude = json['Longitude'];
  }

}

class RideAcceptResponse {
  bool status;
  String message;
  String passengerName;
  Ride ride;
  List<RideStop> stopDetails;

  RideAcceptResponse({this.status,this.message});

  RideAcceptResponse.fromJson(Map<String,dynamic> json){
    debugPrint(json.toString());
    this.status = json["Status"];
    this.message = json["Message"];
    this.passengerName = json["PassengerName"];
    this.ride = Ride.fromJson(json["RideDetails"]);
    this.stopDetails =  (json["StopDetails"]??[]).map<RideStop>((i)=>RideStop.fromJson(i)).toList();
  }

  RideAcceptResponse.withError(String errorMessage){
    this.status = false;
    this.message = errorMessage;
  }

}
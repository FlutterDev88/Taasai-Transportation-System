import 'package:passenger_app/models/ride.dart';

class GetRideResponse{
  String message;
  List<Ride>ride;

  GetRideResponse({this.ride,this.message});

  GetRideResponse.fromJson(List<dynamic> list){
    this.ride = list.map<Ride>((i)=>Ride.fromJson(i)).toList();
    this.message = "";
  }

  GetRideResponse.withError(String error){
    this.message = error;
    this.ride = [];
  }
}
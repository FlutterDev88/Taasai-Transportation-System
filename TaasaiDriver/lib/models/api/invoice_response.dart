import '../ride.dart';

class InvoiceResponse {
  bool status;
  String message;
  String currency;
  Ride ride;

  InvoiceResponse({this.status,this.message});

  InvoiceResponse.fromJson(Map<String,dynamic> json){
    this.status = json["Status"];
    this.message = json["Message"];
    this.currency = json["Currency"];
    this.ride = Ride.fromJson(json["RideDetails"]);
  }

  InvoiceResponse.withError(String errorMessage){
    this.status = false;
    this.message = errorMessage;
  }

}
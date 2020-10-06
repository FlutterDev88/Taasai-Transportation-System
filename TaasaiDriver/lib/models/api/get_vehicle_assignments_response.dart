import 'package:passenger_app/models/vehicle.dart';

class GetVehicleAssignmentsResponse {
  List<Vehicle> vehicles;
  String message;
  GetVehicleAssignmentsResponse(this.vehicles,this.message);


  GetVehicleAssignmentsResponse.fromJson(List<dynamic> json){
    vehicles = json.map<Vehicle>((i)=>Vehicle.fromJson(i)).toList();
    message = "";
  }

  GetVehicleAssignmentsResponse.withError(String error){
    vehicles=[];
    message = error;
  }


}
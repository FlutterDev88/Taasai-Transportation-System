class GetVehicleTypeResponse{
  String message;
  List<VehicleType>vehicleType;
  GetVehicleTypeResponse({this.vehicleType,this.message});

  GetVehicleTypeResponse.fromJson(List<dynamic>list){
    this.message = "";
    this.vehicleType = list.map<VehicleType>((i)=>VehicleType.fromJson(i)).toList();
  }

  GetVehicleTypeResponse.withError(error){
    this.message = error;
    this.vehicleType = [];
  }
}

class VehicleType{
  String name;
  int vehicleCategoryID;
  VehicleType({this.name,this.vehicleCategoryID});

  VehicleType.fromJson(Map<String,dynamic> json){
    this.name = json["Name"];
    this.vehicleCategoryID = json["ID"];
  }

}
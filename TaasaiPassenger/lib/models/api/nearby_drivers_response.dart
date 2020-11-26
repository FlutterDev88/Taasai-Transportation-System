class NearbyDriversResponse{
  List<DriverLocation> drivers;
  String message;
  NearbyDriversResponse.fromJson(List<dynamic> list){
    this.drivers = list.map<DriverLocation>((i)=>DriverLocation.fromJson(i)).toList();
    this.message = "";
  }

  NearbyDriversResponse.withError(String error){
    this.message = error;
    this.drivers = [];
  }

}

class DriverLocation{
  int id;
  double latitude;
  double longitude;
  double distance;

  DriverLocation.fromJson(Map<String,dynamic> json){
    this.id = json["id"];
    this.latitude = json["latitude"];
    this.longitude = json["longitude"];
    this.distance = json["distance"].toDouble();
  }

}
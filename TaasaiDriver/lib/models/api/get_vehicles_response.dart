class GetVehiclesResponse {
  bool status;
  String message;
  List<EstimateFare> data;
  GetVehiclesResponse({this.status,this.message});

  GetVehiclesResponse.fromJson(Map<String,dynamic> json){
    this.status = json["Status"];
    this.message = json["Message"];
    this.data = json["Data"].map<EstimateFare>((i)=>EstimateFare.fromJson(i)).toList();

  }

  GetVehiclesResponse.withError(String errorMessage){
    this.status = false;
    this.message = errorMessage;
  }

}

class EstimateFare {
  int vehicle_type_id;
  int fare_id;
  String category_id;
  int location_id;
  String category_name;
  String currency;
  double estimated_fare;
  double base_fare;
  double minimum_fare;
  double waiting_fare;
  double base_fare_distance;
  double base_fare_duration;
  double duration_fare;
  double distance_fare;
  String vehicle_type_name;
  String vehicle_type_desc;
  String vehicle_type_image;
  String vehicle_type_image_inactive;


  EstimateFare(this.vehicle_type_id, this.fare_id, this.category_id,
      this.location_id, this.category_name, this.currency, this.estimated_fare,
      this.base_fare, this.minimum_fare, this.waiting_fare,
      this.base_fare_distance, this.base_fare_duration, this.duration_fare,
      this.distance_fare, this.vehicle_type_name, this.vehicle_type_desc,
      this.vehicle_type_image, this.vehicle_type_image_inactive);

  EstimateFare.fromJson(Map<String,dynamic> json){
    this.vehicle_type_id = json["vehicle_type_id"];
    this.fare_id = json["fare_id"];
    this.category_id = json["category_id"];
    this.location_id = json["location_id"];
    this.category_name = json["category_name"];
    this.currency = json["currency"];
    this.estimated_fare = json["estimated_fare"].toDouble();
    this.base_fare = json["base_fare"].toDouble();
    this.minimum_fare = json["minimum_fare"].toDouble();
    this.waiting_fare = json["waiting_fare"].toDouble();
    this.base_fare_distance = json["base_fare_distance"].toDouble();
    this.base_fare_duration = json["base_fare_duration"].toDouble();
    this.duration_fare = json["duration_fare"].toDouble();
    this.distance_fare = json["distance_fare"].toDouble();
    this.vehicle_type_name = json["vehicle_type_name"];
    this.vehicle_type_desc = json["vehicle_type_desc"];
    this.vehicle_type_image = json["vehicle_type_image"];
    this.vehicle_type_image_inactive = json["vehicle_type_image_inactive"];
  }

}
class GetVehiclesResponse {
  bool status;
  String message;
  List<EstimateFare> data;
  List<PickupPoint>pickupPoint;
  GetVehiclesResponse({this.status,this.message,this.pickupPoint});
  GetVehiclesResponse.fromJson(Map<String,dynamic> json){
    this.status = json["Status"];
    this.message = json["Message"];
    this.data = (json["Data"]??[]).map<EstimateFare>((i)=>EstimateFare.fromJson(i)).toList();
    this.pickupPoint = (json["PickupPoints"]??[]).map<PickupPoint>((i)=>PickupPoint.fromJson(i)).toList();

  }

  GetVehiclesResponse.withError(String errorMessage){
    this.status = false;
    this.message = errorMessage;
    this.data = [];
    this.pickupPoint = [];
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
  double waiting_fee;
  double cancellation_fee;
  int waiting_time_limit;
  int cancellation_time_limit;
  double duration_fare;
  double distance_fare;
  String vehicle_type_name;
  String vehicle_type_desc;
  String vehicle_type_image;
  String vehicle_type_image_inactive;
  String operatorName;
  double estimatedFareMax;


  EstimateFare(this.vehicle_type_id, this.fare_id, this.category_id,
      this.location_id, this.category_name, this.currency, this.estimated_fare,
      this.base_fare, this.minimum_fare, this.waiting_fee,this.cancellation_fee,this.cancellation_time_limit,this.waiting_time_limit, this.duration_fare,
      this.distance_fare, this.vehicle_type_name, this.vehicle_type_desc,this.operatorName,
      this.vehicle_type_image, this.vehicle_type_image_inactive,this.estimatedFareMax);

  EstimateFare.fromJson(Map<String,dynamic> json){
    this.vehicle_type_id = json["vehicle_type_id"];
    this.fare_id = json["fare_id"];
    this.category_id = json["category_id"];
    this.location_id = json["location_id"];
    this.category_name = json["category_name"];
    this.currency = json["currency"];
    this.estimated_fare = json["estimated_fare"].toDouble();
    this.estimatedFareMax = json["estimated_fare_max"].toDouble();
    this.base_fare = json["base_fare"].toDouble();
    this.minimum_fare = json["minimum_fare"].toDouble();
    this.waiting_fee = json["waiting_fee"].toDouble();
    this.cancellation_fee = json["cancellation_fee"].toDouble();
    this.waiting_time_limit = json["waiting_time_limit"];
    this.cancellation_time_limit = json["cancellation_time_limit"];
    this.duration_fare = json["duration_fare"].toDouble();
    this.distance_fare = json["distance_fare"].toDouble();
    this.vehicle_type_name = json["vehicle_type_name"];
    this.vehicle_type_desc = json["vehicle_type_desc"];
    this.vehicle_type_image = json["vehicle_type_image"];
    this.vehicle_type_image_inactive = json["vehicle_type_image_inactive"];
    this.operatorName = json['operator_name'];

  }

}

class PickupPoint{
  String name;
  int id;
  PickupPoint({this.id,this.name});
  PickupPoint.fromJson(Map<String,dynamic>json){
    name = json['Name'];
    id = json['ID'];
  }
}
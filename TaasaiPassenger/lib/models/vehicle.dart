class Vehicle {
  int id;
  int vehicleTypeId;
  String name;
  String brand;
  String vehicleNumber;
  String image;

  Vehicle(this.id, this.vehicleTypeId, this.name, this.brand,
      this.vehicleNumber, this.image);

  Vehicle.fromJson(Map<String,dynamic> json){
    id = json["ID"];
    vehicleTypeId = json["VehicleTypeId"];
    name = json["Name"];
    brand = json["Brand"];
    vehicleNumber = json["VehicleNumber"];
    image = json["Image"];
  }

}

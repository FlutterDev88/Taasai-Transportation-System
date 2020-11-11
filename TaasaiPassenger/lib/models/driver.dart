class Driver {
  int id;
  String name;
  int dialCode;
  String mobile;
  String license;
  String image;
  String vehicleImage;
  String vehicleNumber;
  String vehicleName;

  Driver(this.id, this.name, this.dialCode, this.mobile, this.license,
      this.image,this.vehicleImage,this.vehicleNumber,this.vehicleName);

  Driver.fromJson(Map<String,dynamic> json){
    id = json["ID"];
    name = json["Name"];
    dialCode = json["DialCode"];
    mobile = json["MobileNumber"];
    license= json["LicenseNumber"]??"";
    image = json["DriverImage"];
    vehicleImage = json["VehicleImage"];
    vehicleNumber = json["VehicleNumber"];
    vehicleName = json["VehicleName"];

  }


}
class User {
  int id;
  bool isProfileCompleted;
  String authToken;
  String name;
  String mobileNumber;
  int dialCode;
  String image;
  bool isActive;
  int operatorId;
  String vehicleName;
  String vehicleImage;
  String vehicleNumber;
  int vehicleTypeID;
  String licenseNumber;
  User(
      {
        this.id,
        this.isProfileCompleted,
        this.authToken,
        this.name,
        this.dialCode,
        this.mobileNumber,
        this.image,
        this.operatorId,
        this.isActive,
        this.vehicleNumber,
        this.vehicleName,
        this.vehicleImage,
        this.vehicleTypeID,
        this.licenseNumber,
      }
  );

  User.fromJson(Map<String, dynamic> json) {
    id = json['ID'];
    isProfileCompleted = json['IsProfileCompleted'];
    authToken = json['AuthToken'];
    name = json['Name'];
    mobileNumber = json['MobileNumber'];
    dialCode = json['DialCode'];
    image = json['DriverImage'];
    vehicleImage = json['VehicleImage'];
    vehicleNumber = json['VehicleNumber'];
    vehicleName = json['VehicleName'];
    vehicleTypeID = json['VehicleTypeID'];
    operatorId = json['OperatorID'];
    isActive = json['IsActive'];
    licenseNumber = json['LicenseNumber'];
  }


  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['ID'] = this.id;
    data['IsProfileCompleted'] = this.isProfileCompleted;
    data['AuthToken'] = this.authToken;
    data['Name'] = this.name;
    data['MobileNumber'] = this.mobileNumber;
    data['DialCode'] = this.dialCode;
    data['DriverImage'] = this.image;
    data['OperatorID'] = this.operatorId;
    data['IsActive'] = this.isActive;
    data['VehicleName'] = this.vehicleName;
    data['VehicleImage'] = this.vehicleImage;
    data['VehicleNumber'] = this.vehicleNumber;
    data['VehicleTypeID'] = this.vehicleTypeID;
    data['LicenseNumber'] = this.licenseNumber;
    return data;
  }
}
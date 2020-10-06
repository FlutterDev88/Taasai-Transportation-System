import 'package:intl/intl.dart';
class Ride {

  int id;
  int locationId;
  int rideStatus;
  int vehicleTypeId;
  String pickupLocation;
  double pickupLatitude;
  double pickupLongitude;
  String dropLocation;
  double dropLatitude;
  double dropLongitude;
  String RideDateTime;
  double distance;
  double duration;
  double totalFare;
  double distanceFare;
  double durationFare;
  String durationReadable;
  String passengerReview;
  double driverRating;
  bool isMultiStop;
  Ride(this.locationId, this.vehicleTypeId, this.pickupLocation,
      this.pickupLatitude, this.pickupLongitude, this.dropLocation,
      this.dropLatitude, this.dropLongitude,this.rideStatus,this.RideDateTime,this.driverRating,this.passengerReview,this.isMultiStop);

  Ride.fromJson(Map<String,dynamic> json){
    locationId = json["LocationID"];
    rideStatus = json["RideStatus"];
    vehicleTypeId = json["VehicleTypeID"];
    pickupLocation = json["PickupLocation"];
    pickupLatitude = json["PickupLatitude"].toDouble();
    pickupLongitude = json["PickupLongitude"].toDouble();
    dropLocation = json["DropLocation"];
    dropLatitude = json["DropLatitude"].toDouble();
    dropLongitude = json["DropLongitude"].toDouble();
    id = json["ID"];
    isMultiStop = json["IsMultiStop"];
    durationReadable = json["DurationReadable"]??"";
    durationFare = (json["DurationFare"]??0).toDouble();
    distanceFare = (json["DistanceFare"]??0).toDouble();
    totalFare = (json["TotalFare"]??0).toDouble();
    duration = (json["Duration"]??0).toDouble();
    distance = (json["Distance"]??0).toDouble();
    RideDateTime = json["RideDateTime"];
    driverRating = json["DriverRating"].toDouble();
    passengerReview = json["PassengerReview"];
  }

  @override
  String toString() {
    return 'Ride{id: $id, locationId: $locationId, vehicleTypeId: $vehicleTypeId, pickupLocation: $pickupLocation, pickupLatitude: $pickupLatitude, pickupLongitude: $pickupLongitude, dropLocation: $dropLocation, dropLatitude: $dropLatitude, dropLongitude: $dropLongitude}';
  }

  String getFormattedTime() {
    var formattedTime = "";
    var date = DateTime.parse(this.RideDateTime);
    formattedTime = DateFormat.yMd().add_jm().format(date);
    return formattedTime;

  }

}
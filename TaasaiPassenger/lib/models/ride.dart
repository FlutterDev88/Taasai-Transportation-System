
import 'package:intl/intl.dart';
import 'package:passenger_app/modules/Home/BookingViewModel.dart';

class Ride {
  int id;
  int locationId;
  int vehicleTypeId;
  String pickupLocation;
  double pickupLatitude;
  double pickupLongitude;
  String dropLocation;
  double dropLatitude;
  double dropLongitude;
  int RideStatus;
  double distance;
  double duration;
  double totalFare;
  double distanceFare;
  double durationFare;
  String pickupPoint;
  String durationReadable;
  String RideDateTime;
  Ride(this.locationId, this.vehicleTypeId, this.pickupLocation,
      this.pickupLatitude, this.pickupLongitude, this.dropLocation,
      this.dropLatitude, this.dropLongitude,this.RideStatus,this.RideDateTime,this.pickupPoint);

  Ride.fromJson(Map<String,dynamic> json){
    locationId = json["LocationID"];
    vehicleTypeId = json["VehicleTypeID"];
    pickupLocation = json["PickupLocation"];
    pickupLatitude = json["PickupLatitude"].toDouble();
    pickupLongitude = json["PickupLongitude"].toDouble();
    dropLocation = json["DropLocation"];
    dropLatitude = json["DropLatitude"].toDouble();
    dropLongitude = json["DropLongitude"].toDouble();
    id = json["ID"];
    durationReadable = json["DurationReadable"]??"";
    durationFare = (json["DurationFare"]??0).toDouble();
    distanceFare = (json["DistanceFare"]??0).toDouble();
    totalFare = (json["TotalFare"]??0).toDouble();
    duration = (json["Duration"]??0).toDouble();
    distance = (json["Distance"]??0).toDouble();
    RideStatus = json["RideStatus"];
    RideDateTime = json["RideDateTime"];
    pickupPoint = json["PickupPoint"];
  }

  @override
  String toString() {
    return 'Ride{id: $id, locationId: $locationId, vehicleTypeId: $vehicleTypeId, pickupLocation: $pickupLocation, pickupLatitude: $pickupLatitude, pickupLongitude: $pickupLongitude, dropLocation: $dropLocation, dropLatitude: $dropLatitude, dropLongitude: $dropLongitude}';
  }


  String getDate(){
    var formateedDate = "";
    var parse = DateTime.parse(RideDateTime);
     formateedDate = DateFormat.yMd().add_jm().format(parse);
     return formateedDate;
  }

}
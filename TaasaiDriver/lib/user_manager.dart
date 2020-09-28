import 'dart:convert';

import 'package:get_it/get_it.dart';
import 'package:passenger_app/models/api/ride_accept_response.dart';
import 'package:rxdart/rxdart.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'models/ride.dart';
import 'models/user.dart';

enum DriverStatus {
  Online,
  Offline
}

enum RideStatus{
  None,
  Accepted,
  Arrived,
  Started,
  Stopped,
  Completed,
  Cancelled
}

class UserManager{

  User user;
  bool isLoggedIn;
  DriverStatus driverStatus;
  int vehicleId = 0;
  int vehicleTypeId = 0;
  BehaviorSubject driverStatusListener = BehaviorSubject.seeded(DriverStatus.Offline);
  BehaviorSubject rideCancelledListener = BehaviorSubject<Ride>();
  Ride currentRide;
  List<RideStop> stopList = [];
  BehaviorSubject rideAcceptListener = BehaviorSubject<Ride>();

  RideStatus rideStatus = RideStatus.None;

  UserManager() {
    SharedPreferences sharedPreferences = GetIt.instance.get();
    var userString = sharedPreferences.getString("user");
    isLoggedIn = sharedPreferences.getBool("isLoggedIn")??false;


    driverStatus = DriverStatus.Offline;
    if(userString!=null&&userString.length>0){
      user = User.fromJson(jsonDecode(userString));
    }
  }

  setUser(User user) {
    SharedPreferences sharedPreferences = GetIt.instance.get();
    sharedPreferences.setString("user",jsonEncode(user));
  }
  removeUser() {
    SharedPreferences sharedPreferences = GetIt.instance.get();
    sharedPreferences.setString("user","");
    sharedPreferences.setBool("isLoggedIn",false);
  }

}
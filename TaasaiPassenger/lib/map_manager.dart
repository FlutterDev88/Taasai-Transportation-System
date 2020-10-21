import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:passenger_app/models/api/nearby_drivers_response.dart';
import 'package:rxdart/rxdart.dart';

class MapManager {
  CameraPosition cameraPosition;
  LatLng currentLocation;
  LatLng pickupLocation;
  LatLng dropLocation;
  GoogleMapController googleMapController;
  BehaviorSubject<CameraPosition> cameraMoved = BehaviorSubject();
  BehaviorSubject<bool> drawRoute = BehaviorSubject();
  BehaviorSubject<List<DriverLocation>> nearByDrivers = BehaviorSubject();
}
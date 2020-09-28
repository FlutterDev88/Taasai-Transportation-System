import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:rxdart/rxdart.dart';

class MapManager {
  CameraPosition cameraPosition;
  LatLng currentLocation;
  BehaviorSubject<CameraPosition> cameraMoved = BehaviorSubject();
}
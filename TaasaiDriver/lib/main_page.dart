import 'dart:async';
import 'dart:math';
import 'package:background_location/background_location.dart';
import 'package:eva_icons_flutter/eva_icons_flutter.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get_it/get_it.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:passenger_app/map_manager.dart';
import 'package:passenger_app/models/ride_location.dart';
import 'package:passenger_app/modules/Components/loader.dart';
import 'package:passenger_app/modules/Home/home_page.dart';
import 'package:passenger_app/modules/Home/selectcar_page.dart';
import 'package:passenger_app/mqtt_manager.dart';
import 'package:rational/rational.dart';
import 'package:vector_math/vector_math.dart' as vector_math;
import 'dart:convert';

import 'api/api_client.dart';
import 'modules/new_request.dart';
import 'user_manager.dart';


class MainPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Main();
  }
}

class Main extends StatefulWidget {
  _MainState createState() => _MainState();
}

class _MainState extends State<Main> with SingleTickerProviderStateMixin {


  GoogleMapController _controller;
  UserManager userManager = GetIt.instance.get();
  MqttManager mqttManager = GetIt.instance.get();
  List<RideLocation> rideLocations = [];
  MapManager _mapManager = GetIt.instance.get();
  LatLng markerLatLng = LatLng(37.42796133580664, -122.085749655962);
  bool isMapMovedToCurrent = false;
  static final CameraPosition _kGooglePlex = CameraPosition(
    target: LatLng(37.42796133580664, -122.085749655962),
    zoom: 14.4746,
  );
  Map<MarkerId, Marker> markers = <MarkerId, Marker>{};
  List<String> menuItems = [
    "Earnings",
    "Reviews",
  ];
  List<IconData> menuItemIcons = [
    EvaIcons.creditCard,
    EvaIcons.star,
  ];

  final MarkerId markerId = MarkerId("driver");

  BitmapDescriptor markericon;
  bool isGoingOffline = false;

  DriverStatus driverStatus = DriverStatus.Offline;

  StreamSubscription driverStatusSubscription;
  getCurrentLocation() async {
    Position position = await Geolocator()
        .getCurrentPosition(desiredAccuracy: LocationAccuracy.medium);
    _mapManager.currentLocation = LatLng(position.latitude, position.longitude);
    _controller.moveCamera(
        CameraUpdate.newLatLng(LatLng(position.latitude, position.longitude)));
  }

  initialize() async {
    markericon = await BitmapDescriptor.fromAssetImage(ImageConfiguration(
      devicePixelRatio: 2.5
    ), "images/taxi_car.png");


  }

  @override
  void initState() {
    super.initState();
    BackgroundLocation.getPermissions(
      onGranted: () {
        // Start location service here or do something else
        BackgroundLocation.startLocationService();
        BackgroundLocation.getLocationUpdates((location) {
          if (_mapManager.currentLocation.latitude != location.latitude &&
              _mapManager.currentLocation.longitude != location.longitude) {
            Map<String, dynamic> data = {
              "latitude": _mapManager.currentLocation.latitude,
              "longitude": _mapManager.currentLocation.longitude,
            };
            MqttClientPayloadBuilder payloadBuilder =
                MqttClientPayloadBuilder();
            payloadBuilder.addString(jsonEncode(data));
            if(!isMapMovedToCurrent){
              _controller.moveCamera(
                  CameraUpdate.newCameraPosition(CameraPosition(
                    target: LatLng(location.latitude, location.longitude),
                    zoom: 18
                  ))
              );
              isMapMovedToCurrent = true;
            }
            _mapManager.currentLocation =
                LatLng(location.latitude, location.longitude);

            mqttManager.client.publishMessage(
                "locationUpdate", MqttQos.exactlyOnce, payloadBuilder.payload);

            if (userManager.rideStatus == RideStatus.Started) {
              rideLocations.add(RideLocation(
                  userManager.currentRide.id,
                  location.latitude,
                  location.longitude,
                  DateTime.now().millisecondsSinceEpoch));
              if (rideLocations.length % 15 == 0) {
                var tempList = rideLocations;
                rideLocations = [];
                ApiClient()
                    .updateRideLocation(userManager.currentRide.id, tempList)
                    .then((response) {})
                    .catchError((error) {});
              }
            }
            this.markerLatLng = LatLng(location.latitude, location.longitude);

            animateMarker(markerLatLng, markers[markerId], markerId);

          }
        });
      },
      onDenied: () {
        // Show a message asking the user to reconsider or do something else
      },
    );

    driverStatusSubscription =
        userManager.driverStatusListener.listen((status) {
      setState(() {
        this.driverStatus = status;
      });
    });

    mqttManager.connect(userManager.user.id, userManager.user.authToken);

    mqttManager.newRideListener.listen((ride) {
      debugPrint("\n\n New Ride Request Received \n\n");

      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => NewRequest(ride)));
    });

    final Marker marker = Marker(markerId: markerId, position: markerLatLng, icon: markericon);
    setState(() {
      markers[markerId] = marker;
    });
  }

  LatLng interpolate(double fraction, LatLng a, LatLng b) {
    var lat = (b.latitude - a.latitude) * fraction + a.latitude;
    var lngDelta = b.longitude - a.longitude;
    // Take the shortest path across the 180th meridian.
    if ((lngDelta.abs()) > 180) {
      lngDelta -= Rational.parse(lngDelta.toString()).signum * 360;
    }
    var lng = lngDelta * fraction + a.longitude;
    return LatLng(lat, lng);
  }


  animateMarker(LatLng endPosition,Marker marker,MarkerId id) async {
    final Marker newMarker = Marker(markerId: markerId,rotation: getBearing(marker.position, endPosition), position: endPosition,anchor: Offset(0.5, 0.5) , icon: markericon);


    setState(() {
      markers[markerId] = newMarker;
    });


  }


  double getBearing(LatLng begin, LatLng end) {
    double lat = (begin.latitude - end.latitude).abs();
    double lng = (begin.longitude - end.longitude).abs();

    if (begin.latitude < end.latitude && begin.longitude < end.longitude)
      return (vector_math.degrees(atan(lng / lat)));
    else if (begin.latitude >= end.latitude && begin.longitude < end.longitude)
      return  ((90 - vector_math.degrees(atan(lng / lat))) + 90);
    else if (begin.latitude >= end.latitude && begin.longitude >= end.longitude)
      return  (vector_math.degrees(atan(lng / lat)) + 180);
    else if (begin.latitude < end.latitude && begin.longitude >= end.longitude)
      return  ((90 - vector_math.degrees(atan(lng / lat))) + 270);
    return -1;
  }

  /*

  fun animateMarker( latitude:Double,longitude:Double,  taximarker : Marker?) {
            taximarker?.let{ marker->
                val startPosition = marker.getPosition();
                val endPosition = LatLng(latitude,longitude);

                val startRotation = marker.getRotation();

                val latLngInterpolator =  LatLngInterpolator.LinearFixed();
                val valueAnimator = ValueAnimator.ofFloat(0f, 1f);
                valueAnimator.duration = 1000
                valueAnimator.interpolator= LinearInterpolator()
                valueAnimator.addUpdateListener { animation ->
                    try {
                        val v = animation.animatedFraction
                        val newPosition = latLngInterpolator.interpolate(v, startPosition, endPosition);
                        marker.position = newPosition
                        marker.rotation = getRotation(v, startRotation.toDouble(),bearingBetweenLocations(startPosition,endPosition) ).toFloat();
                    } catch ( ex:Exception) {
                        Log.e("marker",ex.localizedMessage)
                    }
                }

                valueAnimator.start();

            }
        }

   */
  @override
  void dispose() {
    driverStatusSubscription.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: Drawer(
          child: SafeArea(
            child: Column(
              children: <Widget>[
                SizedBox(
                  height: 24,
                ),
                GestureDetector(
                  child: Row(
                    children: <Widget>[
                      Container(
                        height: 56,
                        width: 56,
                        margin: EdgeInsets.only(left: 16, right: 16),
                        decoration: BoxDecoration(
                            color: Colors.blue.shade200,
                            borderRadius: BorderRadius.circular(40)),
                        child: Center(
                            child: Text(userManager.user.name[0],
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white))),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            userManager.user.name,
                            style: TextStyle(
                                color: Colors.grey.shade900,
                                fontSize: 18,
                                fontWeight: FontWeight.bold),
                          ),
                          SizedBox(
                            height: 4,
                          ),
                          Text(
                            "View Profile",
                            style: TextStyle(
                                color: Colors.grey.shade400, fontSize: 14),
                          ),
                        ],
                      ),
                    ],
                  ),
                  onTap: () {},
                ),
                SizedBox(
                  height: 16,
                ),
                Divider(color: Colors.grey.shade300),
                Expanded(
                  child: ListView.builder(
                      itemCount: menuItems.length,
                      itemBuilder: (context, position) {
                        return InkWell(
                          child: GestureDetector(
                            onTap: () {},
                            child: Container(
                              padding: EdgeInsets.only(
                                  left: 28, right: 28, top: 16, bottom: 16),
                              child: Row(
                                children: <Widget>[
                                  Icon(
                                    menuItemIcons[position],
                                    size: 22,
                                    color: Colors.grey.shade800,
                                  ),
                                  SizedBox(
                                    width: 20,
                                  ),
                                  Text(
                                    menuItems[position],
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Colors.grey.shade900,
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ),
                        );
                      }),
                ),
              ],
            ),
          ),
        ),
        body: Builder(builder: (context) {
          return Stack(
            children: <Widget>[
              GoogleMap(
                mapType: MapType.normal,
                compassEnabled: false,
                myLocationEnabled: true,
                onCameraIdle: () {
                  _mapManager.cameraMoved.add(_mapManager.cameraPosition);
                },
                onCameraMove: (position) {
                  _mapManager.cameraPosition = position;
                },
                myLocationButtonEnabled: false,
                initialCameraPosition: _kGooglePlex,
                markers: Set<Marker>.of(markers.values),
                onMapCreated: (GoogleMapController controller) {
                  _controller = controller;
                  getCurrentLocation();
                },
              ),
              Container(
                child: HomePage(onMenuClicked: () {
                  Scaffold.of(context).openDrawer();
                }),
              )
            ],
          );
        }));
  }
}

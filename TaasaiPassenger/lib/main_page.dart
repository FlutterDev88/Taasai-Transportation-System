import 'dart:async';

import 'package:connectivity/connectivity.dart';
import 'package:eva_icons_flutter/eva_icons_flutter.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get_it/get_it.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:passenger_app/map_manager.dart';
import 'package:passenger_app/modules/About/about_page.dart';
import 'package:passenger_app/modules/Home/home_page.dart';
import 'package:passenger_app/modules/MyBookings/mybookings_page.dart';
import 'package:passenger_app/modules/MyProfile/myprofile_page.dart';
import 'package:passenger_app/modules/Payments/notifications.dart';
import 'package:passenger_app/modules/Promotions/promotion_page.dart';
import 'package:passenger_app/modules/Rating/rating_page.dart';
import 'package:passenger_app/mqtt_manager.dart';
import 'package:passenger_app/user_manager.dart';
import 'package:progress_indicators/progress_indicators.dart';

import 'api/api_client.dart';
import 'no_net_page.dart';


class MainPage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Main();
  }

}
class Main extends StatefulWidget{
  @override
  _MainState createState() => _MainState();
}

class _MainState extends State<Main> {
  var _currentindex = 0;
  GoogleMapController _controller;
// this will hold the generated polylines
  Set<Polyline> _polylines = {};
// this will hold each polyline coordinate as Lat and Lng pairs
  List<LatLng> polylineCoordinates = [];
// this is the key object - the PolylinePoints
// which generates every polyline between start and finish
  PolylinePoints polylinePoints = PolylinePoints();
  String googleAPIKey = "AIzaSyCmua_JtLFnNux2uKsi1sACWNm_qrSxlBo";
  MapManager _mapManager = GetIt.instance.get();
  MqttManager _mqttManager = GetIt.instance.get();
  UserManager _userManager = GetIt.instance.get();
 var isLocationLoaded = false;
 var locationAnimationEnd = false;
  static final CameraPosition initialCameraPosition = CameraPosition(
    target: LatLng(51.5074, 0.1278),
    zoom: 14,
  );

  FirebaseMessaging _firebaseMessaging = FirebaseMessaging();


  List<String> menuItems = [
    "Ride History",
    "Payments",
    "Refer & Earn",
    "About",
    "Rate Us"
  ];
  List<IconData> menuItemIcons = [
    EvaIcons.clock,
    EvaIcons.creditCard,
    EvaIcons.gift,
    EvaIcons.info,
    EvaIcons.star,
  ];

  StreamSubscription _mapIdleSubscription;
  Map<MarkerId,Marker> markers = <MarkerId,Marker>{};

  getCurrentLocation() async {
    Position position = await Geolocator().getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    debugPrint(position.toString());
    _mapManager.currentLocation = LatLng(position.latitude,position.longitude);

    _controller.animateCamera(CameraUpdate.newCameraPosition(CameraPosition(zoom:14,target: LatLng(position.latitude,position.longitude))));

    Timer(Duration(milliseconds: 500),(){
      setState(() {
        this.isLocationLoaded = true;
      });
    });



    Timer(Duration(milliseconds: 1200), (){
      setState(() {
        locationAnimationEnd = true;
      });
    });
  }

  StreamSubscription connectivitySubscription;

  @override
  void initState() {
    super.initState();
    connectivitySubscription = Connectivity().onConnectivityChanged.listen((ConnectivityResult result) {
      if(result == ConnectivityResult.none){
        Navigator.of(context).push(MaterialPageRoute(builder: (context)=>NoNetPage()));
      }
    });
    init();
  }


  init() async{
    var token = await _firebaseMessaging.getToken();

    ApiClient().updateFcm(token).then((response){

    }).catchError((error){

    });

    _mqttManager.connect(_userManager.user.id, _userManager.user.authToken);
    _mapManager.nearByDrivers.listen((drivers) async {
      markers.clear();
      Map<MarkerId,Marker> newMarkers = <MarkerId,Marker>{};
      for(var i=0;i<drivers.length;i++){

        MarkerId markerId = MarkerId(drivers[i].id.toString());
        Marker marker = Marker(
            markerId: markerId,
            position: LatLng(drivers[i].latitude,drivers[i].longitude),
            anchor: Offset(0.5,0.5),
            icon: await BitmapDescriptor.fromAssetImage(ImageConfiguration(devicePixelRatio: 3), "images/taxi_car.png")
      );
        newMarkers[markerId] = marker;

    }
      setState(() {
        markers.addAll(newMarkers);
      });
    });
    /*_mapManager.drawRoute.listen((isDraw){
      if(isDraw!=null){
        if(isDraw){
          setPolylines();
          debugPrint("set Polyline");
        }else{
          debugPrint("remove Polyline");

          setState(() {

            _polylines.clear();
          });
        }
      }

    });*/
  }

  setPolylines() async {
    List<PointLatLng> result = await
    polylinePoints?.getRouteBetweenCoordinates(
        googleAPIKey,
        _mapManager.pickupLocation.latitude,
        _mapManager.pickupLocation.longitude,
        _mapManager.dropLocation.latitude,
        _mapManager.dropLocation.longitude);
    if(result.isNotEmpty){
      // loop through all PointLatLng points and convert them
      // to a list of LatLng, required by the Polyline
      result.forEach((PointLatLng point){
        polylineCoordinates.add(
            LatLng(point.latitude, point.longitude));
      });
    }
    setState(() {
      // create a Polyline instance
      // with an id, an RGB color and the list of LatLng pairs
      Polyline polyline = Polyline(
          polylineId: PolylineId("Route"),
          color: Colors.black,
          width: 6,
          zIndex: 10000,
          points: polylineCoordinates
      );

      // add the constructed polyline as a set of points
      // to the polyline set, which will eventually
      // end up showing up on the map
      _polylines.add(polyline);
    });
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      drawer: Drawer(
        child: SafeArea(
          child: Column(
            children: <Widget>[
              SizedBox(height: 24,),
              GestureDetector(
                child: Row(
                children: <Widget>[
                  Container(
                    height: 56,
                    width: 56,
                    margin: EdgeInsets.only(left:16,right:16),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade200,
                      borderRadius: BorderRadius.circular(40)
                    ),
                    child: Center(child: Text(_userManager.user.name[0].toUpperCase(),style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold,color: Colors.white))),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(_userManager.user.name,style: TextStyle(color:Colors.grey.shade900,fontSize: 18,fontWeight: FontWeight.bold),),
                      SizedBox(height: 4,),
                      Text("View Profile",style: TextStyle(color:Colors.grey.shade400,fontSize: 14),),
                    ],
                  ),
                ],
              ),
              onTap: (){
                Navigator.push(context, MaterialPageRoute(builder: (context){
                  return MyProfilePage();
                }));
              },
              ),
              SizedBox(height: 16,),
              Divider(color: Colors.grey.shade300),
              Expanded(
                child: ListView.builder(
                    itemCount: menuItems.length,
                    itemBuilder: (context,position){
                      return InkWell(
                        child: GestureDetector(
                          onTap: (){
                              if(position == 0){
                                return Navigator.push(context, MaterialPageRoute(builder: (context){
                                  return MyBookingsPage();
                                }));
                              }else if(position == 3){
                                return Navigator.push(context, MaterialPageRoute(builder: (context){
                                  return AboutPage();
                                }));
                              }else if(position == 1){
                                return Navigator.push(context, MaterialPageRoute(builder: (context){
                                  return PaymentsPage();
                                }));
                              }
                              else if(position == 4){
                                return Navigator.push(context, MaterialPageRoute(builder: (context){
                                  return RatingPage();
                                }));
                              }else if(position == 2){
                                return Navigator.push(context, MaterialPageRoute(builder: (context){
                                  return PromotionPage();
                                }));
                              }
                              else{
                                return null;
                              }
                          },
                          child: Container(
                            padding: EdgeInsets.only(left:28,right:28,top: 16,bottom: 16),
                            child: Row(
                              children: <Widget>[
                                Icon(menuItemIcons[position],size: 22,color: Colors.grey.shade800,),
                                SizedBox(width: 20,),
                                Text(menuItems[position],style: TextStyle(fontSize: 18,color: Colors.grey.shade900,),)
                              ],
                            ),
                          ),
                        ),
                      );
                    }),
              ),
              Container(
                width: double.infinity,
                height: 54,
                margin: EdgeInsets.all(24),
                decoration: BoxDecoration(
                    boxShadow:  [
                      BoxShadow(
                        color: Colors.greenAccent.shade700,
                        blurRadius: 4.0, // has the effect of softening the shadow
                        spreadRadius: 0.25, // has the effect of extending the shadow
                        offset: Offset(
                          1.0, // horizontal, move right 10
                          1.0, // vertical, move down 10
                        ),
                      )
                    ],
                    borderRadius: BorderRadius.circular(30)
                ),
                child: FlatButton(
                  onPressed: (){

                  },
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30)
                  ),
                  color: Colors.greenAccent.shade700,
                  child: Text("Drive With Taasai".toUpperCase(),style: TextStyle(fontSize:14,fontWeight: FontWeight.bold,color: Colors.white),),
                ),
              )

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
              onCameraIdle: (){
                debugPrint("camera idle");
              },
              onCameraMove: (position){
                _mapIdleSubscription?.cancel();
                _mapIdleSubscription =
                    Future.delayed(Duration(milliseconds: 200))
                        .asStream()
                        .listen((value) {
                      _mapManager.cameraPosition = position;
                      _mapManager.cameraMoved.add(_mapManager.cameraPosition);

                    });
              },
              polylines: _polylines,
              myLocationButtonEnabled: false,
              initialCameraPosition: initialCameraPosition,
              markers: Set<Marker>.of(markers.values),
              onMapCreated: (GoogleMapController controller) {
                _controller = (controller);
                _mapManager.googleMapController = controller;
                getCurrentLocation();

              },
            ),
            if(locationAnimationEnd) HomePage(
                onMenuClicked:(){
                  Scaffold.of(context).openDrawer();
                }
            ),
            if(!locationAnimationEnd)Center(
              child: AnimatedContainer(
                duration: Duration(milliseconds: 1000),
                curve: Curves.bounceOut,
                height: MediaQuery.of(context).size.height,
                width: MediaQuery.of(context).size.width,
                color:(isLocationLoaded)?Colors.transparent:Colors.greenAccent.shade700,
                child: (isLocationLoaded)?Container(): Center(
                  child: JumpingText("taasai",style: TextStyle(fontSize: 60,fontWeight: FontWeight.w900,height:1.4,color: Colors.white),
                ),

                ),
              ),
            )
        ]);
      })
    );
  }

  @override
  void dispose() {
    connectivitySubscription.cancel();
    super.dispose();
  }

}
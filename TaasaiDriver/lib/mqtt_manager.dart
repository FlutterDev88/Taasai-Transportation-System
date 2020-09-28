import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:passenger_app/models/api/getMessageResponse.dart';
import 'package:rxdart/rxdart.dart';

import 'api/api_client.dart';
import 'map_manager.dart';
import 'models/api/invoice_response.dart';
import 'models/ride.dart';
import 'user_manager.dart';
import 'utils/constants.dart' as Constant;

class MqttManager {
  final MqttClient client = MqttClient(Constant.Constants.BASE_URL_MQTT, '');
  UserManager userManager = GetIt.instance.get();

  MapManager _mapManager = GetIt.instance.get();
  BehaviorSubject newMessageListener = BehaviorSubject<RideMessage>();
  BehaviorSubject newRideListener = BehaviorSubject<Ride>();
  InvoiceResponse invoiceResponse;

  updateLocation(){
    if(_mapManager.currentLocation!=null){
      Map<String,dynamic> data = {
        "latitude":_mapManager.currentLocation.latitude,
        "longitude":_mapManager.currentLocation.longitude,
      };
      MqttClientPayloadBuilder payloadBuilder = MqttClientPayloadBuilder();
      payloadBuilder.addString(jsonEncode(data));
      client.publishMessage("locationUpdate",MqttQos.exactlyOnce,payloadBuilder.payload );
      if(userManager.driverStatus == DriverStatus.Online){
        ApiClient().goOnline();
      }
    }

  }

  connect(int id,String token) async{

      /// A websocket URL must start with ws:// or wss:// or Dart will throw an exception, consult your websocket MQTT broker
      /// for details.
      /// To use websockets add the following lines -:
      /// client.useWebSocket = true;
      /// client.port = 80;  ( or whatever your WS port is)
      /// There is also an alternate websocket implementation for specialist use, see useAlternateWebSocketImplementation
      /// Note do not set the secure flag if you are using wss, the secure flags is for TCP sockets only.
      /// You can also supply your own websocket protocol list or disable this feature using the websocketProtocols
      /// setter, read the API docs for further details here, the vast majority of brokers will support the client default
      /// list so in most cases you can ignore this.

      /// Set logging on if needed, defaults to off
      client.logging(on: true );

      print('EXAMPLE::Mosquitto client connecting....');
      client.clientIdentifier = "driver#"+id.toString();
      client.onDisconnected = (){
        debugPrint("Mqtt Disconnected");
        connect(id, token);

      };
      /// Connect the client, any errors here are communicated by raising of the appropriate exception. Note
      /// in some circumstances the broker will just disconnect us, see the spec about this, we however eill
      /// never send malformed messages.
      try {
        await client.connect(token,token);

      } on Exception catch (e) {
        print('EXAMPLE::client exception - $e');
        client.disconnect();
      }

      /// Check we are connected
      if (client.connectionStatus.state == MqttConnectionState.connected) {
        print('EXAMPLE::Mosquitto client connected');
        client.subscribe("driver/$id/new_ride_request", MqttQos.exactlyOnce);
        client.subscribe("driver/$id/ride_accepted", MqttQos.exactlyOnce);
        client.subscribe("driver/$id/ride_cancelled", MqttQos.exactlyOnce);
        client.subscribe("driver/$id/new_message", MqttQos.exactlyOnce);
        client.updates.listen((List<MqttReceivedMessage<MqttMessage>> event) {
          final MqttPublishMessage recMess = event[0].payload;
          final String pt = MqttPublishPayload.bytesToStringAsString(recMess.payload.message);

          if(event[0].topic == "driver/$id/new_ride_request"){
            debugPrint("\n\n New Ride Request Received \n\n");
            Map<String,dynamic> json = jsonDecode(pt);
            Ride ride = Ride.fromJson(json);
            debugPrint(ride.toString());
            newRideListener.add(ride);
          }else if(event[0].topic == "driver/$id/ride_cancelled"){
            userManager.rideStatus = RideStatus.None;
            userManager.rideCancelledListener.add(userManager.currentRide);
          }
          else if(event[0].topic == "driver/$id/new_message"){
            Map<String,dynamic> json = jsonDecode(pt);
            var message = RideMessage.fromJson(json);
            newMessageListener.add(message);
          }

          /// The above may seem a little convoluted for users only interested in the
          /// payload, some users however may be interested in the received publish message,
          /// lets not constrain ourselves yet until the package has been in the wild
          /// for a while.
          /// The payload is a byte buffer, this will be specific to the topic
          print(
              'EXAMPLE::Change notification:: topic is <${event[0].topic}>, payload is <-- $pt -->');
          print('');
        });
        updateLocation();
      } else {
        /// Use status here rather than state if you also want the broker return code.
        print(
            'EXAMPLE::ERROR Mosquitto client connection failed - disconnecting, status is ${client.connectionStatus}');
        client.disconnect();
      }
  }
}
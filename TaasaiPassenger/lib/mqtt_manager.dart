import 'dart:async';
import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:passenger_app/models/api/getMessageResponse.dart';
import 'package:passenger_app/models/api/invoice_response.dart';
import 'package:passenger_app/models/ride_accept_response.dart';
import 'package:rxdart/rxdart.dart';

import 'utils/constants.dart' as Constant;

enum RideStatus {
  Booked,
  DriverAssigned,
  DriverArrived,
  Started,
  Waiting,
  Stopped,
  InvoiceGenerated,
  Cancelled,
  CancelledByDriver,
  DriverNotAvailable
}

class MqttManager {

  BehaviorSubject rideStatusListener = BehaviorSubject<RideStatus>();
  BehaviorSubject<RideMessage> messageListener = BehaviorSubject<RideMessage>();

  RideAcceptResponse currentRideDetails;
  InvoiceResponse invoiceResponse;

  connect(int id,String token) async{
    final MqttClient client = MqttClient(Constant.Constants.BASE_URL_MQTT, '');

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
      client.logging(on: true);

    client.onDisconnected = (){
      debugPrint("Mqtt Disconnected");
      Timer(Duration(seconds: 3),(){
        connect(id, token);
      });

    };
      print('EXAMPLE::Mosquitto client connecting....');
      client.clientIdentifier = "passenger#"+id.toString();
      client.keepAlivePeriod = 300;
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
        client.subscribe("passenger/$id/driver_unavailable", MqttQos.exactlyOnce);
        client.subscribe("passenger/$id/ride_cancelled", MqttQos.exactlyOnce);
        client.subscribe("passenger/$id/ride_accepted", MqttQos.exactlyOnce);
        client.subscribe("passenger/$id/ride_invoice", MqttQos.exactlyOnce);
        client.subscribe("passenger/$id/new_message", MqttQos.exactlyOnce);
        client.updates.listen((List<MqttReceivedMessage<MqttMessage>> event) {
          final MqttPublishMessage recMess = event[0].payload;
          final String pt =
          MqttPublishPayload.bytesToStringAsString(recMess.payload.message);

          if(event[0].topic == "passenger/$id/driver_unavailable"){
            rideStatusListener.add(RideStatus.DriverNotAvailable);
          } else if(event[0].topic == "passenger/$id/ride_accepted"){
            Map<String,dynamic> json = jsonDecode(pt);
            currentRideDetails = RideAcceptResponse.fromJson(json);
            rideStatusListener.add(RideStatus.DriverAssigned);
          } else if(event[0].topic == "passenger/$id/ride_invoice"){
            Map<String,dynamic> json = jsonDecode(pt);
            invoiceResponse = InvoiceResponse.fromJson(json);
            rideStatusListener.add(RideStatus.InvoiceGenerated);
          } else if(event[0].topic == "passenger/$id/ride_cancelled"){
            rideStatusListener.add(RideStatus.CancelledByDriver);
          } else if(event[0].topic == "passenger/$id/new_message"){
            Map<String,dynamic> json = jsonDecode(pt);
            var newMessage = RideMessage.fromJson(json);
            messageListener.add(newMessage);
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
      } else {
        /// Use status here rather than state if you also want the broker return code.
        print(
            'EXAMPLE::ERROR Mosquitto client connection failed - disconnecting, status is ${client.connectionStatus}');
        client.disconnect();
      }
  }
}
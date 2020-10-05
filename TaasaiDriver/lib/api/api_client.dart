
import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:get_it/get_it.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:passenger_app/models/api/getMessageResponse.dart';
import 'package:passenger_app/models/api/get_documents_response.dart';
import 'package:passenger_app/models/api/get_location_response.dart';
import 'package:passenger_app/models/api/get_ride_response.dart';
import 'package:passenger_app/models/api/get_timeline_response.dart';
import 'package:passenger_app/models/api/get_vehicle_assignments_response.dart';
import 'package:passenger_app/models/api/get_vehicle_type_response.dart';
import 'package:passenger_app/models/api/get_vehicles_response.dart';
import 'package:passenger_app/models/api/invoice_response.dart';
import 'package:passenger_app/models/api/ride_accept_response.dart';
import 'package:passenger_app/models/api/send_otp_response.dart';
import 'package:passenger_app/models/api/verify_otp_response.dart';
import 'package:passenger_app/models/ride_location.dart';
import 'package:passenger_app/utils/constants.dart';

import '../models/api/generic_response.dart';
import '../models/api/generic_response.dart';
import '../user_manager.dart';
import 'package:http/http.dart' as http;

class ApiClient {

  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: Constants.BASE_URL,
    )
  );
  
  ApiClient(){
    _dio.interceptors.add(LogInterceptor(responseBody: true,request:true));
  }

  getToken() {
   UserManager userManager = GetIt.instance.get();
    return userManager.user.authToken;
  }

  Future<SendOtpResponse> SendOtp(String mobile,int dialCode,String countryCode) async {
    try {
      Response response = await _dio.post("/sendOtp",data: {
        "CountryCode":countryCode,
        "DialCode":dialCode,
        "MobileNumber":mobile,
      });
      return SendOtpResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return SendOtpResponse.withError("$error");
    }
  }

  Future<GetVehicleAssignmentsResponse> getVehicleAssignments() async {
    try {
      Response response = await _dio.post("/getVehicleAssignments",data: {},options:Options(
          headers: {
            "Authorization": await getToken()
          }));
      return GetVehicleAssignmentsResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetVehicleAssignmentsResponse.withError("$error");
    }
  }

  Future<GenericResponse> goOnline() async {
    try {
      Response response = await _dio.post("/goOnline",data: {},options:Options(
          headers: {
            "Authorization": await getToken()
          }));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }

  Future<GenericResponse> cancelRide(int id) async {
    try {
      Response response = await _dio.post("/cancelRide",data: {
        "ride_id":id,
      },options:Options(
          headers: {
            "Authorization": await getToken()
          }));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }
  Future<GenericResponse> goOffline() async {
    try {
      Response response = await _dio.post("/goOffline",data: {},options:Options(
          headers: {
            "Authorization": await getToken()
          }));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }

  Future<GetRideResponse> getRides() async {
    try {
      Response response = await _dio.post("/getRides",data: {},options:Options(
          headers: {
            "Authorization": await getToken()
          }));
      return GetRideResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetRideResponse.withError("$error");
    }
  }

  Future<InvoiceResponse> getRide(int id) async {
    try {
      Response response = await _dio.post("/getRideDetails/$id",data: {

      },options:Options(
          headers: {
            "Authorization": await getToken()
          }));
      return InvoiceResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return InvoiceResponse.withError("$error");
    }
  }

  Future<GetLocationResponse> getActiveOperators() async {
    try {
      Response response = await _dio.get("/getActiveOperators");
      return GetLocationResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetLocationResponse.withError("$error");
    }
  }

  Future<GetDocumentsResponse> getDriverDocuments(int id) async {
    try {
      Response response = await _dio.get("/getDriverDocs/$id",options: Options(
        headers: {
          "Authorization": await getToken()
        }
      ));
      return GetDocumentsResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetDocumentsResponse.withError("$error");
    }
  }

  Future<GetVehicleTypeResponse> getActiveVehicleTypes() async {
    try {
      Response response = await _dio.get("/getActiveVehicleTypes");
      return GetVehicleTypeResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetVehicleTypeResponse.withError("$error");
    }
  }


  Future<GetTimelineResponse> getRideTimeline(int id) async {
    try {
      Response response = await _dio.post("/getRideTimeline/$id",data: {

      },options:Options(
          headers: {
            "Authorization": await getToken()
          }));
      return GetTimelineResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetTimelineResponse.withError("$error");
    }
  }

  Future<GenericResponse> rateDriver(int RideID,String Review,double Rating) async {
    try {
      Response response = await _dio.post("/rateDriver",data: {
        "RideID":RideID,
        "Review":Review,
        "Rating":Rating
      },options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }

  Future<VerifyOtpResponse> VerifyOtp(String mobile,int dialCode,String countryCode,String otp) async {
    try {
      Response response = await _dio.post("/verifyOtp",data: {
        "CountryCode":countryCode,
        "DialCode":dialCode,
        "MobileNumber":mobile,
        "Otp":otp,
      });
      return VerifyOtpResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return VerifyOtpResponse.withError("$error");
    }
  }
  Future<GetVehiclesResponse> GetVehicles(LatLng pickup,LatLng drop) async {
    try {
      Response response = await _dio.post("/getVehicleTypes",data: {
        "pickup_latitude":pickup.latitude.toString(),
        "pickup_longitude":pickup.longitude.toString(),
        "drop_latitude":drop.latitude.toString(),
        "drop_longitude":drop.longitude.toString(),
      },options:Options(
      headers: {
      "Authorization": await getToken()
      },
      ));
      return GetVehiclesResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetVehiclesResponse.withError("$error");
    }
  }
  Future<RideAcceptResponse> acceptRide(int rideId,int vehicleId) async {
    try {
      Response response = await _dio.post("/acceptRide",data: {
        "ride_id": rideId,
        "vehicle_id":vehicleId,
      },options:Options(
      headers: {
      "Authorization": await getToken()
      },
      ));
      return RideAcceptResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return RideAcceptResponse.withError("$error");
    }
  }

  Future<RideAcceptResponse> checkQueuedRide() async {
    try {
      Response response = await _dio.post("/checkQueuedRide",data: {},options:Options(
      headers: {
      "Authorization": await getToken()
      },
      ));
      return RideAcceptResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return RideAcceptResponse.withError("$error");
    }
  }


  Future<GenericResponse> arrivedToPickup(int rideID) async {
    try {
      Response response = await _dio.post("/driverArrived/$rideID",options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }

  Future<GetMessageResponse> getMessages(int id) async {
    try {
      Response response = await _dio.post("/getMessages/$id",options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GetMessageResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetMessageResponse.withError("$error");
    }
  }

  Future<GenericResponse> sendMessage(String message,int from,int rideId) async {
    try {
      Response response = await _dio.post("/sendMessage",data: {
        "Message":message,
        "From":from,
        "RideID":rideId,
      },options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }


  Future<GenericResponse> updateRideLocation(int rideID,List<RideLocation> list) async {
    try {
      Response response = await _dio.post("/updateRideLocations",data: {
        "RideID":rideID,
        "Locations":list
      },options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }

  Future<GenericResponse> startTrip(int rideID) async {
    try {
      Response response = await _dio.post("/startTrip/$rideID",options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }

  Future<InvoiceResponse> stopTrip(int rideID) async {
    try {
      Response response = await _dio.post("/stopTrip/$rideID",options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return InvoiceResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return InvoiceResponse.withError("$error");
    }
  }

  Future<GenericResponse> submit() async {
    try {
      Response response = await _dio.post("/submitForApproval",options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }

  Future<VerifyOtpResponse> getDriverDetails() async {
    try {
      Response response = await _dio.post("/getDriverDetails",options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return VerifyOtpResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return VerifyOtpResponse.withError("$error");
    }
  }


  Future<GenericResponse> uploadDriverDocument(
      int id,
      File documentImage
      ) async {

    try {

      FormData formData = FormData();
      formData.fields.add(MapEntry("id",id.toString()));
      formData.files.addAll([
        MapEntry(
          "document_image",
          MultipartFile.fromFileSync(documentImage.path),
        ),
      ]);
      debugPrint(formData.fields.toString());
      Response response = await _dio.post("/uploadDriverDocument",data: formData,options: Options(
        headers: {
          "Authorization": await getToken()
        }
      ));
      return GenericResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GenericResponse.withError("$error");
    }
  }


}
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:passenger_app/models/api/generic_response.dart';
import 'package:passenger_app/models/api/getMessageResponse.dart';
import 'package:passenger_app/models/api/get_refer_code_response.dart';
import 'package:passenger_app/models/api/get_ridetimeline_response.dart';
import 'package:passenger_app/models/api/get_vehicles_response.dart';
import 'package:passenger_app/models/api/getride_response.dart';
import 'package:passenger_app/models/api/invoice_response.dart';
import 'package:passenger_app/models/api/nearby_drivers_response.dart';
import 'package:passenger_app/models/api/ride_booking_response.dart';
import 'package:passenger_app/models/api/send_otp_response.dart';
import 'package:passenger_app/models/api/verify_otp_response.dart';
import 'package:passenger_app/models/ride.dart';
import 'package:passenger_app/modules/Home/BookingViewModel.dart';
import 'package:passenger_app/utils/constants.dart';

import '../user_manager.dart';

class ApiClient {

  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: Constants.BASE_URL,
    )
  );
  
  ApiClient(){
    _dio.interceptors.add(LogInterceptor(responseBody: true,requestBody: true,request:true));
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

  Future<VerifyOtpResponse> VerifyOtp(String mobile,int dialCode,String countryCode,String otp,String name,String referCode) async {
    try {
      Response response = await _dio.post("/verifyOtp",data: {
        "CountryCode":countryCode,
        "DialCode":dialCode,
        "MobileNumber":mobile,
        "Otp":otp,
        "Name":name,
        "ReferCode":referCode,
      });
      return VerifyOtpResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return VerifyOtpResponse.withError("$error");
    }
  }
  Future<GetVehiclesResponse> GetVehicles(LatLng pickup,LatLng drop,List<TripLocation> stopsList) async {
    try {
      Response response = await _dio.post("/getVehicleTypes",data: {
        "pickup_latitude":pickup.latitude.toString(),
        "pickup_longitude":pickup.longitude.toString(),
        "drop_latitude":drop.latitude.toString(),
        "drop_longitude":drop.longitude.toString(),
        "stop_locations":stopsList,
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

  Future<GenericResponse> cancelRide(int rideId) async {
    try {
      Response response = await _dio.post("/cancelRide",data: {
        "ride_id":rideId
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

  Future<GetReferCodeResponse> getReferCode() async {
    try {
      Response response = await _dio.post("/getReferCode",data: {

      },options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GetReferCodeResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetReferCodeResponse.withError("$error");
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


  Future<GenericResponse> sendMessages(int rideId,int from,String message) async {
    try {
      Response response = await _dio.post("/sendMessage",data: {
        "Message":message,
        "From":from,
        "RideID":rideId
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

  Future<GenericResponse> updateFcm(String token) async {
    try {
      Response response = await _dio.post("/updateFcm",data: {
        "Token":token
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

  Future<NearbyDriversResponse> getNearbyDrivers(LatLng latLng) async {
    try {
      Response response = await _dio.post("/getNearestDrivers",data: {
        "latitude":latLng.latitude,
        "longitude":latLng.longitude,
      },options:Options(
      headers: {
      "Authorization": await getToken()
      },
      ));
      return NearbyDriversResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return NearbyDriversResponse.withError("$error");
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

  Future<InvoiceResponse> getRideDetail(int id) async {
    try {
      Response response = await _dio.post("/getRideDetails/$id",data: {

      },options:Options(
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

  Future<GetRideTimelineResponse> getRideTimeline(int id) async {
    try {
      Response response = await _dio.post("/getRideTimeline/$id",data: {

      },options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GetRideTimelineResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetRideTimelineResponse.withError("$error");
    }
  }

  Future<GetRideResponse> getRides() async {
    try {
      Response response = await _dio.post("/getRides",data: {},options:Options(
        headers: {
          "Authorization": await getToken()
        },
      ));
      return GetRideResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return GetRideResponse.withError("$error");
    }
  }

  Future<RideBookingResponse> BookRide(Ride ride,List<TripLocation> stopsList) async {
    try {
      var data = {
        "Ride":{
          "PickupLatitude":ride.pickupLatitude,
          "PickupLongitude":ride.pickupLongitude,
          "DropLatitude":ride.dropLatitude,
          "DropLongitude":ride.dropLongitude,
          "PickupLocation":"",
          "DropLocation":"",
          "LocationID":ride.locationId,
          "VehicleTypeID":ride.vehicleTypeId,
        },
        "StopLocation": stopsList
      };


      Response response = await _dio.post("/bookRide",data: data,options:Options(
      headers: {
      "Authorization": await getToken()
      },
      ));
      return RideBookingResponse.fromJson(response.data);
    } catch (error, stacktrace) {
      print("Exception occured: $error stackTrace: $stacktrace");
      return RideBookingResponse.withError("$error");
    }
  }




}
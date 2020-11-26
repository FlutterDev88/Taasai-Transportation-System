import '../user.dart';

class VerifyOtpResponse {
  bool status;
  String message;
  User userDetail;
  VerifyOtpResponse(this.status, this.message,this.userDetail);

  VerifyOtpResponse.fromJson(Map<String, dynamic> json)
      : status = json["Status"],
        userDetail = User.fromJson(json["UserDetail"]),
        message = json["Message"];

  VerifyOtpResponse.withError(String errorValue)
      : status = false,
        message = errorValue;
}
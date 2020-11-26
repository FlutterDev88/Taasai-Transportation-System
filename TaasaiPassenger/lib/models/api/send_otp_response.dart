

class SendOtpResponse {
  bool status;
  String message;
  bool isNew;

  SendOtpResponse(this.status, this.message,this.isNew);

  SendOtpResponse.fromJson(Map<String, dynamic> json)
      : status = json["Status"],
        isNew = json["IsNew"]??true,
        message = json["Message"];

  SendOtpResponse.withError(String errorValue)
      : status = false,
        message = errorValue;
}
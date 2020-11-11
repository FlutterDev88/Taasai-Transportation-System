class User {
  int id;
  bool isProfileCompleted;
  String authToken;
  String name;
  String mobileNumber;
  int dialCode;
  User(
      {
        this.id,
        this.isProfileCompleted,
        this.authToken,
        this.name,
        this.dialCode,
        this.mobileNumber,
      }
  );

  User.fromJson(Map<String, dynamic> json) {
    id = json['ID'];
    isProfileCompleted = json['IsProfileCompleted'];
    authToken = json['AuthToken'];
    name = json['Name'];
    mobileNumber = json['MobileNumber'];
    dialCode = json['DialCode'];
  }


  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['ID'] = this.id;
    data['IsProfileCompleted'] = this.isProfileCompleted;
    data['AuthToken'] = this.authToken;
    data['Name'] = this.name;
    data['MobileNumber'] = this.mobileNumber;
    data['DialCode'] = this.dialCode;
    return data;
  }
}
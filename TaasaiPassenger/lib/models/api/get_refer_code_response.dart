class GetReferCodeResponse{
  bool status;
  String referCode;
  GetReferCodeResponse({this.status,this.referCode});

  GetReferCodeResponse.fromJson(Map<String, dynamic>json){
    this.status = json['Status'];
    this.referCode = json['ReferCode']??"";
  }
  GetReferCodeResponse.withError(String error){
    this.status = false;
  }
}
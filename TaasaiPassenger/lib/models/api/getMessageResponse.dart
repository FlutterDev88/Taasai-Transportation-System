class GetMessageResponse{
  List<RideMessage>rideMessage;
  String message;
  GetMessageResponse({this.rideMessage,this.message});

  GetMessageResponse.fromJson(List<dynamic>list){
    this.message="";
    this.rideMessage = list.map<RideMessage>((i)=>RideMessage.fromJson(i)).toList();
  }
  GetMessageResponse.withError(String error){
    this.message = error;
    this.rideMessage = [];
  }
}

class RideMessage{
  String message;
  int rideId;
  int from;
  RideMessage({this.message,this.rideId,this.from});
  RideMessage.fromJson(Map<String, dynamic>json){
    this.message = json['Message'];
    this.from = json['From'];
    this.rideId = json['RideID'];
  }
}
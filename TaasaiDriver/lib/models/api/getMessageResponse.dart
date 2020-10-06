class GetMessageResponse{
  List<RideMessage>rideMessage;
  String message;
  GetMessageResponse({this.rideMessage,this.message});

  GetMessageResponse.fromJson(List<dynamic>list){
    this.message = "";
    this.rideMessage = list.map<RideMessage>((i)=>RideMessage.fromJson(i)).toList();
  }

  GetMessageResponse.withError(String error){
    this.rideMessage = [];
    this.message = error;
  }
}

class RideMessage{
  String message;
  int from;
  int rideId;
  RideMessage({this.from,this.rideId,this.message});

  RideMessage.fromJson(Map<String, dynamic>json){
    this.message = json['Message'];
    this.from = json['From'];
    this.rideId = json['RideID'];
  }
}
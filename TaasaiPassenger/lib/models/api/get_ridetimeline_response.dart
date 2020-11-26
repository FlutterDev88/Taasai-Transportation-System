import 'package:intl/intl.dart';

class GetRideTimelineResponse{
  List<RideEventLog> rideeventlog;
  String message;
  GetRideTimelineResponse({this.rideeventlog});

  GetRideTimelineResponse.fromJson(List<dynamic> list){
    this.rideeventlog = list.map<RideEventLog>((i)=>RideEventLog.fromJson(i)).toList();
    this.message = "";
  }

  GetRideTimelineResponse.withError(error){
    this.rideeventlog = [];
    this.message = error;
  }
}


class RideEventLog{
  String Message;
  String CreatedAt;
  RideEventLog({this.Message,this.CreatedAt});

  RideEventLog.fromJson(Map<String,dynamic> json){
    this.Message = json["Message"];
    this.CreatedAt = json["CreatedAt"];
  }

  String getDate(){
    var formatedDate = "";
    var parse = DateTime.parse(this.CreatedAt);
    formatedDate = DateFormat.yMd().add_jm().format(parse);
    return formatedDate;
  }
}
import 'package:intl/intl.dart';
import 'package:passenger_app/models/ride.dart';

class GetTimelineResponse{
  String message;
  List<RideEventLog>rideeventlog;
  GetTimelineResponse({this.rideeventlog,this.message});

  GetTimelineResponse.fromJson(List<dynamic>list){
    this.message = "";
    this.rideeventlog = list.map<RideEventLog>((i)=>RideEventLog.fromJson(i)).toList();
  }

  GetTimelineResponse.withError(error){
    this.message = error;
    this.rideeventlog = [];
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
    var formattedDate = "";
    var parse = DateTime.parse(CreatedAt);
    formattedDate = DateFormat.yMd().add_jm().format(parse);
    return formattedDate;
  }

}
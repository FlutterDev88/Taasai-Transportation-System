class GetLocationResponse{
  String message;
  List<Location>location;
  GetLocationResponse({this.location,this.message});

  GetLocationResponse.fromJson(List<dynamic>list){
    this.message = "";
    this.location = list.map<Location>((i)=>Location.fromJson(i)).toList();
  }

  GetLocationResponse.withError(error){
    this.message = error;
    this.location = [];
  }
}

class Location{
  String locationName;
  int id;
  Location({this.locationName,this.id});

  Location.fromJson(Map<String,dynamic> json){
    this.locationName = json["LocationName"];
    this.id = json["ID"];
  }

}
class RideLocation{
  int Id;
  double Latitude;
  double Longitude;
  int UnixTime;


  RideLocation(this.Id, this.Latitude, this.Longitude, this.UnixTime);

  RideLocation.fromJson(Map<String,dynamic> json){
    Id= json["Id"];
    Latitude = json["Latitude"];
    Longitude = json["Longitude"];
    UnixTime = json["UnixTime"];
  }

  Map<String, dynamic> toJson() =>
      {
        'Id': Id,
        'Latitude': Latitude,
        'Longitude': Longitude,
        'UnixTime': UnixTime,
      };

}

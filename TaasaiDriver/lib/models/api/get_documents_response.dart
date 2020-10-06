

class GetDocumentsResponse{
  String message;
  List<DriverDocuments>documents;
  GetDocumentsResponse({this.documents,this.message});

  GetDocumentsResponse.fromJson(List<dynamic>list){
    this.message = "";
    this.documents = list.map<DriverDocuments>((i)=>DriverDocuments.fromJson(i)).toList();
  }

  GetDocumentsResponse.withError(error){
    this.message = error;
    this.documents = [];
  }
}

class DriverDocuments{
  String name;
  int id;
  bool isUploaded;
  DriverDocuments({this.name,this.id,this.isUploaded});

  DriverDocuments.fromJson(Map<String,dynamic> json){
    this.name = json["Name"];
    this.id = json["ID"];
    this.isUploaded = json['IsUploaded'];
  }

}
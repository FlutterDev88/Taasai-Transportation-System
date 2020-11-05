import 'package:passenger_app/modules/Country/country_page.dart';

class AuthViewModel{
  Country country = Country(name:"India",countryCode:"IN",dialCode:91,image:"images/flag.png");
  String mobileNumber="";

  static final AuthViewModel _singleton = AuthViewModel._internal();

  factory AuthViewModel() {
    return _singleton;
  }

  AuthViewModel._internal();
}
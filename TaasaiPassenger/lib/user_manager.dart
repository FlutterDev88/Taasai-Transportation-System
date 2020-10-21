import 'dart:convert';

import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'models/user.dart';

class UserManager{

  User user;
  bool isLoggedIn;

  UserManager() {
    SharedPreferences sharedPreferences = GetIt.instance.get();
    var userString = sharedPreferences.getString("user");
    isLoggedIn = sharedPreferences.getBool("isLoggedIn")??false;
    if(userString!=null&&userString.length>0){
      user = User.fromJson(jsonDecode(userString));
    }
  }

  setUser(User user) {
    SharedPreferences sharedPreferences = GetIt.instance.get();
    sharedPreferences.setString("user",jsonEncode(user));
  }
  removeUser() {
    SharedPreferences sharedPreferences = GetIt.instance.get();
    sharedPreferences.setString("user","");
    sharedPreferences.setBool("isLoggedIn",false);
  }



}
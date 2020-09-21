import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:passenger_app/api/api_client.dart';
import 'package:passenger_app/map_manager.dart';
import 'package:passenger_app/modules/Login/login_page.dart';
import 'package:passenger_app/main_page.dart';
import 'package:passenger_app/mqtt_manager.dart';
import 'package:passenger_app/user_manager.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'main_page.dart';
import 'modules/Home/home_page.dart';
import 'modules/Signup/NewDriver/upload_document_page.dart';
import 'modules/approval_page.dart';
import 'modules/start_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  GetIt.instance.registerSingleton(sharedPreferences);
  GetIt.instance.registerSingleton(UserManager());
  GetIt.instance.registerSingleton(MapManager());
  GetIt.instance.registerSingleton(MqttManager());

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  UserManager userManager = GetIt.instance.get();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: "Metropolis",
        brightness: Brightness.light
      ),
      debugShowCheckedModeBanner: false,
      home: (userManager.isLoggedIn)?
          StartPage()
          :LoginPage(),
    );
  }
}
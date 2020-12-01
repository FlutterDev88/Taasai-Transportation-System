import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_verification_code_input/flutter_verification_code_input.dart';
import 'package:get_it/get_it.dart';
import 'package:passenger_app/api/api_client.dart';
import 'package:passenger_app/models/api/send_otp_response.dart';
import 'package:passenger_app/user_manager.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../main_page.dart';

class Otp extends StatefulWidget{
  String mobileNumber;
  int dialCode;
  String countryCode;
  String message;
  bool isNew;
  Otp(this.mobileNumber,this.dialCode,this.countryCode,this.message,this.isNew);
  @override
  _OtpPageState createState() => _OtpPageState();
}

class _OtpPageState extends State<Otp> {
  String name = "";
  String referalCode = "";
  UserManager _userManager = GetIt.instance.get();

  verifyOtp(String otp) {
    ApiClient()
        .VerifyOtp(
        widget.mobileNumber, widget.dialCode, widget.countryCode, otp, name,referalCode)
        .then((response) async {
      if (response.status) {
        SharedPreferences sharedPreferences = await SharedPreferences
            .getInstance();
        sharedPreferences.setString("user", jsonEncode(response.userDetail));
        sharedPreferences.setBool("isLoggedIn", true);
        _userManager.user = response.userDetail;
        _userManager.isLoggedIn = true;
        Navigator.push(context, MaterialPageRoute(builder: (BuildContext) {
          return Main();
        }));
      }
    }).catchError((error) {
      debugPrint(error.toString());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        brightness: Brightness.light,
        backgroundColor: Colors.white,
        elevation: 1,
        title: Text("Verify Otp",
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black),),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.keyboard_backspace, color: Colors.black,),
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Expanded(
              child: Padding(
                padding: EdgeInsets.only(left: 20, top: 40, right: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    (widget.isNew == true)?Text("Full Name", style: TextStyle(
                        fontSize: 16, fontWeight: FontWeight.bold),):Container(),
                    (widget.isNew==true)?SizedBox(height: 12,):SizedBox(height: 0,),
                    (widget.isNew==true)?Container(
                      width: double.infinity,
                      child: TextField(
                        autofocus: true,
                        cursorWidth: 1.5,
                        onChanged: (value) {
                          this.name = value;
                        },
                        cursorColor: Colors.black54,
                        decoration: InputDecoration(
                          hintText: "Enter your name",
                          hintStyle: TextStyle(color: Color(0xffd4d4d4)),
                          fillColor: Colors.grey.shade100,
                          filled: true,
                          enabledBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.grey
                                  .shade100),
                              borderRadius: BorderRadius.circular(8)
                          ),
                          focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.grey
                                  .shade300),
                              borderRadius: BorderRadius.circular(8)
                          ),
                        ),
                      ),
                    ):Container(),
                    (widget.isNew==true)?SizedBox(height: 20,):SizedBox(height: 0,),
                    (widget.isNew==true)?Text("Referal Code", style: TextStyle(
                        fontSize: 16, fontWeight: FontWeight.bold),):Container(),
                    (widget.isNew==true)?SizedBox(height: 12,):SizedBox(height: 0,),
                    (widget.isNew==true)?Container(
                      width: double.infinity,
                      child: TextField(
                        autofocus: true,
                        cursorWidth: 1.5,
                        onChanged: (value) {
                          this.referalCode = value;
                        },
                        cursorColor: Colors.black54,
                        decoration: InputDecoration(
                          hintText: "Enter your referal code",
                          hintStyle: TextStyle(color: Color(0xffd4d4d4)),
                          fillColor: Colors.grey.shade100,
                          filled: true,
                          enabledBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.grey
                                  .shade100),
                              borderRadius: BorderRadius.circular(8)
                          ),
                          focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.grey
                                  .shade300),
                              borderRadius: BorderRadius.circular(8)
                          ),
                        ),
                      ),
                    ):Container(),
                    (widget.isNew==true)?SizedBox(height: 20,):SizedBox(height: 0,),
                    Text("Otp", style: TextStyle(
                        fontSize: 16, fontWeight: FontWeight.bold),),
                    SizedBox(height: 12,),
                    VerificationCodeInput(
                      autofocus: true,
                      length: 4,
                      itemSize: 60,
                      onCompleted: (value) {
                        verifyOtp(value);
                      },
                      itemDecoration: BoxDecoration(
                          color: Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(8)
                      ),
                      keyboardType: TextInputType.number,
                    ),
                    SizedBox(height: 20,),
                    Text(
                        "Enter the one time pin received on your mobile \n+${widget
                            .dialCode} ${widget.mobileNumber}. ${widget
                            .message}", style: TextStyle(
                        height: 1.5, fontSize: 14, color: Colors.grey.shade400))
                  ],
                ),
              )
          ),
        ],
      ),
    );
  }
}
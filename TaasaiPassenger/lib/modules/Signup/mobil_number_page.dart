import 'package:flutter/material.dart';
import 'package:passenger_app/api/api_client.dart';
import 'package:passenger_app/models/api/send_otp_response.dart';
import 'package:passenger_app/modules/Components/loader.dart';
import 'package:passenger_app/modules/Country/country_page.dart';
import 'package:passenger_app/modules/Country/seelect_country_page.dart';
import 'package:passenger_app/modules/Signup/otp_page.dart';
import 'package:passenger_app/utils/authviewmodel.dart';
class MobileNumberPage extends StatefulWidget{
  @override
  _MobileNumberPageState createState() => _MobileNumberPageState();
}

class _MobileNumberPageState extends State<MobileNumberPage> {
  AuthViewModel authViewModel = AuthViewModel();
  sendOtp(){
    setState(() {
      isLoading = true;
    });
    ApiClient().SendOtp(authViewModel.mobileNumber, authViewModel.country.dialCode, authViewModel.country.countryCode).then((response){
      setState(() {
        isLoading = false;
      });
      if(response.status){
        Navigator.push(context, MaterialPageRoute(builder: (BuildContext){
          return Otp(authViewModel.mobileNumber,authViewModel.country.dialCode,authViewModel.country.countryCode,response.message,response.isNew);
        }));
      }
    }).catchError((error){
          setState(() {
            isLoading = false;
          });
    });
  }
  bool isLoading = false;
getOtpbutton(){
    if(isLoading){
      return Loader();
    }else{
      return Text("Submit".toUpperCase(),style: TextStyle(fontSize:16,fontWeight: FontWeight.bold,color: Colors.white),);
    }
}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        brightness: Brightness.light,
        backgroundColor: Colors.white,
        elevation: 1,
        title: Text("Verify Mobile Number",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.black),),
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.keyboard_backspace,color: Colors.black,),
        ),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                SizedBox(height: 20,),
                Container(
                  decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(8)
                  ),
                  padding: EdgeInsets.only(left:16,right:16,top:4,bottom: 4),
                  margin: EdgeInsets.all(16),
                  child: Row(
                    children: <Widget>[
                      GestureDetector(
                        child: Row(
                    children: <Widget>[
                    Image.asset(authViewModel.country.image,height: 30,width: 30,),
                  SizedBox(width: 8,),
                  Text(authViewModel.country.dialCode.toString(),style: TextStyle(fontSize: 16,color: Colors.black),),
                  ],
                ),
                        onTap: () async {
                          Country selectedCountry = await Navigator.push(context, MaterialPageRoute(builder: (context){
                            return SelectCountryPage();
                          }));
                          setState(() {
                            this.authViewModel.country = selectedCountry;
                          });
                        },
                      ),


                      SizedBox(width: 8,),
                      Expanded(
                        child:  TextField(
                          autofocus: true,
                          enabled: true,
                          onChanged: (value){
                            this.authViewModel.mobileNumber = value;
                          },
                          cursorColor: Colors.black54,
                          decoration: InputDecoration(
                            hintText: "9344664559",
                            hintStyle: TextStyle(color: Color(0xffd4d4d4)),
                            enabledBorder: InputBorder.none,
                            focusedBorder: InputBorder.none,
                          ),
                        ),
                      ),
                    ],
                  ),

                ),
                Padding(
                  padding: const EdgeInsets.only(left:30,right:30,bottom: 24),
                  child: Text("By continuing , you will receiving an one time pin on entered mobile number.",textAlign: TextAlign.center,style: TextStyle(fontSize:14,color: Colors.grey.shade400)),
                ),
              ],
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              width: double.infinity,
              height: 54,
              margin: EdgeInsets.all(30),
              decoration: BoxDecoration(
                  boxShadow:  [
                    BoxShadow(
                      color: Colors.greenAccent.shade700,
                      blurRadius: 4.0, // has the effect of softening the shadow
                      spreadRadius: 0.25, // has the effect of extending the shadow
                      offset: Offset(
                        1.0, // horizontal, move right 10
                        1.0, // vertical, move down 10
                      ),
                    )
                  ],
                  borderRadius: BorderRadius.circular(30),
                  color: Colors.transparent
              ),
              child: FlatButton(
                onPressed: isLoading?null:(){
                  sendOtp();
                },
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30)
                ),
                color: Colors.greenAccent.shade700,
                child: getOtpbutton(),
              ),
            )
          )
        ],
      )
    );
  }
}
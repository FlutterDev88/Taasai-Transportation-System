import 'package:connectivity/connectivity.dart';
import 'package:flutter/material.dart';
import 'package:passenger_app/modules/Components/loader.dart';

class NoNetPage extends StatefulWidget{

  @override
  _NoNetPageState createState() => _NoNetPageState();
}

class _NoNetPageState extends State<NoNetPage> {
  var isLoading = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: Text("Can't connect to internet. Please check your network settings! ",textAlign: TextAlign.center,style: TextStyle(fontSize: 18,height: 1.6),),
              ),
            ),
          ),
          Container(
            width: double.infinity,
            height: 56,
            margin: EdgeInsets.all(16),
            decoration: BoxDecoration(
                boxShadow: [
                  BoxShadow(
                    color: Colors.greenAccent.shade700,
                    blurRadius: 1.0,
                    // has the effect of softening the shadow
                    spreadRadius: 0.25,
                    // has the effect of extending the shadow
                    offset: Offset(
                      0.5, // horizontal, move right 10
                      0.5, // vertical, move down 10
                    ),
                  )
                ],
                borderRadius: BorderRadius.circular(30)
            ),
            child: FlatButton(
              onPressed: () async{
                setState(() {
                  isLoading = true;
                });
                var connectivityResult = await (Connectivity().checkConnectivity());
                if (connectivityResult == ConnectivityResult.mobile) {
                  // I am connected to a mobile network.
                  Navigator.of(context).pop();
                } else if (connectivityResult == ConnectivityResult.wifi) {
                  // I am connected to a wifi network.
                  Navigator.of(context).pop();
                }else{
                  setState(() {
                    isLoading = false;
                  });
                }
              },
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30)
              ),
              color: Colors.greenAccent.shade700,
              child: (isLoading)?Center(child: Loader(),):Text("TRY AGAIN",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold),),
            ),
          ),
          SizedBox(
            height: 16,
          )
        ],
      ),
    );
  }
}
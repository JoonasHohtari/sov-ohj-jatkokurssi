import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.transparent,
        body: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.blue, Colors.green, Colors.orange],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Center(
            child: Text(
              'Hello World!',
              style: TextStyle(
                color: Colors.red, // Set text color to red
                fontSize: 24.0, // Set text font size
                fontWeight: FontWeight.bold,
              ), // Set text font weight to bold
            ),
          ),
        ),
      ),
    );
  }
}

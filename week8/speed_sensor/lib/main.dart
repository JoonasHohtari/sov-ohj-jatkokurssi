import 'package:flutter/material.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:maps_launcher/maps_launcher.dart';
import 'dart:async';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // Accelerometer values
  late double x, y, z;
  bool isListening = false;
  late StreamSubscription<AccelerometerEvent> _streamSubscription;

  double? latitude;
  double? longitude;

  void startListening() async {
    if (isListening) {
      await _streamSubscription.cancel();
      setState(() {
        isListening = false;
      });
    } else {
      _streamSubscription =
          accelerometerEvents.listen((AccelerometerEvent event) {
        setState(() {
          x = event.x;
          y = event.y;
          z = event.z;
        });
      });
      setState(() {
        isListening = true;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    // Set default values
    x = 0.0;
    y = 0.0;
    z = 0.0;
  }

  @override
  void dispose() {
    _streamSubscription.cancel();
    super.dispose();
  }

  Future<void> requestLocationPermission() async {
    final status = await Permission.location.request();
    if (status == PermissionStatus.denied) {
      // Show a dialog or message to inform the user
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Location Permission Required'),
            content: Text('Please grant location permissions to use this app.'),
            actions: <Widget>[
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: Text('OK'),
              ),
            ],
          );
        },
      );
    } else if (status == PermissionStatus.granted) {
      // Location permission granted, fetch location
      fetchLocation();
    }
  }

  Future<void> fetchLocation() async {
    try {
      bool locationPermission = await Geolocator.isLocationServiceEnabled();
      if (!locationPermission) {
        print("Location permission denied");
        return;
      }

      Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high);
      setState(() {
        latitude = position.latitude;
        longitude = position.longitude;
      });
    } catch (e) {
      print("Error getting location: $e");
    }
  }

  Future<void> openMaps() async {
    try {
      await MapsLauncher.launchCoordinates(latitude!, longitude!);
    } catch (e) {
      print('Error launching Google Maps: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Accelerometer Test'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                  onPressed: startListening,
                  child: Text(isListening ? 'Stop' : 'Start')),
              Text('X-axis: $x'),
              Text('Y-axis: $y'),
              Text('Z-axis: $z'),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  fetchLocation();
                },
                child: const Text('Get Location'),
              ),
              latitude == null || longitude == null
                  ? CircularProgressIndicator()
                  : Column(
                      children: [
                        Text('Latitude: $latitude'),
                        Text('Longitude: $longitude'),
                        ElevatedButton(
                          onPressed: openMaps,
                          child: const Text('Open in Maps'),
                        ),
                      ],
                    )
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'weather_api.dart';
import 'package:logger/logger.dart';
import 'package:intl/intl.dart';

import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() async {
  await dotenv.load(fileName: ".env"); // Correctly loads .env file
  runApp(const WeatherApp());
}

final apiKey = dotenv.env['API_KEY'];

final Logger logger = Logger();

class WeatherApp extends StatelessWidget {
  const WeatherApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: WeatherScreen(),
    );
  }
}

class WeatherScreen extends StatefulWidget {
  const WeatherScreen({Key? key}) : super(key: key);

  @override
  WeatherScreenState createState() => WeatherScreenState();
}

class WeatherScreenState extends State<WeatherScreen> {
  late final WeatherApi weatherApi;
  late Map<String, dynamic> weatherData = {};
  List<Map<String, dynamic>> forecastData = [];

  @override
  void initState() {
    super.initState();
    final apiKey = dotenv.env['API_KEY'] ?? '';

    weatherApi = WeatherApi(
      apiKey: apiKey,
      baseUrl: 'https://api.openweathermap.org/data/2.5/forecast',
    );

    // Fetch weather data when the screen is loaded
    _fetchWeatherData();
    _fetch5DayForecast();
  }

  _fetchWeatherData() async {
    try {
      // Replace these coordinates with the actual coordinates you want to fetch data for
      double latitude = 61.49;
      double longitude = 23.78;

      weatherData = await weatherApi.getWeatherData(latitude, longitude);

      setState(() {});
      // Handle the fetched data as needed
      logger.d('Weather Data: $weatherData');
    } catch (e) {
      logger.d('Error fetching weather data: $e');
    }
  }

  _fetch5DayForecast() async {
    try {
      // Replace these coordinates with the actual coordinates you want to fetch data for
      double latitude = 61.49;
      double longitude = 23.78;

      forecastData = await weatherApi.get5DayForecast(latitude, longitude);
      // Handle the fetched data as needed
      logger.d('5-Day Forecast Data for 17:00: $forecastData');
    } catch (e) {
      logger.d('Error fetching 5-day forecast data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Weather App'),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: getGradientColors(),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Location and Country
              Text(
                '${weatherData['city']}, ${weatherData['country']}',
                style: const TextStyle(
                  fontSize: 18.0,
                ),
              ),
              const SizedBox(height: 16.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons
                        .wb_sunny, // Placeholder for sunny weather, replace with actual weather icon
                    size: 50.0,
                    color: Colors.orange,
                  ),
                  const SizedBox(width: 16.0),
                  Text(
                    'Temperature: ${weatherData['temperature']}°C',
                    style: const TextStyle(
                      fontSize: 20.0,
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 16.0),
              // Humidity and Wind Speed
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Humidity: ${weatherData['humidity']}%',
                    style: const TextStyle(
                      fontSize: 18.0,
                    ),
                  ),
                  const SizedBox(width: 16.0),
                  Text(
                    'Wind Speed: ${weatherData['windSpeed']} m/s',
                    style: const TextStyle(
                      fontSize: 18.0,
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: () {
                  // Navigate to the weather location screen
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          WeatherForecast(forecastData: forecastData),
                    ),
                  );
                },
                child: const Text('View Forecast'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<Color> getGradientColors() {
    Color startColor = getColorForTemperature(weatherData['temperature']);
    Color endColor = Colors.blue; // You can set a default end color
    return [startColor, endColor];
  }

  Color getColorForTemperature(double? temperature) {
    // Example: Map temperature to a gradient color
    if (temperature == null) {
      return Colors.grey;
    } else if (temperature <= 0) {
      return Colors.blue; // Cold color
    } else if (temperature <= 20) {
      return Colors.yellow; // Moderate color
    } else {
      return Colors.red; // Hot color
    }
  }
}

class WeatherForecast extends StatelessWidget {
  final List<Map<String, dynamic>> forecastData;

  const WeatherForecast({Key? key, required this.forecastData})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('5-Day Forecast')),
      body: Container(
        color: Colors.grey[300],
        child: ListView.builder(
          itemCount: forecastData.length,
          itemBuilder: (context, index) {
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: Card(
                color: Colors.grey[200],
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      Text(
                        '${forecastData[index]['temperature']}°C',
                        style: const TextStyle(
                          fontSize: 20.0,
                        ),
                      ),
                      const SizedBox(width: 16.0),
                      Text(
                        '${forecastData[index]['dateTime'] != null ? DateFormat('dd.MM.yyyy').format(forecastData[index]['dateTime']!) : 'N/A'}',
                        style: const TextStyle(
                          fontSize: 20.0,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

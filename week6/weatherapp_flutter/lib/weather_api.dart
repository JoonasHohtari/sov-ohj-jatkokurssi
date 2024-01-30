import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';

final Logger logger = Logger();

class WeatherApi {
  final String apiKey;
  final String baseUrl;

  WeatherApi({required this.apiKey, required this.baseUrl});

  Future<Map<String, dynamic>> getWeatherData(double lat, double lon) async {
    final response = await http.get(
      Uri.parse('$baseUrl?lat=$lat&lon=$lon&appid=$apiKey&units=metric'),
    );
    if (response.statusCode == 200) {
      final Map<String, dynamic> jsonData = json.decode(response.body);
      final Map<String, dynamic> relevantData = parseRelevantData(jsonData);
      logger.d('Relevant Data: $relevantData');
      return relevantData;
    } else if (response.statusCode == 404) {
      throw Exception('Weather data not found. Check your coordinates.');
    } else {
      throw Exception(
          'Failed to load weather data. Status code: ${response.statusCode}');
    }
  }

  Map<String, dynamic> parseRelevantData(Map<String, dynamic> jsonData) {
    try {
      return {
        'temperature': jsonData['list'][0]['main']['temp'],
        'humidity': jsonData['list'][0]['main']['humidity'],
        'windSpeed': jsonData['list'][0]['wind']['speed'],
        'city': jsonData['city']['name'],
        'country': jsonData['city']['country'],
      };
    } catch (e) {
      throw Exception('Error parsing weather data: $e');
    }
  }

  Future<List<Map<String, dynamic>>> get5DayForecast(
      double lat, double lon) async {
    final response = await http.get(
      Uri.parse('$baseUrl?lat=$lat&lon=$lon&appid=$apiKey&units=metric'),
    );
    if (response.statusCode == 200) {
      final Map<String, dynamic> jsonData = json.decode(response.body);
      final List<Map<String, dynamic>> forecastData =
          parseForecastData(jsonData);
      logger.d('Forecast Data: $forecastData');
      return forecastData;
    } else if (response.statusCode == 404) {
      throw Exception('Weather data not found. Check your coordinates.');
    } else {
      throw Exception(
          'Failed to load weather data. Status code: ${response.statusCode}');
    }
  }

  List<Map<String, dynamic>> parseForecastData(Map<String, dynamic> jsonData) {
    try {
      List<Map<String, dynamic>> dailyData = [];
      for (var entry in jsonData['list']) {
        final DateTime dt =
            DateTime.fromMillisecondsSinceEpoch(entry['dt'] * 1000);

        // Check if the entry's time is 17:00
        if (dt.hour == 17) {
          final Map<String, dynamic> dailyEntry = {
            'temperature': entry['main']['temp'],
            'city': jsonData['city']['name'],
            'country': jsonData['city']['country'],
            'dateTime': dt,
          };
          dailyData.add(dailyEntry);
        }
      }
      logger.d('Daily Data: $dailyData');
      return dailyData;
    } catch (e) {
      throw Exception('Error parsing weather data: $e');
    }
  }
}

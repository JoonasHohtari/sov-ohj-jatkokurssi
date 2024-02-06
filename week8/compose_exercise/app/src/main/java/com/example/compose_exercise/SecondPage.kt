package com.example.compose_exercise

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat.startActivity

class SecondPage : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            InformationPanel()
        }
    }
}

data class WeatherForecast(
    val day: String,
    val condition: String,
    val highTemp: Int,
    val lowTemp: Int
)

data class CurrentWeather(
    val temperature: Int,
    val condition: String,
    val humidity: Int,
    val windSpeed: Int
)

object WeatherData {
    val currentWeather = CurrentWeather(
        temperature = 24,
        condition = "Sunny",
        humidity = 75,
        windSpeed = 5
    )

    val weeklyForecast = listOf(
        WeatherForecast("Monday", "Partly Cloudy", 22, 16),
        WeatherForecast("Tuesday", "Rainy", 20, 14),
        WeatherForecast("Wednesday", "Sunny", 25, 17),
        WeatherForecast("Thursday", "Cloudy", 21, 15),
        WeatherForecast("Friday", "Sunny", 26, 18),
        WeatherForecast("Saturday", "Rainy", 19, 14),
        WeatherForecast("Sunday", "Sunny", 24, 17)
    )
}
@Composable
fun InformationPanel () {
    val context = LocalContext.current


    Column(
        modifier = Modifier
            .fillMaxSize(
    )
    ) {
        Header()

        Column (
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(text = "Current Conditions", style = MaterialTheme.typography.headlineSmall)
            Text(text = "Temperature: ${WeatherData.currentWeather.temperature}°C")
            Text(text = "Condition: ${WeatherData.currentWeather.condition}")
            Text(text = "Humidity: ${WeatherData.currentWeather.humidity}%")
            Text(text = "Wind: ${WeatherData.currentWeather.windSpeed} km/h")
        }

        LazyColumn (
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            items(WeatherData.weeklyForecast) { forecast ->
                Text(text = "${forecast.day}: ${forecast.condition}, High of ${forecast.highTemp}°C, Low of ${forecast.lowTemp}°C")
            }
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick =  {
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(text = "Go to back to main page")
        }
    }
}
package com.example.compose_exercise

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            WeatherApp()
        }
    }
}

@Composable
fun WeatherApp() {
    val currentTemperature = 25
    val weatherCondition = "Sunny"
    val weatherConditionIcon = R.drawable.icons8_sunny_96

    Column(
        modifier = Modifier
            .fillMaxSize()
    ) {

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.Gray)
                .padding(16.dp)
        ) {
            Text(
                text = "Tampere",
                fontSize = 48.sp,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(48.dp)
        ) {
            Text(
                text = "$currentTemperature °C",
                fontSize = 40.sp,
                modifier = Modifier
                    .weight(1f)
                    .align(Alignment.CenterVertically)
            )

            Image(
                painter = painterResource(id = weatherConditionIcon),
                contentDescription = weatherCondition,
                modifier = Modifier
                    .size(98.dp)
                    .align(Alignment.CenterVertically)
            )
        }

        Column (
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.LightGray)
                .padding(16.dp)
        ) {
            Text(
                text = weatherCondition,
                fontSize = 20.sp,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
        }
        Column (
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(16.dp)
        ) {
            Text(
                text = "Wind: 5 m/s, SE",
                fontSize = 20.sp,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = { /*TODO*/ },
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(text = "Refresh")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun PreviewWeatherApp() {
    WeatherApp()
}
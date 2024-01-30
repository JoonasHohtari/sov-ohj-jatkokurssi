import 'package:flutter/material.dart';

void main() {
  runApp(BMICalculatorApp());
}

class BMICalculatorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BMICalculatorScreen(),
    );
  }
}

class BMICalculatorScreen extends StatefulWidget {
  @override
  _BMICalculatorScreenState createState() => _BMICalculatorScreenState();
}

// Textfield controllers
class _BMICalculatorScreenState extends State<BMICalculatorScreen> {
  TextEditingController heightController = TextEditingController();
  TextEditingController weightController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BMI Calculator'),
      ),
      backgroundColor: Colors.grey[700],
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: TextField(
                style: TextStyle(color: Colors.white),
                controller: heightController,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(labelText: 'Height (cm)'),
              ),
            ),
            SizedBox(height: 16.0),
            Expanded(
              child: TextField(
                style: TextStyle(color: Colors.white),
                controller: weightController,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(labelText: 'Weight (kg)'),
              ),
            ),
            SizedBox(height: 16.0),
            Container(
              width: 150, // Set a fixed width
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  // Validate input
                  if (validateInput()) {
                    calculateBMI();
                  } else {
                    // Show error dialog
                    showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          title: Text('Error'),
                          content: Text('Please enter valid input'),
                          actions: [
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
                  }
                },
                child: Text('Calculate BMI'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Validate input
  bool validateInput() {
    if (heightController.text.isEmpty || weightController.text.isEmpty) {
      return false;
    } else {
      return isNumeric(heightController.text) &&
          isNumeric(weightController.text);
    }
  }

  // check if numeric or not
  bool isNumeric(String? value) {
    return value != null && double.tryParse(value) != null;
  }

  // Calculate BMI
  void calculateBMI() {
    double height = double.parse(heightController.text);
    double weight = double.parse(weightController.text);
    double bmi = weight / ((height / 100) * (height / 100));
    String bmiText = '';
    if (bmi < 18.5) {
      bmiText = 'Underweight';
    } else if (bmi < 25) {
      bmiText = 'Normal';
    } else if (bmi < 30) {
      bmiText = 'Overweight';
    } else {
      bmiText = 'Obese';
    }
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Your BMI'),
          content: Text('Your BMI is $bmiText'),
          actions: [
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
  }
}

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const CurrencyButton: React.FC<{
  currency: string;
  onPress: () => void;
  selected: boolean;
}> = ({currency, onPress, selected}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, selected && styles.selectedButton]}>
    <Text style={styles.buttonText}>{currency}</Text>
  </TouchableOpacity>
);

const App: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const fetchExchangeRate = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/77edb2460741fd53c4acb9b7/latest/${fromCurrency}`,
      );
      // Check if the response has the expected structure
      if (
        response.status === 200 &&
        response.data &&
        response.data.conversion_rates
      ) {
        const rate = response.data.conversion_rates[toCurrency];

        if (rate !== undefined) {
          setExchangeRate(rate);
        } else {
          console.error(
            `Exchange rate for ${toCurrency} not found in the response.`,
          );
        }
      } else {
        console.error(
          `Invalid response: Status ${response.status}, Data:`,
          response.data,
        );
      }
    } catch (error: any) {
      console.error('Error fetching exchange rate:', error.message);
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetchExchangeRate();
  }, [fetchExchangeRate]);

  const handleConvert = () => {
    if (!exchangeRate || isNaN(Number(amount))) {
      // Handle error or display a message to the user
      return;
    }

    const converted = Number(amount) * exchangeRate;
    setConvertedAmount(converted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={text => setAmount(text)}
      />

      <Text style={styles.label}>From Currency:</Text>
      <View style={styles.buttonContainer}>
        <CurrencyButton
          currency="USD"
          onPress={() => setFromCurrency('USD')}
          selected={fromCurrency === 'USD'}
        />
        <CurrencyButton
          currency="EUR"
          onPress={() => setFromCurrency('EUR')}
          selected={fromCurrency === 'EUR'}
        />
        <CurrencyButton
          currency="GBP"
          onPress={() => setFromCurrency('GBP')}
          selected={fromCurrency === 'GBP'}
        />
      </View>

      <Text style={styles.label}>To Currency:</Text>
      <View style={styles.buttonContainer}>
        <CurrencyButton
          currency="USD"
          onPress={() => setToCurrency('USD')}
          selected={toCurrency === 'USD'}
        />
        <CurrencyButton
          currency="EUR"
          onPress={() => setToCurrency('EUR')}
          selected={toCurrency === 'EUR'}
        />
        <CurrencyButton
          currency="GBP"
          onPress={() => setToCurrency('GBP')}
          selected={toCurrency === 'GBP'}
        />
      </View>

      <Button title="Convert" onPress={handleConvert} />

      {convertedAmount !== null && (
        <Text style={styles.result}>
          Converted Amount from {fromCurrency} to {convertedAmount.toFixed(2)}{' '}
          {toCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 80,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#6495ED', // Adjust the color for the selected button
  },
  buttonText: {
    fontSize: 16,
  },
});

export default App;

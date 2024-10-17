import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function FuelAdvisor() {
  const [gasolinePrice, setGasolinePrice] = useState('');
  const [ethanolPrice, setEthanolPrice] = useState('');
  const [adviceText, setAdviceText] = useState('');
  const carImage = require('./carro.png');

  const determineOptimalFuel = () => {
    const gasPrice = parseFloat(gasolinePrice.replace(',', '.'));
    const ethPrice = parseFloat(ethanolPrice.replace(',', '.'));

    if (gasPrice > 0 && ethPrice > 0) {
      const ratio = ethPrice / gasPrice;
      if (ratio <= 0.7) {
        setAdviceText('Abasteça com álcool!');
      } else {
        setAdviceText('Abasteça com gasolina!');
      }
    } else {
      setAdviceText('Insira preços válidos.');
    }
  };

  const resetFields = () => {
    setGasolinePrice('');
    setEthanolPrice('');
    setAdviceText('');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>
        {adviceText || 'Compare o combustível'}
      </Text>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Preço da Gasolina:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Ex: 5.79"
          keyboardType="numeric"
          value={gasolinePrice}
          onChangeText={setGasolinePrice}
        />
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Preço do Álcool:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Ex: 4.19"
          keyboardType="numeric"
          value={ethanolPrice}
          onChangeText={setEthanolPrice}
        />
      </View>
      <View style={styles.buttonGroup}>
        {adviceText ? (
          <Button title="Limpar" color="red" onPress={resetFields} />
        ) : null}
        <Button title="Calcular" color="blue" onPress={determineOptimalFuel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#eef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputSection: {
    marginVertical: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '60%',
  },
});

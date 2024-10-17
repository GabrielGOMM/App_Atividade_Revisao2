import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

export default function App() {
  let [peso, setPeso] = useState(0);
  let [altura, setAltura] = useState(0);
  let [imc, setIMC] = useState(0);
  let [textoIMC, setTextoIMC] = useState('');
  let urlIMGBalanca = './balanca.png';

  calcularIMC = () => {
    if(peso != 0 && altura != 0){

      let calculoIMC = Number((peso / Math.pow((altura / 100), 2)).toFixed(2));
      setIMC(imc = calculoIMC);
      console.log(`Altura: ${altura}\nPeso:${peso}\nIMC:${imc}`);

      if(imc > 29.99){
        setTextoIMC("Obesidade");
      }
      else if(imc >= 25 && imc < 30){
        setTextoIMC("Acima do peso");
      }
      else if(imc < 25 && imc >= 18.5){
        setTextoIMC("Peso normal");
      }
      else if(imc >= 17 && imc < 18.5){
        setTextoIMC("Abaixo do peso");
      }
      else if(imc < 17){
        setTextoIMC("Muito abaixo do peso");
      }
    }
  };
  limparInputs = () => {
    setPeso(null)
    setAltura(null);
    setTextoIMC('');
  };
  return (
    <View style={styles.container}>
      { textoIMC != null && textoIMC != '' ? <Text style={styles.textTitle}>{imc} - {textoIMC}</Text> : <Text style={styles.textTitle}>Calcule seu IMC</Text> }
      <Image style={styles.imagem} source={require(urlIMGBalanca)}/>
      <View style={styles.viewInput}>
        <Text style={{fontWeight: 'bold'}}>Peso</Text>
        <TextInput
          style={styles.inputsPesoAltura}
          onChangeText={setPeso}
          value={peso}
          placeholder='Digite seu peso em kg'
          keyboardType="numeric"
        />
      </View>
      <View style={styles.viewInput}>
        <Text style={{fontWeight: 'bold'}}>Altura (cm)</Text>
        <TextInput
          style={styles.inputsPesoAltura}
          onChangeText={setAltura}
          value={altura}
          placeholder='Digite sua altura em cm'
          keyboardType="numeric"
        />
      </View>
      <View style={styles.viewBtn}>
        { textoIMC != null && textoIMC != '' ? <Button title="Limpar" color='red' onPress={()=> {this.limparInputs()}}/> : null}

        <Button title="Calcular" color='blue' onPress={()=> {this.calcularIMC()}}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem:{
    maxWidth: 250,
    maxHeight: 250,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  textTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 40
  },
  inputsPesoAltura:{
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 40,
    borderRadius: 15,
    textAlign: 'center',
  },
  viewInput:{
    marginBottom: 15
  },
  viewBtn:{
    marginTop: 30,
    flexDirection: 'row',
    gap: 15
  }
});

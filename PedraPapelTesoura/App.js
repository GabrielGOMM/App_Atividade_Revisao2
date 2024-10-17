import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function JogoJokenpo() {
  const [escolhaUsuario, setEscolhaUsuario] = useState(0);
  const [escolhaComputador, setEscolhaComputador] = useState(0);
  const [mensagemResultado, setMensagemResultado] = useState('');

  const opcoes = [
    { id: 0, nome: 'Selecione', imagem: require('./vazio.png'), habilitado: false },
    { id: 1, nome: 'Pedra', imagem: require('./pedra.png'), habilitado: true, vence: 'Tesoura' },
    { id: 2, nome: 'Papel', imagem: require('./papel.png'), habilitado: true, vence: 'Pedra' },
    { id: 3, nome: 'Tesoura', imagem: require('./tesoura.png'), habilitado: true, vence: 'Papel' },
  ];

  const opcoesComputador = [
    { id: 0, nome: null, imagem: require('./vazio.png') },
    { id: 1, nome: 'Pedra', imagem: require('./pedra.png') },
    { id: 2, nome: 'Papel', imagem: require('./papel.png') },
    { id: 3, nome: 'Tesoura', imagem: require('./tesoura.png') },
  ];

  const gerarEscolhaComputador = () => {
    let indiceAleatorio = 0;
    while (indiceAleatorio === 0) {
      indiceAleatorio = Math.floor(Math.random() * opcoesComputador.length);
    }
    setEscolhaComputador(indiceAleatorio);
    return indiceAleatorio;
  };

  const determinarVencedor = (indiceUsuario, indiceComputador) => {
    if (opcoes[indiceUsuario].nome === opcoesComputador[indiceComputador].nome) {
      setMensagemResultado('Empate!');
    } else if (opcoesComputador[indiceComputador].nome === opcoes[indiceUsuario].vence) {
      setMensagemResultado('Computador venceu!');
    } else {
      setMensagemResultado('Você venceu!');
    }
  };

  const reiniciarJogo = () => {
    setEscolhaUsuario(0);
    setEscolhaComputador(0);
    setMensagemResultado('');
  };

  const itensPicker = opcoes.map((item, index) => (
    <Picker.Item
      enabled={item.habilitado}
      key={index}
      value={index}
      label={item.nome}
    />
  ));

  const ExibirEscolhaUsuario = () => (
    <View style={estilos.containerEscolha}>
      <Text style={estilos.textoResultado}>{mensagemResultado}</Text>
      <Text style={estilos.textoTitulo}>Sua escolha:</Text>
      <Text style={[estilos.textoEscolha, estilos.corAzul]}>{opcoes[escolhaUsuario].nome}</Text>
      <Image style={estilos.imagemEscolha} source={opcoes[escolhaUsuario].imagem} />
    </View>
  );

  const ExibirEscolhaComputador = () => (
    <View>
      <View style={estilos.containerEscolha}>
        <Text style={estilos.textoTitulo}>Escolha do computador:</Text>
        <Text style={[estilos.textoEscolha, estilos.corVermelha]}>{opcoesComputador[escolhaComputador].nome}</Text>
        <Image style={estilos.imagemEscolha} source={opcoesComputador[escolhaComputador].imagem} />
      </View>
      <Button title="Reiniciar" color="red" onPress={reiniciarJogo} />
    </View>
  );

  const SelecionarJogada = () => (
    <View>
      <Text style={estilos.textoTitulo}>Faça sua jogada:</Text>
      <Picker
        style={{ width: 150 }}
        selectedValue={escolhaUsuario}
        onValueChange={(valor) => {
          setEscolhaUsuario(valor);
          const escolhaComp = gerarEscolhaComputador();
          determinarVencedor(valor, escolhaComp);
        }}
      >
        {itensPicker}
      </Picker>
    </View>
  );

  return (
    <View style={estilos.container}>
      {escolhaUsuario === 0 ? <SelecionarJogada /> : null}
      {escolhaUsuario !== 0 ? <ExibirEscolhaUsuario /> : null}
      {escolhaComputador !== 0 ? <ExibirEscolhaComputador /> : null}
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddeeff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerEscolha: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagemEscolha: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  textoTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textoResultado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333366',
    marginBottom: 10,
  },
  textoEscolha: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  corAzul: {
    color: 'blue',
  },
  corVermelha: {
    color: 'red',
  },
});

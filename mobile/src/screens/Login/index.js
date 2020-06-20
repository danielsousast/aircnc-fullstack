/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import logo from '../../assets/logo.png';

import {
  Container,
  LogoImage,
  Label,
  Form,
  Input,
  Button,
  ButtonTitle,
} from './styles';

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        navigation.navigate('home');
      }
    });
  }, []);

  async function handleLogin() {
    const response = await api.post('/session', {email});

    const {_id} = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);
    navigation.navigate('home');
  }

  return (
    <Container behavior="padding" enabled={Platform.OS === 'ios'}>
      <LogoImage source={logo} />
      <Form>
        <Label>SEU EMAIL *</Label>
        <Input
          placeholder="Seu email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
        />

        <Label>TECNOLOGIAS *</Label>
        <Input
          placeholder="Tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={(text) => setTechs(text)}
        />
        <Button onPress={handleLogin}>
          <ButtonTitle>Encontrar Spots</ButtonTitle>
        </Button>
      </Form>
    </Container>
  );
}

export default Login;

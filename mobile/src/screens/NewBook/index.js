import React, {useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import {
  Container,
  Button,
  ButtonTitle,
  Form,
  Input,
  Label,
  CancellButton,
} from './styles';

export default function NewBook({route, navigation}) {
  const {id: spot} = route.params;
  const [date, setDate] = useState('');

  async function handleSubmit() {
    const user = await AsyncStorage.getItem('user');

    await api.post(
      `/spots/${spot}/bookings`,
      {date},
      {
        headers: {user},
      },
    );

    Alert.alert('Solicitação de reserva enviada');
    navigation.goBack();
  }

  function handleCancel() {
    navigation.goBack();
  }

  return (
    <Container>
      <Form>
        <Label>DATA DE INTERESSE *</Label>
        <Input
          placeholder="Data da reserva"
          value={date}
          onChangeText={(text) => setDate(text)}
        />
        <Button onPress={handleSubmit}>
          <ButtonTitle>Solicitar reserva</ButtonTitle>
        </Button>
        <CancellButton onPress={handleCancel}>
          <ButtonTitle>Cancelar</ButtonTitle>
        </CancellButton>
      </Form>
    </Container>
  );
}

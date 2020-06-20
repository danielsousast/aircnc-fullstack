import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Thumbnail,
  Company,
  Price,
  Button,
  ButtonTitle,
} from './styles';

export default function Spot({data: spot}) {
  const navigation = useNavigation();
  return (
    <Container>
      <Thumbnail
        source={{
          uri: spot.thumbnail_url,
        }}
        resizeMode="cover"
      />
      <Company>{spot.company}</Company>
      <Price>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUÍTO'}</Price>
      <Button onPress={() => navigation.navigate('newbook', {id: spot._id})}>
        <ButtonTitle>Solicitar reserva</ButtonTitle>
      </Button>
    </Container>
  );
}

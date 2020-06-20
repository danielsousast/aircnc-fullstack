import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import socketio from 'socket.io-client';
import {Container, LogoImage, ScrollContainer} from './styles';
import logo from '../../assets/logo.png';
import SpotList from '../../components/SpotList';
import {Alert} from 'react-native';

const Home = () => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function getUser() {
      const user = await AsyncStorage.getItem('user');

      const socket = socketio('http://10.0.2.2:3335', {
        query: {user},
      });

      socket.on('booking_response', (booking) => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} foi ${
            booking.approved ? 'APROVADA' : 'REPROVADA'
          }`,
        );
      });
    }
    getUser();
  }, []);

  useEffect(() => {
    async function loadTechs() {
      const storagedTechs = await AsyncStorage.getItem('techs');

      const techsArray = storagedTechs.split(',').map((tech) => tech.trim());

      setTechs(techsArray);
      console.log(techsArray);
    }

    loadTechs();
  }, []);

  return (
    <Container>
      <LogoImage source={logo} resizeMode="contain" />
      <ScrollContainer>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollContainer>
    </Container>
  );
};

export default Home;

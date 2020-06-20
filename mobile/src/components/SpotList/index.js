/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {Container, Title, Strong, List} from './styles';
import Spot from '../Spot';

export default function SpotList({tech}) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const reponse = await api.get('/spots', {
        params: {tech},
      });

      setSpots(reponse.data);
    }

    loadSpots();
  }, []);

  return (
    <Container>
      <Title>
        Empresas que usam <Strong>{tech}</Strong>
      </Title>
      <List
        data={spots}
        keyExtractor={(spot) => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Spot data={item} />}
      />
    </Container>
  );
}

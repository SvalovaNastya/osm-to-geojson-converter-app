import React, { useState } from 'react';
import osmtogeojson from 'osmtogeojson';
import { Container, useTheme } from '@mui/material';
import styles from './App.scss';
import 'leaflet/dist/leaflet.css';
import AppContainer from '../../utils/appContainer';
import CoordinatesCard from '../coordinates/CoordinatesCard';

const isValidBox = (
  left: number,
  bottom: number,
  right: number,
  top: number,
): boolean => left < right && bottom < top;

interface Props {
  container: AppContainer;
}

function App({ container }: Props) {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);

  const getCoordinates = async (
    left: number,
    bottom: number,
    right: number,
    top: number,
  ): Promise<void> => {
    if (!isValidBox(left, bottom, right, top)) {
      setError('Please, specify the valid coordinates box');
      return;
    }
    const response = await container.osmClient.getBoxJson(left, bottom, right, top);

    if (response.error) {
      if (response.error.status === 400) {
        setError('Please, specify the smaller box size');
        return;
      }
      if (response.error.status === 509) {
        setError('You have downloaded too much data. Please try again later.');
        return;
      }
      setError('Something went wrong. Please, try again later.');
      return;
    }
    setError(null);
    const geoJson = osmtogeojson(response.data);

    container.mapService.setView(left, bottom, right, top);
    container.mapService.setGeoJson(geoJson, theme);
  };

  return (
    <Container>
      <CoordinatesCard
        error={error ?? undefined}
        onChange={getCoordinates}
        onClear={() => setError(null)}
      />
      <div className={styles.mapContainer} id="map" />
    </Container>
  );
}

export default App;

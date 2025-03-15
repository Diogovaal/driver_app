import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { databases } from '@/lib/appwrite';
import { Load } from '../types/index'; // Importe a interface Load

const LoadDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { loadId } = route.params;
  const [load, setLoad] = useState<Load | null>(null); // Tipagem do estado load
  // Removendo o useTailwind, pois usaremos className
  useEffect(() => {
    fetchLoadDetails();
  }, [loadId]);

  const fetchLoadDetails = async () => {
    try {
      const response = await databases.getDocument<Load>( // Tipagem da resposta do getDocument
        'YOUR_DATABASE_ID',
        'loads',
        loadId
      );
      setLoad(response);
    } catch (error) {
      console.error('Erro ao buscar detalhes da carga:', error);
    }
  };

  if (!load) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl font-bold p-4">{load.description}</Text>
      <Text className="p-4">Origem: {load.origin}</Text>
      <Text className="p-4">Destino: {load.destination}</Text>
      <Text className="p-4">Status: {load.status}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: load.latitude,
          longitude: load.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: load.latitude, longitude: load.longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
  },
});

export default LoadDetailsScreen;
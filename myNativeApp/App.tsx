import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as MapLibreGL from '@maplibre/maplibre-react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapLibreGL.MapView style={styles.map}>
        <MapLibreGL.Camera
          zoomLevel={13}
          centerCoordinate={[127.3853206539668, 36.35021741673337]}
        />
      </MapLibreGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
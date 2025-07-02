import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as MapLibreGL from '@maplibre/maplibre-react-native';

export interface BusNode {
  gpslati: number; // 위도
  gpslong: number; // 경도
  nodeid: string; // 노드 ID
  nodenm: string; // 정류장 이름
  nodeno: number; // 정류장 번호
}

export default function App() {
  const myKey = "c8BF1UzHGMf4wHXXcPbo";
  const [busStations, setBusStations] = useState<BusNode[]>([]);

  useEffect(() => {
    const fetchBusStationInfo = async () => {
      try {
        console.log("API 호출 시작");
        const response = await fetch('http://10.0.2.2:4000/api/busStationInfo');
        const data = await response.json();
        console.log("API 응답:", data);
        setBusStations(data.data);
      } catch (err) {
        console.error("API 에러:", err);
      }
    }
    fetchBusStationInfo();
  }, []);

  return (
    <View style={styles.container}>
      <MapLibreGL.MapView
        style={styles.map}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${myKey}`}
      >
        <MapLibreGL.Camera
          zoomLevel={13}
          centerCoordinate={[127.3853206539668, 36.35021741673337]}
        />
        {busStations.map((station, idx) => (
          <MapLibreGL.PointAnnotation
            key={idx}
            id={station.nodeid?.toString() || idx.toString()}
            coordinate={[Number(station.gpslong), Number(station.gpslati)]}
            onSelected={() => {
              console.log(`정류장: ${station.nodenm}`);
            }}
          >
            <View style={{ width: 20, height: 20, backgroundColor: 'blue', borderRadius: 10, borderWidth: 2, borderColor: 'white' }} />
          </MapLibreGL.PointAnnotation>
        ))}
      </MapLibreGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
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
  const [selectedStation, setSelectedStation] = useState<BusNode | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

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

  const handleMarkerPress = (station: BusNode) => {
    setSelectedStation(station);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedStation(null);
  };

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
            onSelected={() => handleMarkerPress(station)}
          >
            <View style={styles.marker} />
          </MapLibreGL.PointAnnotation>
        ))}
      </MapLibreGL.MapView>

      {/* 팝업 Modal */}
      <Modal
        visible={popupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closePopup}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closePopup}
        >
          <View style={styles.popup}>
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.popupTitle}>
                {selectedStation?.nodenm}
              </Text>
              <Text style={styles.popupText}>
                정류장 번호: {selectedStation?.nodeno}
              </Text>
              <Text style={styles.popupText}>
                노드 ID: {selectedStation?.nodeid}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closePopup}
              >
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  popupText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
// apps/mobile/src/screens/KakaoMapWebView.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export const KakaoMapWebView = () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html, body, #map {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=da46d30fc657b6fa072a990874ffb705&autoload=false"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청
            level: 3
          };
          var map = new kakao.maps.Map(container, options);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});

export default KakaoMapWebView;

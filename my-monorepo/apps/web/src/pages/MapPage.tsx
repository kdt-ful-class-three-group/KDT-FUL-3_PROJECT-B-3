import React, { useEffect, useRef } from 'react';
import { KakaoMap } from '../components/KakaoMap';

export const MapPage = () => {
  return (
    <div>
      <h2>🚌 카카오 지도 - 정류장 마커 (지도 이동 시 업데이트)</h2>
      {/* <div id="map" style={{ width: '100%', height: '500px' }} /> */}
      <KakaoMap />
    </div>
  );
};

export default MapPage;

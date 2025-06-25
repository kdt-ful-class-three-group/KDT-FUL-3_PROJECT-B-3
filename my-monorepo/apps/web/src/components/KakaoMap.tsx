import React, { useEffect, useRef, useState } from 'react';
import useBusMarkers from '../hooks/useBusMarker';

declare global {
  interface Window {
    kakao: any;
  }
}

const appKey = '';
// 기본 위치 : 대전광역시청
const KAKAO_CENTER = { lat: 36.3504119, lng: 127.3845475 };

export const KakaoMap = () => {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [address, setAddress] = useState<string>(''); // ✅ 상태 직접 관리

  const { fetchAndRenderMarkers } = useBusMarkers(mapRef, markersRef);

  useEffect(() => {
    // 첫 번째 지도 렌더링
    const initializeMap = () => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(KAKAO_CENTER.lat, KAKAO_CENTER.lng),
        level: 4,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;

      // ✅ 주소 갱신 함수
      const updateAddress = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const center = map.getCenter();
        geocoder.coord2Address(center.getLng(), center.getLat(), (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            const name =
              result[0].road_address?.address_name || result[0].address?.address_name;
            setAddress(name);
          }
        });
      };

      // ✅ idle 이벤트 등록: 주소 + 정류장 마커 모두 갱신
      window.kakao.maps.event.addListener(map, 'idle', () => {
        const center = map.getCenter();
        fetchAndRenderMarkers(center.getLat(), center.getLng());
        updateAddress(); // ✅ 추가
      });

      // ✅ 최초 실행
      fetchAndRenderMarkers(KAKAO_CENTER.lat, KAKAO_CENTER.lng);
      updateAddress(); // ✅ 최초 주소
    };

    // 카카오 지도 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => window.kakao.maps.load(initializeMap);
  }, [mapRef.current]);

  return (
    <div>
      <div style={{ padding: '10px', fontWeight: 'bold' }}>📍 현재 위치: {address}</div>
      <div id="map" style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default KakaoMap;
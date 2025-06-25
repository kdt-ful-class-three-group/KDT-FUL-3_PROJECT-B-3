const API_KEY = ''

export const useBusMarkers = (
  mapRef: React.MutableRefObject<any>,
  markersRef: React.MutableRefObject<any[]>
) => {
  const fetchAndRenderMarkers = async (lat: number, lng: number) => {
    const url = `https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList?serviceKey=${API_KEY}&pageNo=1&numOfRows=30&_type=json&gpsLati=${lat}&gpsLong=${lng}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      const items = data?.response?.body?.items?.item || [];
      console.log(items);
      // 이전 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      items.forEach((stop: any) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(parseFloat(stop.gpslati), parseFloat(stop.gpslong)),
          map: mapRef.current,
          title: stop.nodenm,
        });

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">🚌 ${stop.nodenm}</div>`,
        });

        let isOpen = false;
        window.kakao.maps.event.addListener(marker, 'click', () => {
          isOpen ? infoWindow.close() : infoWindow.open(mapRef.current, marker);
          isOpen = !isOpen;
        });

        markersRef.current.push(marker);
      });
    } catch (err) {
      console.error('🚨 API 호출 실패:', err);
    }
  };

  return { fetchAndRenderMarkers };
};

export default useBusMarkers;

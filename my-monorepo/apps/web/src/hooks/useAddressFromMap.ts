// import { useState, useEffect } from 'react';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// const useAddressFromMap = (mapRef: React.MutableRefObject<any>) => {
//   const [address, setAddress] = useState<string>('');

//   useEffect(() => {
//     if (!mapRef.current || !window.kakao?.maps?.services) return;

//     const geocoder = new window.kakao.maps.services.Geocoder();

//     const updateAddress = () => {
//       const center = mapRef.current.getCenter();
//       geocoder.coord2Address(center.getLng(), center.getLat(), (result: any, status: any) => {
//         if (status === window.kakao.maps.services.Status.OK && result[0]) {
//           const name = result[0].address?.address_name || result[0].road_address?.address_name;
//           setAddress(name);
//           console.log(name)
//         } else {
//           console.warn('❌ 주소 변환 실패:', status);
//         }
//       });
//     };

//     // 📌 이벤트가 중복 등록되지 않도록 기존 리스너 제거
//     window.kakao.maps.event.removeListener(mapRef.current, 'idle', updateAddress);

//     // ✅ 지도가 멈출 때마다 주소 갱신
//     window.kakao.maps.event.addListener(mapRef.current, 'idle', updateAddress);

//     // ✅ 초기 주소 표시
//     updateAddress();

//     // 💡 컴포넌트가 언마운트될 때 이벤트 제거
//     return () => {
//       window.kakao.maps.event.removeListener(mapRef.current, 'idle', updateAddress);
//     };
//   }, [mapRef.current]); // 여기 핵심: mapRef.current가 바뀌면 다시 실행됨

//   return address;
// };

// export default useAddressFromMap;


// hooks/useAddressFromMap.ts

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const useAddressFromMap = (mapRef: React.MutableRefObject<any>) => {
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const kakao = window.kakao;
    if (!mapRef.current || !kakao?.maps?.services) return;
    
    // Geocoder 인스턴스 생성 
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소 업데이트
    const updateAddress = () => {
        // 지도 중심 좌표
        const center = mapRef.current.getCenter();
        geocoder.coord2Address(center.getLng(), center.getLat(), (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK && result[0]) {
          const name =
            result[0].road_address?.address_name || result[0].address?.address_name;
          setAddress(name);
        }
      });
    };

    // 🔁 기존 이벤트 리스너 제거하고 재등록 (중복 방지)
    kakao.maps.event.removeListener(mapRef.current, 'idle', updateAddress);
    kakao.maps.event.addListener(mapRef.current, 'idle', updateAddress);

    // ✅ 최초 한 번 실행
    updateAddress();

    // 👇 cleanup on unmount
    return () => {
      kakao.maps.event.removeListener(mapRef.current, 'idle', updateAddress);
    };
  }, [!!mapRef.current]); // 핵심: mapRef.current가 설정된 후 실행됨

  return address;
};

export default useAddressFromMap;


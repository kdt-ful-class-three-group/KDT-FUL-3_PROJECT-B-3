import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Map from "./map/Map";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <Map />
      {/* 개발 환경에서만 표시 */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

export default App;

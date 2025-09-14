import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, HeatmapLayer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 51.09546,
  lng: 71.42753
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["visualization"]
  });

  const [points, setPoints] = useState([]);
  const [mode, setMode] = useState("routes"); // "routes" или "traffic"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/heatmap?limit=50000")
      .then((res) => res.json())
      .then((data) => {
        if (mode === "routes") {
          // только lat/lng
          const googlePoints = data.map(
            (item) => new window.google.maps.LatLng(item.lat, item.lng)
          );
          setPoints(googlePoints);
        } else if (mode === "traffic") {
          // lat/lng + spd
          const googlePoints = data.map((item) => ({
            location: new window.google.maps.LatLng(item.lat, item.lng),
            weight: item.spd
          }));
          setPoints(googlePoints);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
        setLoading(false);
      });
  }, [mode]); // перезапуск при смене режима

  const heatmapOptionsTraffic = {
    radius: 20,
    opacity: 0.8,
    gradient: [
      "rgba(0, 255, 0, 0)",
      "rgba(0, 255, 0, 1)",
      "rgba(255, 255, 0, 1)",
      "rgba(255, 165, 0, 1)",
      "rgba(255, 0, 0, 1)"
    ]
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">Brainified</h1>
      </header>

      {/* Main container */}
      <div className="flex flex-1 bg-white shadow-inner m-4 rounded-lg overflow-hidden">
        {/* Aside */}
        <aside className="w-60 bg-gray-100 border-r p-4 flex flex-col space-y-2">
          <button
            className={`p-2 rounded ${mode === "routes" ? "bg-blue-500 text-white" : "bg-white border"}`}
            onClick={() => setMode("routes")}
          >
            Популярные маршруты
          </button>
          <button
            className={`p-2 rounded ${mode === "traffic" ? "bg-blue-500 text-white" : "bg-white border"}`}
            onClick={() => setMode("traffic")}
          >
            Загруженность дорог
          </button>
        </aside>

        {/* Right part */}
        <main className="flex-1 flex flex-col">
          <p className="text-center text-lg py-2 bg-gray-50 border-b">
            Тепловая карта
          </p>

          <div className="flex-1 relative">
            {isLoaded ? (
              <>
                {loading && (
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Загрузка данных...
                  </p>
                )}
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                  {points.length > 0 && (
                    <HeatmapLayer
                      data={points}
                      options={mode === "traffic" ? heatmapOptionsTraffic : {}}
                    />
                  )}
                </GoogleMap>
              </>
            ) : (
              <p className="text-center mt-4">Загрузка карты...</p>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-3 text-center shadow-md">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;

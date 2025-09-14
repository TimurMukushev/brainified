from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from shapely.geometry import LineString

app = Flask(__name__)
CORS(app)

# Загружаем датасет
df = pd.read_csv("geo_locations_astana_hackathon.txt", sep=",")
coords = df[["lat", "lng", "spd"]].copy()

# Предварительно упрощаем все точки подряд
TOLERANCE = 0.0001  # ~10 метров
line = LineString(list(zip(coords["lng"], coords["lat"])))
simplified = line.simplify(TOLERANCE, preserve_topology=False)
simplified_coords = [{"lat": lat, "lng": lng, "spd": coords.iloc[i]["spd"]} 
                     for i, (lng, lat) in enumerate(simplified.coords) 
                     if i < len(coords)]  # сохраняем spd из исходного

@app.route("/api/heatmap")
def heatmap():
    limit = int(request.args.get("limit", 50000))
    return jsonify(simplified_coords[:limit])

if __name__ == "__main__":
    app.run(debug=True, port=5000)

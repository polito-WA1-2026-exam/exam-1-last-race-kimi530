import { useEffect, useState } from "react";
import { getNetwork } from "../api/Game";

const stationPositions = {
  Chitgar: { x: 80, y: 120, labelX: 80, labelY: 100, anchor: "middle" },
  Azadi: { x: 210, y: 120, labelX: 210, labelY: 100, anchor: "middle" },
  "Eram Sabz": { x: 340, y: 120, labelX: 340, labelY: 100, anchor: "middle" },
  Bime: { x: 470, y: 120, labelX: 470, labelY: 100, anchor: "middle" },
  Ekbatan: { x: 600, y: 120, labelX: 600, labelY: 100, anchor: "middle" },

  Mirdamad: { x: 80, y: 260, labelX: 42, labelY: 264, anchor: "middle" },
  Tajrish: { x: 80, y: 400, labelX: 42, labelY: 404, anchor: "middle" },
  Gheitarie: { x: 80, y: 540, labelX: 42, labelY: 544, anchor: "middle" },
  Gholhak: { x: 80, y: 680, labelX: 42, labelY: 684, anchor: "middle" },

  Saadi: { x: 210, y: 260, labelX: 240, labelY: 264, anchor: "start" },
  Nabard: { x: 210, y: 400, labelX: 240, labelY: 404, anchor: "start" },
  Piroozi: { x: 210, y: 540, labelX: 240, labelY: 544, anchor: "start" },

  "Amir Kabir": { x: 340, y: 400, labelX: 370, labelY: 404, anchor: "start" },
  Molavi: { x: 340, y: 540, labelX: 370, labelY: 544, anchor: "start" },
  Khayam: { x: 340, y: 680, labelX: 370, labelY: 684, anchor: "start" },
};

const lineColors = {
  1: "#4CAF50",
  2: "#2196F3",
  3: "#FFC107",
  4: "#E91E63",
};

function NetworkMap({ showLines = true }) {
  const [network, setNetwork] = useState([]);

  useEffect(() => {
    getNetwork()
      .then((data) => {
        setNetwork(data);
      })
      .catch(console.error);
  }, []);

  if (!network.length) {
    return <div>Loading network...</div>;
  }

  const lines = network.reduce((acc, station) => {
    if (!acc[station.line_id]) {
      acc[station.line_id] = [];
    }

    acc[station.line_id].push(station);
    return acc;
  }, {});

  const stationCounts = {};

  network.forEach((station) => {
    stationCounts[station.id] = (stationCounts[station.id] || 0) + 1;
  });

  const uniqueStations = Object.values(
    network.reduce((acc, station) => {
      acc[station.id] = station;
      return acc;
    }, {}),
  );

  return (
    <svg width="65%" viewBox="0 0 680 780" role="img">
      <title>Last Race metro network map</title>

      {showLines &&
        Object.values(lines).map((stations) =>
          stations.slice(0, -1).map((station, index) => {
            const next = stations[index + 1];

            const from = stationPositions[station.name];
            const to = stationPositions[next.name];

            if (!from || !to) return null;

            return (
              <line
                key={`${station.line_id}-${station.id}-${next.id}-${index}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={lineColors[station.line_id]}
                strokeWidth="5"
                strokeLinecap="round"
              />
            );
          }),
        )}

      {uniqueStations.map((station) => {
        const pos = stationPositions[station.name];

        if (!pos) return null;

        const isInterchange = stationCounts[station.id] > 1;

        return (
          <g key={station.id}>
            {isInterchange ? (
              <>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="14"
                  fill="white"
                  stroke="#888"
                  strokeWidth="1.5"
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="8"
                  fill="#333"
                  stroke="white"
                  strokeWidth="2"
                />
              </>
            ) : (
              <circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill="white"
                stroke="#ccc"
                strokeWidth="1.5"
              />
            )}

            <text
              x={pos.labelX}
              y={pos.labelY}
              textAnchor={pos.anchor}
              fontSize="11"
              fill="var(--color-text-primary)"
            >
              {station.name}
            </text>
          </g>
        );
      })}

      {showLines && (
        <>
          <rect x="460" y="580" width="14" height="5" fill="#4CAF50" rx="2" />
          <text x="480" y="587" fontSize="12">
            Green line
          </text>

          <rect x="460" y="600" width="14" height="5" fill="#2196F3" rx="2" />
          <text x="480" y="607" fontSize="12">
            Blue line
          </text>

          <rect x="460" y="620" width="14" height="5" fill="#FFC107" rx="2" />
          <text x="480" y="627" fontSize="12">
            Yellow line
          </text>

          <rect x="460" y="640" width="14" height="5" fill="#E91E63" rx="2" />
          <text x="480" y="647" fontSize="12">
            Pink line
          </text>
        </>
      )}
    </svg>
  );
}

export default NetworkMap;

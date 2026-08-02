/**
 * PowerMapRadar — Gráfico radar de Funciones Ejecutivas (US-002)
 * Visualiza el "Mapa de Poder" del adolescente con react-native-svg.
 */

import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';

interface RadarItem {
  key: string;
  label: string;
  score: number; // 0-100
  icon: string;
  color: string;
}

export function PowerMapRadar({ data, size = 240 }: { data: RadarItem[]; size?: number }) {
  const center = size / 2;
  const radius = size / 2 - 34;
  const n = data.length;

  // Punto en el radar para un índice y radio dado
  const point = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Anillos de fondo
  const rings = [0.25, 0.5, 0.75, 1];

  // Polígono de datos
  const dataPoints = data
    .map((d, i) => {
      const p = point(i, radius * (d.score / 100));
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <View>
      <Svg width={size} height={size}>
        {/* Anillos */}
        {rings.map((ring, ri) => {
          const pts = data
            .map((_, i) => {
              const p = point(i, radius * ring);
              return `${p.x},${p.y}`;
            })
            .join(' ');
          return (
            <Polygon
              key={ri}
              points={pts}
              fill="none"
              stroke="#334155"
              strokeWidth={1}
            />
          );
        })}

        {/* Ejes */}
        {data.map((_, i) => {
          const p = point(i, radius);
          return (
            <Line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="#334155"
              strokeWidth={1}
            />
          );
        })}

        {/* Área de datos */}
        <Polygon
          points={dataPoints}
          fill="rgba(167, 139, 250, 0.35)"
          stroke="#A78BFA"
          strokeWidth={2}
        />

        {/* Puntos de datos */}
        {data.map((d, i) => {
          const p = point(i, radius * (d.score / 100));
          return <Circle key={i} cx={p.x} cy={p.y} r={4} fill={d.color} />;
        })}

        {/* Iconos en los vértices */}
        {data.map((d, i) => {
          const p = point(i, radius + 18);
          return (
            <SvgText
              key={i}
              x={p.x}
              y={p.y + 5}
              fontSize={16}
              textAnchor="middle"
            >
              {d.icon}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

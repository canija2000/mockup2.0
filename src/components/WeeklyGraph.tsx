import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface WeeklyGraphProps {
  data: number[];
  meanLineValue?: number;
}

export function WeeklyGraph({ data, meanLineValue }: WeeklyGraphProps) {
  const weeks = Array.from({ length: 16 }, (_, i) => `Semana ${i + 1}`);

  const chartData = {
    labels: weeks,
    datasets: [
      {
        label: 'Horas promedio dedicadas',
        data: data,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        
      },
      title: {
        display: true,
        text: 'Tiempo promedio semanal invertido en el curso',
      },
      annotation: {
        annotations: meanLineValue
          ? {
              horizontalLine: {
                type: 'line',
                yMin: meanLineValue,
                yMax: meanLineValue,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                borderDash: [10, 5], // Dashed line
                label: {
                  content: `Objetivo: ${meanLineValue} horas`,
                  enabled: true,
                  position: 'center',
                  backgroundColor: 'rgba(255, 99, 132, 0.8)',
                },
              },
            }
          : {},
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Horas',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Line options={options} data={chartData} />
    </div>
  );
}
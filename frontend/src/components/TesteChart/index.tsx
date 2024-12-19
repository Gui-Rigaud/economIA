"use client"

import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

export function TesteChart() {
  return (
    
    <Doughnut
      data={{
        labels: ["A", "B", "C", "D"],
        datasets: [{
          label: "Gastos",
          data: [10, 25, 10, 6],
          backgroundColor: ["#216869", "#48a078", "#9cc5a1", "#FFE4"],

        }]
      }}
      options={{
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      }}
    />)
}
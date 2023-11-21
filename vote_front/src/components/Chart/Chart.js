import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const VotingResultsChart = ({ data }) => {
  const votes = data.reduce((acc, current) => {
    acc[current.glos] = (acc[current.glos] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(votes),
    datasets: [
      {
        data: Object.values(votes),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF99'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF99'],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false, // Dodane, aby wyłączyć zachowanie proporcji
    responsive: true,
  };

  return (
    <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h2>Wyniki Głosowania</h2>
      <Pie data={chartData} options={pieOptions} />
    </div>
  );
};

export default VotingResultsChart;

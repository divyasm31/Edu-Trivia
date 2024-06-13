import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './quizPieChart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const QuizPieChart = ({ correctAnswers, wrongAnswers }) => {
  const data = {
    labels: ['Correct Answers', 'Wrong Answers'],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ['#00853f', '#e51b1b'],
        hoverBackgroundColor: ['#aee6b4', '#f57979'],
      },
    ],
  };

  return (
    <div className='pie-chart container bg-transparent'>
      <Pie data={data} />
    </div>
  );
};

export default QuizPieChart;

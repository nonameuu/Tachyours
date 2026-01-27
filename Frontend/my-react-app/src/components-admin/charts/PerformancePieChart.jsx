import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function PerformancePieChart() {
  const data = {
    labels: ["Completed", "In Progress", "Rush"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#7ba98d", "#f3ef8f", "#d96b6b"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: { legend: { position: "left" } },
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
}

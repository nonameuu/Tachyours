import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

export default function SalesLineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [12000, 9000, 15000, 24500, 11000, 21000, 18000, 23000, 14000, 22000, 19000, 13000],
        borderColor: "#8b7cf6",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { callback: (v) => `₱ ${v}` } },
    },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
}

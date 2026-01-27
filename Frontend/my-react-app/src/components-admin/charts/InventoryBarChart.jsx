import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

export default function InventoryBarChart() {
  const data = {
    labels: ["Fabric", "Thread", "Garter", "Ink", "Subli Paper"],
    datasets: [
      {
        data: [350, 450, 220, 380, 150],
        backgroundColor: "#b6a7f2",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
}

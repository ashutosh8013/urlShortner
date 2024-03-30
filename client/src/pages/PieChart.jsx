import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
export default function PieChart({ desktop, mobile, otherDevices }) {
  const chartRef = useRef(null);

  const chartInstance = useRef(null);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["desktop", "mobile", "other Devices"],
        datasets: [
          {
            data: [desktop, mobile, otherDevices],
            backgroundColor: [
              "rgb(255,99,132)",
              "rgb(54,162,235)",
              "rgb(255,205,86)",
            ],
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);
  return (
    <div>
      <canvas ref={chartRef} style={{ width: "300", height: "300" }}></canvas>
    </div>
  );
}

export function fetchData() {
  return fetch("./multi_chart_data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Loaded data:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
}

//  Chart.js function
export function createChart(chartId, chartType, chartData, chartOptions = {}) {
  var ctx = document.getElementById(chartId).getContext("2d");
  new Chart(ctx, {
    type: chartType,
    data: chartData,
    options: Object.assign(
      {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      chartOptions
    ),
  });
}

// line chart by models
export function renderModelLineChart(data) {
  const modelLineData = data.model_chart_line;

  //colors
  const colors = [
    "rgba(54, 162, 235, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(201, 203, 207, 1)",
  ];

  modelLineData.datasets.forEach((dataset, index) => {
    dataset.borderColor = colors[index % colors.length];
  });

  createChart("myChartModelLine", "line", modelLineData);
}

// bar chart by models
export function renderModelBarChart(data) {
  const modelBarData = data.model_chart_bar;
  createChart("myChartModelBar", "bar", modelBarData);
}

// line chart by versions
export function renderVersionLineChart(data) {
  const versionLineData = data.version_chart_line;

  const colors = [
    "rgba(54, 162, 235, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(201, 203, 207, 1)",
  ];

  versionLineData.datasets.forEach((dataset, index) => {
    dataset.borderColor = colors[index % colors.length];
  });

  createChart("myChartVersionLine", "line", versionLineData);
}

// bar chart by versions
export function renderVersionBarChart(data) {
  const versionBarData = data.version_chart_bar;
  createChart("myChartVersionBar", "bar", versionBarData);
}

// combined chart(Bar + Line) by models
export function renderModelComboChart(data) {
  const modelComboData = data.model_chart;
  createChart("myChartModelCombo", "bar", modelComboData);
}

// combined chart(Bar + Line) by versions
export function renderVersionComboChart(data) {
  const versionComboData = data.version_chart;
  createChart("myChartVersionCombo", "bar", versionComboData);
}

// talbe function
export function renderChargerIssuesTable(data) {
  const chargersToCheck = data.chargers_to_check;
  const tableBody = document.getElementById("tableBody");

  chargersToCheck.forEach((item) => {
    const sum = item.response_status_rejected + item.consumption_zero;
    const row = `
        <tr>
          <td>${item.ID}</td>
          <td>${item.response_status_rejected}</td>
          <td>${item.consumption_zero}</td>
          <td>${sum}</td>
          <td>${item.Date}</td>
        </tr>`;
    tableBody.innerHTML += row;
  });

  $("#chargersTable").DataTable({
    pageLength: 10,
    searching: true,
    ordering: true,
    order: [[3, "desc"]],
  });
}

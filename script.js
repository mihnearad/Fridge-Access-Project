document.addEventListener("DOMContentLoaded", function () {
  // Load the data and setup the initial chart
  d3.json("processed_data.json").then(function (data) {
    let allData = data; // Store the original dataset

    function updateChart(filteredData) {
      // Define traces for each time interval
      var trace1 = {
        x: filteredData.map((item) => item.date),
        y: filteredData.map((item) => item.Morning || 0),
        name: "Morning",
        type: "bar",
        marker: {
          color: "#F7E98E  ",
        },
      };
      var trace2 = {
        x: filteredData.map((item) => item.date),
        y: filteredData.map((item) => item.Afternoon || 0),
        name: "Afternoon",
        type: "bar",
        marker: {
          color: "#FFDAB9  ",
        },
      };
      var trace3 = {
        x: filteredData.map((item) => item.date),
        y: filteredData.map((item) => item.Evening || 0),
        name: "Evening",
        type: "bar",
        marker: {
          color: "#FFB6C1",
        },
      };
      var trace4 = {
        x: filteredData.map((item) => item.date),
        y: filteredData.map((item) => item.Night || 0),
        name: "Night",
        type: "bar",
        marker: {
          color: "#B0C4DE ",
        },
      };

      // Create annotations for total opens per day
      var annotations = filteredData.map((item) => {
        return {
          x: item.date,
          y: item.Total + 2,
          text: `Total: ${item.Total}`,
          showarrow: false,
          font: {
            size: 14,
            color: "#000",
          },
        };
      });

      var layout = {
        barmode: "stack",
        paper_bgcolor: "rgba(255, 255, 255, 1)",
        plot_bgcolor: "rgba(0,0,0,0)",
        showlegend: true,
        xaxis: {
          title: "Date",
        },
        yaxis: {
          title: "# of Opens",
        },
        bargap: 0.1,
        bargroupgap: 0.1,
        annotations: annotations,
      };

      Plotly.newPlot("chart", [trace1, trace2, trace3, trace4], layout);
    }

    // Initialize the chart with all data
    updateChart(allData);

    // Filter button event listener
    document
      .getElementById("filter-button")
      .addEventListener("click", function () {
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;

        // Filter data based on the selected date range
        const filteredData = allData.filter((item) => {
          return (
            (!startDate || item.date >= startDate) &&
            (!endDate || item.date <= endDate)
          );
        });

        // Update the chart with the filtered data
        updateChart(filteredData);
      });
  });
});

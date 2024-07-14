async function renderizarGrafico(dias, valores, moneda) {
    const ctx = document.getElementById("chart");
    
    // Destruir el gráfico anterior si existe
    if (grafico) {
      grafico.destroy();
    }
  
    //  gráfico
    grafico = new Chart(ctx, {
      type: "line", 
      data: {
        labels: dias, 
        datasets: [
          {
            label: `Valor del ${moneda} en los últimos 10 días`, 
            data: valores, 
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
              "rgba(102, 255, 153, 0.2)",
              "rgba(255, 128, 128, 0.2)",
              "rgba(255, 230, 179, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
              "rgb(102, 255, 153)",
              "rgb(255, 128, 128)",
              "rgb(255, 230, 179)",
            ],
            borderWidth: 5, 
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
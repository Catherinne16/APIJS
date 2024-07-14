// Selecciona el formulario y añade un event listener para manejar el envío del formulario
const formulario = document.querySelector("#formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  convertirValor();
  formulario.reset();
});

// Función principal para convertir el valor
const convertirValor = async function () {
  try {
    const valor = Number(document.querySelector("#valor").value);
    const moneda = document.querySelector("#moneda").value;
    if (valor && moneda != "sin seleccion") {
      const respuesta = await obtenerDatos(moneda);
      const valorApi = respuesta.serie[0].valor;
      const dias = respuesta.serie
        .map((d) => d.fecha.split("T", 1)[0])
        .slice(0, 10)
        .reverse();
      const valores = respuesta.serie
        .map((v) => v.valor)
        .slice(0, 10)
        .reverse();

      await mostrarResultado(valor, valorApi);
      await renderizarGrafico(dias, valores, moneda);
    } else {
      return alert("Debe ingresar un valor");
    }
  } catch (error) {
    return alert("Error al obtener los datos");
  }
};

// Función para obtener los datos de la API
async function obtenerDatos(moneda) {
  const res = await fetch(`https://mindicador.cl/api/${moneda}`);
  if (!res.ok) {
    throw new Error("Error al obtener datos de la API");
  } else {
    return await res.json();
  }
}

// Función para mostrar el resultado de la conversión
async function mostrarResultado(valorUsuario, valorApi) {
  const valorConvertido = valorUsuario / valorApi;
  document.querySelector(
    "#resultado"
  ).textContent = `El valor convertido es: ${valorConvertido.toFixed(2)}`;
}

let grafico;

// renderizar el gráfico
async function renderizarGrafico(dias, valores, moneda) {
  const ctx = document.getElementById("chart");
  
  if (grafico) {
    grafico.destroy();
  }

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
          beginAtZero: false,
        },
      },
    },
  });
}

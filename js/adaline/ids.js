const canvasError = document.getElementById('errorChart');
const canvasRegression = document.getElementById('linearRegression');
const logContainer = document.getElementById('logContainer');

function log(message) {    
    const logMessage = document.createElement('p');
    logMessage.innerHTML = message;
    logContainer.appendChild(logMessage);
}

function drawChart(label1, dots1, label2, dots2) {
    let ctx = canvasError.getContext('2d');
    // Defina os dados do gráfico de dispersão (exemplo)
    let datas = {
      datasets: [
        {
          label: label1,
          data: dots1,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          pointRadius: 6,
          yAxisID: 'esquerda'
        },
        {
          label: label2,
          data: dots2,
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Cor do grupo 2
          pointRadius: 6,
          yAxisID: 'direita'
        }
      ]
    };
  
    // Configure e crie o gráfico de dispersão
    let chart = new Chart(ctx, {
      type: 'scatter',
      data: datas,
      options: {
        scales: {
            esquerda: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
            },
            direita: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
            }
        }
      }
    });

    canvasError.chart = chart;
}


function drawLinearRegression(label1, dots1, label2, dots2) {
    let ctx = canvasRegression.getContext('2d');

    // Dados do gráfico de dispersão (amostras)
    let data = {
        datasets: [
          {
            label: label1,
            data: dots1,
            borderColor: 'rgba(75, 192, 192, 0.5)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            pointRadius: 6,
            type: 'scatter', // Tipo de gráfico de dispersão
          },
          {
            label: label2,
            data: dots2,
            borderColor: 'red', // Cor da linha
            borderWidth: 2, // Largura da linha
            fill: false, // Não preencha a área sob a linha
            type: 'line', // Tipo de gráfico de linha
          }
        ]
      };
      
      // Configurações do gráfico
      let options = {
        responsive: true
      };
      
      // Crie o gráfico combinado de dispersão e linha
      let chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: options
      });

      canvasRegression.chart = chart;
}

function renderLatex() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "logContainer"]);
}
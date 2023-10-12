class DataSet {
    constructor({data, nro_in, 
                target, nro_out}) {
        this.data = data;
        this.nro_in = nro_in;
        this.nro_cases = data.length/nro_in;

        this.target = target;
        this.nro_out = nro_out;

        // auxiliar
        this.case = 0;
    }

    // Getter
    get x() {
        return this.data.slice(this.case*this.nro_in, this.case*this.nro_in+this.nro_in);
    }

    get t() {
        return this.target.slice(this.case*this.nro_out, this.case*this.nro_out+this.nro_out);
    }
}

class Adaline {
    constructor({data, epochs=1000, alpha = 0.001}) {
        this.alpha = alpha;
        this.data = data;
        this.epochs = epochs;
        
        this.tolerance = 1e-10;
        this.dw = 0;
        this.Biggerdw = 0;
        this.error = 0;
        this.globalError = 0;

        this.w = this.randomUniform(this.data.nro_in*this.data.nro_out);
        this.b = this.randomUniform(this.data.nro_out);
        this.u = [];
        this.y = [];

        this.globalY = [];
        this.winRate = 0;
    }

    zeros(n) {
        const randomList = [];
        for (let i = 0; i < n; i++) {
            randomList.push(-0.4);
        }
        return randomList;
    }

    randomUniform(n) {
        const randomList = [];
        for (let i = 0; i < n; i++) {
            const nro = Math.random()-0.5; // [-0.5,0.5)
            randomList.push(nro);
        }
        return randomList;
    }

    calculateU() {
        for(let j=0; j<this.data.nro_out; j++) { // colunm
            let c = this.b[j];
            for(let i=0; i<this.data.nro_in; i++) { // line a1xnro_in
                c += this.data.x[i]*this.w[i*this.data.nro_out+j];
            }
            this.u[j] = c; 
        }
    }

    activationG(value) {
        return ((value>=0)*2-1)
    }

    updateWeights() {
        this.error = 0;
        let errYTarget;
        for(let j=0; j<this.data.nro_out; j++) {
            errYTarget = this.data.t[j]-this.u[j];
            for(let i=0; i<this.data.nro_in; i++) {
                this.dw = this.alpha*this.data.x[i]*errYTarget; // +a ou - 0, no caso de entrada e saida inteira
                this.w[i*this.data.nro_out+j] += this.dw;
                this.b[j] += this.alpha*errYTarget;                
            }
            this.error += errYTarget*errYTarget

            this.dw = (this.dw > 0) ? this.dw : -this.dw;
            if(this.dw>this.Biggerdw) {
                this.Biggerdw = this.dw;
            }
        }
        this.error /= (2*this.data.nro_out)
    }

    validate() {
        while(this.data.case<this.data.nro_cases){
            for(let j=0; j<this.data.nro_out; j++) { // colunm
                let c = this.b[j];
                for(let i=0; i<this.data.nro_in; i++) { // line a1xnro_in
                    c += this.data.x[i]*this.w[i*this.data.nro_out+j];
                }
                this.u[j] = c; 
                this.y[j] = this.activationG(c);
                if(this.data.t[j]==this.y[j]){
                    this.winRate++;
                }
            }
            this.globalY = this.globalY.concat(this.y);
            this.data.case++;
        }
        this.data.case = 0;
        this.winRate = this.winRate /(this.data.nro_cases*this.data.nro_out)*100;
    }

    train(userWinRate = 100){
        this.winRate = 0;
        this.globalY = [];
        this.globalError = 0;
        while(this.data.case<this.data.nro_cases) {
            this.calculateU();
            this.updateWeights(); 
            this.globalError += this.error;
            this.data.case++;
        }
        this.data.case = 0;
        this.validate();
        this.globalError /= this.data.nro_cases;
        
        return (this.winRate < userWinRate) && (this.Biggerdw > this.tolerance);
    }
}

// inicio
function log(message) {
    const logContainer = document.getElementById('logContainer');
    const logMessage = document.createElement('p');
    logMessage.innerHTML = message;
    logContainer.appendChild(logMessage);
}

function drawChart(element,label1, dots1, label2, dots2) {
    let ctx = document.getElementById(element).getContext('2d');

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
    let myScatterChart = new Chart(ctx, {
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
}

function drawLinearRegression(element,label1, dots1, label2, dots2) {
    // Selecione o elemento canvas
    var ctx = document.getElementById(element).getContext('2d');

    // Dados do gráfico de dispersão (amostras)
    var data = {
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
      var options = {
        responsive: true,
        // maintainAspectRatio: false,
      };
      
      // Crie o gráfico combinado de dispersão e linha
      var myCombinedChart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: options
      });

}

const data = new DataSet({data: x, nro_in: nro_x,
                          target: y, nro_out: nro_y});

let adaline = new Adaline({data, epochs:1000, alpha: 0.01});
let epoch = 1;
let continueCondition = true;
let dots = [];
let dots2 = [];

while ((epoch <= adaline.epochs) && continueCondition) {
    continueCondition = adaline.train();
    // log(`Epoch: ${epoch} global error: ${adaline.globalError}<br>`)  
    // log(`w: ${adaline.w}<br>b: ${adaline.b}<br>`)
    // log(`y: ${adaline.globalY}<br>target: ${adaline.data.target}<br>`)
    // log(`winRate: ${adaline.winRate}%<br><br>`);
    // log(`continue: ${continueCondition}<br><br>`);
    dots.push({x:epoch, y:adaline.globalError})
    dots2.push({x:epoch, y:adaline.winRate})
    epoch++;
}

log(`epochs duration: ${epoch-1}`)
log(`final error: ${adaline.globalError}`)
log(`final win rate: ${adaline.winRate}`)

drawChart('errorChart','Erro quadrático médio', dots, 'Taxa de acerto', dots2);

let dots3 = [], dots4 = [], result, maior = 0, menor = 100;
while(adaline.data.case<adaline.data.nro_cases) {
    dots3.push({x:data.x, y:data.t});
    result = parseFloat(adaline.w*data.x+adaline.b);
    erro = (data.t-result);
    if(maior < erro){
        maior = erro;
    }
    if(menor > erro){
        menor = erro;
    }
    dots4.push({x:data.x, y:result});
    adaline.data.case ++;
}
adaline.data.case = 0;

log(`min diff: ${menor}`)
log(`max diff: ${maior}`)
drawLinearRegression('linearRegression','Amostras', dots3, 'Regressao Linear', dots4);

message = `\\[
    \\begin{bmatrix}
      x_{11} & x_{12} & \\ldots & x_{1n} 
    \\end{bmatrix}
    \\cdot
    \\begin{bmatrix}
      w_{11} & w_{12} & \\ldots & w_{1p} \\\\
      w_{21} & w_{22} & \\ldots & w_{2p} \\\\
      \\vdots & \\vdots & \\ddots & \\vdots \\\\
      w_{n1} & w_{n2} & \\ldots & w_{np}
    \\end{bmatrix}
    +
    \\begin{bmatrix}
      b_{11} \\\\
      b_{21} \\\\
      \\ldots \\\\
      b_{n1} 
    \\end{bmatrix}
    =
    \\begin{bmatrix}
      y_{11} & y_{12} & \\ldots & y_{1p} 
    \\end{bmatrix}
    \\]`

eq = `<br>\\[
    \\begin{bmatrix}`

for (let i=1;i<data.nro_in;i++){
    eq += `x_{1${i}} & `
}

eq += `x_{1${data.nro_in}}
    \\end{bmatrix}
    \\cdot`

eq += `\\begin{bmatrix}`
for (let i=0; i<data.nro_in; i++){
    for (let j=0; j<data.nro_out-1; j++){
        eq += `${adaline.w[i*data.nro_out+j]} & `
    }
    eq += `${adaline.w[i*data.nro_out+data.nro_out-1]} \\\\`
}

eq += `\\end{bmatrix}
+`
eq += `\\begin{bmatrix}`

for (let i=0;i<data.nro_out-1;i++){
    eq += `${adaline.b[i]} \\\\`
}

eq += `${adaline.b[data.nro_out-1]}
    \\end{bmatrix}
    =`

eq += `\\begin{bmatrix}`

for (let i=1;i<data.nro_out;i++){
    eq += `y_{1${i}} & `
}

eq += `y_{1${data.nro_in}}
    \\end{bmatrix}`

eq += `\\approx
\\begin{bmatrix}`

for (let i=1;i<data.nro_out;i++){
    eq += `t_{1${i}} & `
}

eq += `t_{1${data.nro_in}}
    \\end{bmatrix}`

eq += `\\]`

log(message);
log(eq);
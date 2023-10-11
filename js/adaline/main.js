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
    constructor({data, epochs=1000, alpha = 0.01, theta = 0}) {
        this.alpha = alpha;
        this.theta = theta;
        this.data = data;
        this.epochs = epochs;
        
        this.tolerance = 1e-6;
        this.dw = 0;
        this.Biggerdw = 0;
        this.error = 0;
        this.globalError = 0;

        this.w = this.randomUniform(this.data.nro_in*this.data.nro_out);
        this.b = this.randomUniform(this.data.nro_out);
        this.y = [];

        this.globalY = [];
        this.winRate = 0;
    }

    zeros(n) {
        const randomList = [];
        for (let i = 0; i < n; i++) {
            randomList.push(0);
        }
        return randomList;
    }

    randomUniform(n) {
        const randomList = [];

        for (let i = 0; i < n; i++) {
            const nro = Math.random()/2//-0.5; // Gera um número entre 0 (inclusive) e 1 (exclusive)
            randomList.push(nro);
        }
        return randomList;
    }

    calculateY() {
        let c = 0;
        for(let j=0; j<this.data.nro_out; j++) { // colunm
            for(let i=0; i<this.data.nro_in; i++) { // line a1xnro_in
                c += this.data.x[i]*this.w[i*this.data.nro_out+j];
            }
            this.y[j] = this.activationG(c);
        }
    }

    activationG(value) {
        return ((value>=this.theta)*2-1)
    }

    updateWeights() {
        this.error = 0;
        let errYTarget;
        for(let j=0; j<this.data.nro_out; j++) {
            errYTarget = this.data.t[j]-this.y[j];
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
            
            if (errYTarget == 0){
                this.winRate++;
            }
        }
        this.error /= (2*this.data.nro_out)
    }

    train(userWinRate = 100){
        this.winRate = 0;
        this.globalY = [];
        this.globalError = 0;
        while(this.data.case<this.data.nro_cases) {
            this.calculateY();
            this.updateWeights(); // calculando o erro global
            this.globalError += this.error;
            this.globalY = this.globalY.concat(this.y);
            console.log(this.data.t)
            this.data.case++;
        }
        this.globalError /= this.data.nro_cases;
        this.data.case = 0;
        this.winRate = this.winRate /(this.data.nro_cases*this.data.nro_out)*100;
        
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

// const data = new DataSet({data: [-1, -1,
//                                 -1, 1,
//                                 1, -1,
//                                 1, 1],
//                         nro_in: 2,
//                         target: [-1, -1,
//                                 1, -1,
//                                 1, -1,
//                                 1, 1],
//                         nro_out: 2});

const data = new DataSet({data: [-1, -1,
    -1, 1,
    1, -1,
    1, 1],
nro_in: 2,
target: [-1,
    1,
    1,
    1],
nro_out: 1});

let adaline = new Adaline({data, epochs:10});

let epoch = 1;
let continueCondition = true;

while ((epoch <= adaline.epochs) && continueCondition) {
    continueCondition = adaline.train(90);
    log(`Epoch: ${epoch}<br>global error: ${adaline.globalError}<br>`)  
    log(`w: ${adaline.w}<br>b: ${adaline.b}<br>`)
    log(`y: ${adaline.globalY}<br>target: ${adaline.data.target}<br>`)
    log(`winRate: ${adaline.winRate}%<br>`);
    log(`continue: ${continueCondition}<br><br>`);
    epoch++;
}

// message = `\\[
//     \\begin{bmatrix}
//       x_{11} & x_{12} & \\ldots & x_{1n} 
//     \\end{bmatrix}
//     \\cdot
//     \\begin{bmatrix}
//       w_{11} & w_{12} & \\ldots & w_{1p} \\\\
//       w_{21} & w_{22} & \\ldots & w_{2p} \\\\
//       \\vdots & \\vdots & \\ddots & \\vdots \\\\
//       w_{n1} & w_{n2} & \\ldots & w_{np}
//     \\end{bmatrix}
//     +
//     \\begin{bmatrix}
//       b_{11} \\\\
//       b_{21} \\\\
//       \\ldots \\\\
//       b_{n1} 
//     \\end{bmatrix}
//     =
//     \\begin{bmatrix}
//       y_{11} & y_{12} & \\ldots & y_{1p} 
//     \\end{bmatrix}
//     \\]`

// eq = `<br>\\[
//     \\begin{bmatrix}`

// for (let i=1;i<data.nro_in;i++){
//     eq += `x_{1${i}} & `
// }

// eq += `x_{1${data.nro_in}}
//     \\end{bmatrix}
//     \\cdot`

// eq += `\\begin{bmatrix}`
// for (let i=0; i<data.nro_in; i++){
//     for (let j=0; j<data.nro_out-1; j++){
//         eq += `${adaline.w[i*data.nro_out+j]} & `
//     }
//     eq += `${adaline.w[i*data.nro_out+data.nro_out-1]} \\\\`
// }

// eq += `\\end{bmatrix}
// +`
// eq += `\\begin{bmatrix}`

// for (let i=0;i<data.nro_out-1;i++){
//     eq += `${adaline.b[i]} \\\\`
// }

// eq += `${adaline.b[data.nro_out-1]}
//     \\end{bmatrix}
//     =`

// eq += `\\begin{bmatrix}`

// for (let i=1;i<data.nro_out;i++){
//     eq += `y_{1${i}} & `
// }

// eq += `y_{1${data.nro_in}}
//     \\end{bmatrix}`

// eq += `\\approx
// \\begin{bmatrix}`

// for (let i=1;i<data.nro_out;i++){
//     eq += `t_{1${i}} & `
// }

// eq += `t_{1${data.nro_in}}
//     \\end{bmatrix}`

// eq += `\\]`

// log(message);
// log(eq);
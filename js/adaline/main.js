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
    constructor({data, epochs=1000, alpha = 0.001, userWinRate = 100, tolerance = 1e-6}) {
        this.alpha = alpha;
        this.data = data;
        this.epochs = epochs;
        this.userWinRate = userWinRate;
        
        this.tolerance = tolerance;
        this.dw = 0;
        this.db = 0;

        this.biggerdw = 0;
        this.oldW = 0;
        this.oldB = 0;
        
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
        return value //((value>=0)*2-1)
    }

    updateWeights() {
        this.error = 0;
        let errYTarget;
        for(let j=0; j<this.data.nro_out; j++) {
            errYTarget = this.data.t[j]-this.u[j];
            for(let i=0; i<this.data.nro_in; i++) {
                this.dw = this.alpha*this.data.x[i]*errYTarget; // +a ou - 0, no caso de entrada e saida inteira
                this.db = this.alpha*errYTarget;
                this.w[i*this.data.nro_out+j] += this.dw;
                this.b[j] += this.db;                
            }
            this.error += errYTarget*errYTarget
        }
        this.error /= (2*this.data.nro_out)
    }

    validate() {
        let error;
        while(this.data.case<this.data.nro_cases){
            for(let j=0; j<this.data.nro_out; j++) { // colunm
                let c = this.b[j];
                for(let i=0; i<this.data.nro_in; i++) { // line a1xnro_in
                    c += this.data.x[i]*this.w[i*this.data.nro_out+j];
                }
                this.u[j] = c; 
                this.y[j] = this.activationG(c);
                error = (this.data.t[j]-this.y[j])
                if(error<=(100-this.userWinRate)*this.data.t[j]){
                    this.winRate++;
                }
            }
            this.globalY = this.globalY.concat(this.y);
            this.data.case++;
        }
        this.data.case = 0;
        this.winRate = this.winRate / (this.data.nro_cases*this.data.nro_out) *100;

        for(let i in this.w){ // w é matrix represeentada como vetor
            this.dw = this.oldW[i] - this.w[i];
            this.dw = (this.dw > 0) ? this.dw : -this.dw;
            if(this.biggerdw<this.dw){
                this.biggerdw = this.dw;
            }
        }
        for(let i in this.b){ // w é matrix represeentada como vetor
            this.db = this.oldB[i] - this.b[i];
            this.db = (this.db > 0) ? this.db : -this.db;
            if(this.biggerdw<this.db){
                this.biggerdw = this.db;
            }
        }
    }

    train(){
        this.biggerdw = 0;
        this.oldW = this.w.slice(0,this.data.nro_in*this.data.nro_out);
        this.oldB = this.b.slice(0,this.data.nro_out);
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
        
        return (this.winRate < this.userWinRate) && (this.biggerdw >= this.tolerance);
    }
}

// inicio

function adalineTrain(epochs=1000, alpha=0.01, userWinRate=90, tolerance=1e-6){

const data = new DataSet({data: x, nro_in: nro_x,
                          target: y, nro_out: nro_y});

let adaline = new Adaline({data, epochs, alpha, userWinRate, tolerance});
let epoch = 1;
let continueCondition = true;
let dots = [];
let dots2 = [];

// console.log(adaline)

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

drawChart('Erro quadrático médio', dots, 'Taxa de acerto', dots2, epoch-1);

let dots3 = [], dots4 = [], result, maior = 0, menor = 100;
for(let i in data.target) {
    dots3.push({x:data.data[i],y:data.target[i]});
    dots4.push({x:data.data[i],y:adaline.globalY[i]});
    erro = data.target[i]-adaline.globalY[i];
    erro = erro < 0 ? -erro : erro;
    if(maior < erro){
        maior = erro;
    }
    if(menor > erro){
        menor = erro;
    }
}
log(`min diff: ${menor}`)
log(`max diff: ${maior}`)

function mean(v){
    let soma = 0;
    for(let i in v){
        soma += v[i];
    }
    return soma/v.length;
}

function calculateAR(x,y){
    let n = x.length;
    let sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0, sum_y2 = 0;

    for(let i in x){
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i]*y[i];
        sum_x2 += x[i]*x[i];
        sum_y2 += y[i]*y[i];
    }

    let base = n*sum_xy - sum_x*sum_y;
    let baseX = (n*sum_x2-sum_x*sum_x);
    let baseY = (n*sum_y2-sum_y*sum_y);
    let a = base/baseX;
    let r = base/Math.sqrt(baseX*baseY);
    return [a,r];
}

result = calculateAR(data.data, data.target);
let a = result[0],r = result[1];
let b = mean(data.target) - a*mean(data.data);
let eqAB = `\\[x\\cdot${a}+${b}=y\\]`;

log(eqAB)
log(`Coeficiente de correlação de Pearson: ${r}<br>
Coeficiente de determinação: ${r*r}`)

drawLinearRegression('Amostras', dots3, 'Regressao Linear', dots4);

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

// log(message);
log(eq);

}
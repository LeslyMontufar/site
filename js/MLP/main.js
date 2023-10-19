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

    get x() {
        return this.data.slice(this.case*this.nro_in, this.case*this.nro_in+this.nro_in);
    }

    get t() {
        return this.target.slice(this.case*this.nro_out, this.case*this.nro_out+this.nro_out);
    }
}

class MLP {
    constructor({data, epochs=1000, alpha = 0.01, nro_middle=5}) {
        this.alpha = alpha;
        this.data = data;
        this.epochs = epochs;
        this.nro_middle = nro_middle;
        
        this.tolerance = 1e-4;
        this.biggerdw = 0;
        this.oldW = [];
        this.oldV = [];

        this.error = 0;
        this.epochError = 0;

        // Passo 0 - peso camada escondida e ultima camada
        this.v = this.randomUniform(this.data.nro_in*this.nro_middle + this.nro_middle);
        this.w = this.randomUniform(this.nro_middle*this.data.nro_out + this.data.nro_out);
        
        this.dw = 0;
        this.dw_b = 0;

        this.dv = 0;
        this.dv_b = 0;

        // saida - camada escondida
        this.zin_ = this.zeros(this.nro_middle); 
        this.z = this.zeros(this.nro_middle);

        // saida - ultima camada
        this.yin_ = this.zeros(this.data.nro_out);
        this.y = this.zeros(this.data.nro_out);
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
            const nro = Math.random()-0.5; // [-0.5,0.5)
            randomList.push(nro);
        }
        return randomList;
    }

    calculateOut(x, w, y, yin_) {
        for(let j=0; j<y.length; j++) { // colunm
            let c = w[x.length*y.length+j];
            for(let i=0; i<x.length; i++) { // line a1xnro_in
                c += x[i]*w[i*y.length+j];
            } 
            yin_[j] = this.activationF_(c);
            y[j] = this.activationF(c); 
        }  
    }

   
    activationF(x) {
        return 2/(1+Math.exp(-x)) - 1  // Bipolar sigmoid
        // return 1/(1+Math.exp(-x)) // Binary sigmoid
        // return x
    }
    activationF_(x) { // derivada
        let fx = this.activationF(x);
        return 0.5*(1+fx)*(1-fx)  // Bipolar sigmoid
        // return fx*(1-fx) // Binary sigmoid
        // return x
    }

    updateWeights() {
        this.error = 0;
        let errYTarget, deltaK, deltainJ = 0, deltaJ;
        
        for(let j=0; j<this.data.nro_out; j++) {
            errYTarget = this.data.t[j]-this.y[j];
            deltaK = errYTarget*this.yin_[j];
            
            for(let i=0; i<this.nro_middle; i++) {
                deltainJ += deltaK*this.w[i*this.data.nro_out+j];
                // Passo 6
                this.dw = this.alpha*deltaK*this.z[i]; 
                // Passo 8
                this.w[i*this.data.nro_out+j] += this.dw;              
            }
            this.dw_b = this.alpha*deltaK;
            this.w[this.nro_middle*this.data.nro_out+j] += this.dw_b; 
            this.error += errYTarget*errYTarget;
        }
        this.error /= (2*this.data.nro_out)

        for(let j=0; j<this.nro_middle; j++) {
            deltaJ = deltainJ*this.zin_[j];
            for(let i=0; i<this.data.nro_in; i++) {
                // Passo 7
                this.dv = this.alpha*deltaJ*this.data.x[i]; 
                // Passo 8
                this.v[i*this.nro_middle+j] += this.dv;               
            }
            this.dv_b = this.alpha*deltaJ;
            this.v[this.data.nro_in*this.nro_middle+j] += this.dv_b;
        }
    }

    validate() {
        for(let i in this.w){ // w é matrix represeentada como vetor
            this.dw = this.oldW[i] - this.w[i];
            this.dw = (this.dw > 0) ? this.dw : -this.dw;
            if(this.biggerdw<this.dw){
                this.biggerdw = this.dw;
            }
        }
        for(let i in this.v){ // w é matrix represeentada como vetor
            this.dv = this.oldV[i] - this.v[i];
            this.dv = (this.dv > 0) ? this.dv : -this.dv;
            if(this.biggerdw<this.dv){
                this.biggerdw = this.dv;
            }
        }
    }

    feedForward({x=this.data.x}){
        this.calculateOut(x, this.v, this.z, this.zin_); // Passo 4
        this.calculateOut(this.z, this.w, this.y, this.yin_); // Passo 5
    }

    backForward(){
        // Passo 6
        this.updateWeights(); 
    }

    train(){
        this.biggerdw = 0;
        this.oldW = this.w.slice(0);
        this.oldV = this.v.slice(0);
        this.epochError = 0;

        // Passo 3
        while(this.data.case<this.data.nro_cases) {            
            this.feedForward({});
            this.backForward();
            
            this.epochError += this.error;
            this.data.case++;
        }
        this.data.case = 0;
        this.validate();
        this.epochError /= this.data.nro_cases;
        
        return this.biggerdw >= this.tolerance;
    }

    predict(x){
        x = Array.isArray(x) ? x : [x];
        this.feedForward({x:x})
        return this.y;
    }
}

// inicio

function multiLayerPerceptron(epochs=1000, alpha=0.1, nro_middle=4){
    const data = new DataSet({data: x, nro_in: 1,
                            target: y, nro_out: 1});

    let mlp = new MLP({data, epochs, alpha, nro_middle});
    let epoch = 1;
    let continueCondition = true;

    let dotsError = [], dotsWinRate = [], dotsTarget = [], dotsY = [], maior = 0, menor = 100;

    // Passo 1
    while ((epoch <= mlp.epochs) && continueCondition) {
        continueCondition = mlp.train();
        dotsError.push({x:epoch, y:mlp.epochError})
        dotsWinRate.push({x:epoch, y:mlp.epochError})
        epoch++;
    }

    for(let i in data.target) {
        prediction = mlp.predict(data.data[i])[0]
        dotsTarget.push({x:data.data[i],y:data.target[i]});       
        erro = data.target[i]-prediction;
        erro = erro < 0 ? -erro : erro;
        if(maior < erro){
            maior = erro;
        }
        if(menor > erro){
            menor = erro;
        }
    }

    let division=5, step = data.data[data.nro_cases-1]/((data.nro_cases-1)*division), maxX = data.data[data.nro_cases-1];
    for(let xdot=0; xdot<=maxX; xdot+=step) {
        xdot = parseFloat(xdot.toFixed(2));
        prediction = mlp.predict(xdot)[0]
        dotsY.push({x:xdot,y:prediction});
    }

    showInfo({epoch, mlp, menor, maior, dots:dotsError, dots3:dotsTarget, dots4:dotsY})
}
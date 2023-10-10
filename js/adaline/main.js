class DataSet {
    constructor(data, nro_in, nro_cases, 
                target, nro_out) {
        this.data = data;
        this.nro_in = nro_in;
        this.nro_cases = nro_cases;

        this.target = target;
        this.nro_out = nro_out;

        // auxiliar
        this.case = 0;
    }

    // Getter
    get x() {
        return this.data.slice(this.case*this.nro_in, this.case*this.nro_in+this.nro_in);
    }

    // Method
    // colect_x(case) {
    //     return this.data.slice(case*nro_cases,case*(nro_cases+1)-1)
    // }
}

class Adaline {
    constructor(data, epochs, alpha = 0.1, theta = 0) {
        this.alpha = alpha;
        this.theta = theta;
        this.data = data;
        this.epochs = epochs;
        this.error = 0;
        this.biggerw = 0;

        this.w = this.randomUniform(this.data.nro_in*this.data.nro_out)
        this.b = this.randomUniform(this.data.nro_out)
    }

    randomUniform(n) {
        const randomList = [];

        for (let i = 0; i < n; i++) {
            const nro = Math.random()-0.5; // Gera um número entre 0 (inclusive) e 1 (exclusive)
            randomList.push(nro);
        }
        return randomList;
    }

    calculateY() {
        console.log(`x = ${this.data.x[0]} ${this.data.x[1]}`)
    }

    train(){
        while(this.data.case<this.data.nro_cases) {
            this.calculateY()
            this.data.case++
        }
        this.data.case = 0
        return false
    }
}

// inicio

data = new DataSet(data = [-1, -1,
                           -1, 1,
                            1, -1,
                            1, 1],
                 nro_in = 2,
                 nro_cases = 4,
                 target = [-1, -1,
                            1, 1,
                            1, 1,
                            1, 1],
                 nro_out = 2)

adaline = new Adaline(data, 1)

epoch = 0
continuar = true

while (continuar && (epoch < adaline.epochs)) {
    console.log(`Epoch: ${epoch}`)
    continuar = adaline.train()
    epoch++
}
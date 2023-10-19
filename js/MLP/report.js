function showInfo({epoch, mlp, menor, maior, dots, dots3, dots4}) {
    log(logContainer, `Aproximação obtida usando mlp:<br><br>`)
    log(logContainer, `Duração em épocas: ${epoch-1}`)
    log(logContainer, `Erro quadrático médio final: ${mlp.epochError}`)
    log(logContainer, `Mínimo desvio: ${menor}`)
    log(logContainer, `Máximo desvio: ${maior}<br><br><br>`)

    drawChart(canvasError, 'Erro quadrático médio', dots, epoch-1);
    drawApprox(canvasApprox, 'Amostras', dots3, 'Aproximação', dots4);

    if(mlp.nro_middle<8){
        eq = `\\[` + layerEq('x',mlp.v,'z', mlp.data.nro_in, mlp.nro_middle, 2) + `\\]<br>`;
        eq += `\\[` +layerEq('z',mlp.w,'y', mlp.nro_middle, mlp.data.nro_out,2)             
        eq += `\\approx \\begin{bmatrix}`

        for (let i=1;i<mlp.data.nro_out;i++){
            eq += `t_{1${i}} & `
        }
        eq += `t_{1${mlp.data.nro_in}} \\end{bmatrix} \\]`
        log(logContainer, eq);
    }
}

function layerEq(x,w,y, rows, columns, decimalShow){
    let eq = `\\begin{bmatrix}`

    for (let i=1;i<rows;i++){
        eq += `${x}_{1${i}} & `
    }

    eq += `${x}_{1${rows}}
        \\end{bmatrix}
        \\cdot`

    eq += `\\begin{bmatrix}`
    for (let i=0; i<rows; i++){
        for (let j=0; j<columns-1; j++){
            eq += `${w[i*columns+j].toFixed(decimalShow)} & `
        }
        eq += `${w[i*columns+columns-1].toFixed(decimalShow)} \\\\`
    }

    eq += `\\end{bmatrix}
    +`
    eq += `\\begin{bmatrix}`

    for (let i=0;i<columns-1;i++){
        eq += `${w[rows*columns+i].toFixed(decimalShow)} & `
    }

    eq += `${w[rows*columns+columns-1].toFixed(decimalShow)}
        \\end{bmatrix}
        =`

    eq += `\\begin{bmatrix}`

    for (let i=1;i<columns;i++){
        eq += `${y}_{1${i}} & `
    }

    eq += `${y}_{1${columns}}
        \\end{bmatrix}_{in}`

    eq += `\\rightarrow ${y}=f(${y}_{in})`

    return eq;
}

// message = `\\[
//     \\begin{bmatrix}
//     x_{11} & x_{12} & \\ldots & x_{1n} 
//     \\end{bmatrix}
//     \\cdot
//     \\begin{bmatrix}
//     w_{11} & w_{12} & \\ldots & w_{1p} \\\\
//     w_{21} & w_{22} & \\ldots & w_{2p} \\\\
//     \\vdots & \\vdots & \\ddots & \\vdots \\\\
//     w_{n1} & w_{n2} & \\ldots & w_{np}
//     \\end{bmatrix}
//     +
//     \\begin{bmatrix}
//     b_{11} & b_{12} & \\ldots & b_{1p} 
//     \\end{bmatrix}
//     =
//     \\begin{bmatrix}
//     y_{11} & y_{12} & \\ldots & y_{1p} 
//     \\end{bmatrix}
//     \\]`

( //funcaoanonima https://ricardo-reis.medium.com/fun%C3%A7%C3%B5es-an%C3%B4nimas-javascript-92361075fd89#:~:text=Introdu%C3%A7%C3%A3o,%C3%A9%20uma%20fun%C3%A7%C3%A3o%20sem%20nome.&text=Neste%20exemplo%2C%20a%20fun%C3%A7%C3%A3o%20an%C3%B4nima,nesse%20caso%20%C3%A0%20vari%C3%A1vel%20show%20.
    
    () => {
        const tabuleiroDOM = document.querySelector("#tabuleiro")
        var tabuleiro = []
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                let quadrado = document.createElement('div');
                quadrado.setAttribute("id", 'i'+i+'j'+j);
                quadrado.setAttribute("class", "quadrado");
                tabuleiroDOM.appendChild(quadrado);
                if(!((i+j)%2)){
                    quadrado.style.backgroundColor = "white"
                    quadrado.style.color = "black"
                } else {
                    quadrado.style.backgroundColor = "black"
                    quadrado.style.color = "white"
                }
                quadrado.innerHTML = ['i'+i+'j'+j]
            }
        }
    }
)()
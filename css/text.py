import re

# body {{
#   margin:0;
# }}

text = f"""
html, body {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #c6c5c1; 
}}

/*
header{{
    background-color: #ffff00;
    height:50vh; Viewport Height 
}}

.container {{
    display: grid;
}} */

/* calcifer */


#calcifer-block {{
    height: 40vw;
    width: 40vw;
    background-color: yellow;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-wrap: wrap;
    margin:auto;
}}

div, div:after, div:before {{
  position:absolute;
  content:"";
}}

.wrap {{
  width:100%;
  height:100%;  
  background: radial-gradient(circle, #691d05, #040202);
}}

.calcifer {{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  height:$size*2;
  width:$size*1.6;
  margin:auto;
  //border:1px solid grey;
}}

.log {{
  width:$size*3;
  height:$size*0.6;
  background:#7e1c05;
  background:radial-gradient(ellipse at top, #f9b413 0%, #8a1b06 40%, #1b0c08 90%);
  top:$size*1.8;
  left:$size*-0.7;
  overflow:hidden;
}}

.lines {{
  width:$size*4;
  height:$size*0.3;
  border:$size*0.01 solid #1b0c08;
  left:$size*-0.5;
  top:$size*0.1;
}}
.lines:after{{
  width:$size*4;
  height:$size*0.2;
  border:$size*0.01 solid #1b0c08;
  left:$size*-0.5;
  top:$size*0.19;
}}
.lines:before{{
  width:$size*4;
  height:$size*0.2;
  border:$size*0.01 solid #1b0c08;
  left:$size*-0.5;
  top:$size*0.05;
}}

.crack-l {{
  width:0;
  height:0;
  border-left:$size*1.6 solid #1b0c08;
  border-top:$size*0.05 solid transparent;
  top:$size*0.2;
}}

.crack-l:after{{
  width:0;
  height:0;
  border-left:$size*1.6 solid #8a1b06;
  border-bottom:$size*0.05 solid transparent;
  top:0px;  
  left:$size*-1.6;
  opacity:0.4;
}}

.crack-r {{
  width:0;
  height:0;
  border-right:$size*1.6 solid #1b0c08;
  border-top:$size*0.05 solid transparent;
  top:$size*0.4;
  right:0;
}}

.crack-r:after{{
  width:0;
  height:0;
  border-right:$size*1.6 solid #8a1b06;
  border-bottom:$size*0.05 solid transparent;
  opacity:0.4;
}}

.rear {{
  width:$size*1.6;
  height:$size*1.7;
  top:$size*0.3;
  background:#f00;
  border-radius:50% 50% 40% 40%;
}}

.flames-round {{
  width:$size*0.6;
  height:$size*0.6;
  border-radius:50%;
  background:#f20;
  left:$size*0.2;
  top:$size*-0.3;
  box-shadow: $size*-0.25 $size*1.3 0 0 #fc860a,
              $size*-0.3 $size*0.8 0 0 #fe4202,
              $size*0.85 $size*0.4 0 0 #fe2001,
              $size*0.9 $size*1.2 0 0 #fd7206,
              $size*0.5 $size*-0.2 0 0 #fe1001;
}}
.flames-small {{
  width:$size*0.3;
  height:$size*0.3;
  border-radius:50%;
  background:#f20;
  top:$size*0.1;
  box-shadow: $size*0.7 $size*0.2 0 0 #ff2400,
              $size*0.5 $size*0.5 0 0 #fe4202,
              $size*1.35 $size*0.4 0 0 #fe2001,
              $size $size*-0.15 0 0 #fe2001,
              $size*-0.1 $size*0.8 0 0 #fd6704,
              $size*0.55 $size*-0.75 0 0 #fe1001;
}}
.flames-tiny {{
  width:$size*0.1;
  height:$size*0.1;
  border-radius:50%;
  background:#f20;
  top:$size*-0.1;
  left:$size*0.05;
  box-shadow: $size*-0.05 $size*0.5 0 0 #ff2400,
              $size*0.65 $size*0.4 0 0 #fe4202,
              $size*1.2 0 0 0 #fe2001,
              $size*-0.1 $size*0.8 0 0 #fd6704,
              $size*0.6 $size*-0.75 0 0 #fe1001,
              $size*0.8 $size*-0.5 0 0 #fe0000,
              $size*1.55 $size*0.9 0 0 #ff2400,
              $size*0.4 $size*0.1 0 0 #fe4202;
}}

.front {{
  width:$size*1.6;
  height:$size*1.7;
  background:#f00;
  background:radial-gradient(circle at bottom, #f7d91b 0%,#fe5f02 50%,transparent 80%);
  border-radius:50% 50% 40% 40%;
  top:$size*0.3;
  
}}

.eyes {{
  width:$size*0.3;
  height:$size*0.3;
  background:#fee69f;
  border-radius:50%;
  top:$size*1.3;
  left:$size*0.25;
  box-shadow:$size*0.8 0 0 0 #fee68f;
}}
.eyes:after {{
  width:$size*0.05;
  height:$size*0.05;
  background:#56210f;
  border-radius:50%;
  top:$size*0.07;
  left:$size*0.15;
  box-shadow:$size*0.75 0 0 0 #56210f;  
}}

.mouth {{
  width:$size*0.37;
  height:$size*0.09;
  background:#ff2400;
  border-radius:50% 50% 20% 20%;
  top:$size*1.6;
  left:$size*0.62; 
  opacity:0.4;
}}

.left-arm {{
  width:$size*0.2;
  height:$size*0.5;
  background:#fc860a;
  border-radius:50% 0% 50% 50%;
  top:$size*1.55;
  left:$size*0.15;  
  transform:rotate(-80deg);
}}
.right-arm {{
  width:$size*0.2;
  height:$size*0.5;
  background:#fd7026;
  border-radius:0% 50% 50% 50%;
  top:$size*1.6;
  left: $size*1.2;  
  transform:rotate(60deg);
}}



.ccc, .ccc a {{
  bottom:0px;
  right:0px;
  font-family:Tahoma;
  font-size:10pt;
  padding:5px;
  background:#eb5252;
  border-radius:5px 0 0 0;
  color:white;
}}
"""

import re
def processar_linha(linha):
    size = 25
    if "//" in linha:
        return ""
    
    padrao = r'\$size'

    while True:
        m = re.search(padrao, linha)
        if m:
            iend = m.end() - 1  # Subtrai 1 para incluir o caractere 'e'
            i = iend + 1
            if linha[i]=="*":
                i+=1
                if linha[i+1]!=";":
                    if linha[i]=="-":
                        i+=1
                        value = -1
                    else:
                        value = 1

                    if linha[i+3].isdigit():
                        tam = 4
                    else:
                        tam = 3

                    mult = linha[i:i+tam]
                    value *= float(mult)
                else:
                    value = int(linha[i])
                    tam = 1
            elif linha[i]==" ":
                tam = 0
                value = 1
            
            # if linha.strip().startswith("width") or linha.strip().startswith("height"):
            #     linha = linha[:iend-4]+f"{round(value*100,2)}%" + linha[i+tam:]
            # else:
            linha = linha[:iend-4]+f"{value*size}px" + linha[i+tam:]
        else:
            break
    return linha


exemplo = f"""
  width:$size*4;
  height:$size*0.3;
  border:$size*0.01 solid #1b0c08;
  left:$size*-0.5;
  top:$size*0.1;
"""
linhas = text.splitlines()

for i in range(len(linhas)):    
    try:
        # print(linhas[i])
        linhas[i] = processar_linha(linhas[i])
        # print(linhas[i]+"\n")
    except Exception as e:
        print(f"Erro na linha {i}: {linhas[i]}\t", e)

textoMod = '\n'.join(linhas)
with open("output.md","w") as f:
    f.write(textoMod)


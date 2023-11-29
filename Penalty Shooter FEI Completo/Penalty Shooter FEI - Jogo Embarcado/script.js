let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let cwidth = canvas.width;
let pcx, ballx, bally, ballmidx, ballmidy;
let background, ball_image;
let goleiro_parado, goleiro_movimento;
let sorte, golsatual;
let x_mouse, y_mouse;
let cursor, cursorx, cursory;
let goleirox = cwidth / 2 - 100 / 2;
let goleiroy = 93;
let caminhogoleirox = cwidth / 2 - 100 / 2;
let caminhogoleiroy = 93;
let pcy = 400;
let percent = 0;
let ballwh = 85;
let cooldown = false;
let gols = 0;
let golvisivel = 0;
let defesavisivel = 0;
let foravisivel = 0;
let erro = 0;
let recorde = 0;
let textogol = new Image();
textogol.src = 'Images/gol.png';
let textodefesa = new Image();
textodefesa.src = 'Images/defesa.png';
let textofora = new Image();
textofora.src = 'Images/fora.png';
let x_vermelho = new Image();
x_vermelho.src = 'Images/x_vermelho.png';
let x_transparente = new Image();
x_transparente.src = 'Images/x_transparente1.png';
let ball_kick1 = new Audio('Sounds/ball_kick.mp3');
canvas.addEventListener("click", function(event) {
    if (cooldown) return;
    cooldown = true;
    setTimeout(() => { cooldown = false; }, 4000);
    x_mouse = event.offsetX;
    y_mouse = event.offsetY;
    percent = 0;
    if (x_mouse >= 738) {
        pcx = 950;
    }
    else if (x_mouse <= 358) {
        pcx = 150;
    }
    else if (x_mouse > 358 && x_mouse <= 445) {
        pcx = 300;
    }
    else if (x_mouse >= 645 && x_mouse < 738)
        pcx = 800;
    else if (x_mouse > 445 && x_mouse < 645) {
        pcx = 550;
    }
    if (x_mouse <= 550) {
        sorte = getRandomInt(1, 11);
        if (sorte === 1) {
            goleirox = getRandomInt(550, 834);
        }
        else if (sorte >= 6) {
            goleirox = getRandomInt(161, 360);
        }
        else {
            goleirox = getRandomInt(161, 550);
        }
    }
    else if (x_mouse > 550) {
        sorte = getRandomInt(1, 11);
        if (sorte === 1) {
            goleirox = getRandomInt(161, 550);
        }
        else if (sorte >= 6) {
            goleirox = getRandomInt(740, 834);
        }
        else {
            goleirox = getRandomInt(550, 740);
        }
    }
    goleiroy = getRandomInt(76, 93);
    ball_kick1.play();
    setTimeout(contagol, 2200);
    setTimeout(reset, 3800);
    console.log("Click XY: " + x_mouse, y_mouse);
    console.log("Goleiro XY: " + goleirox, goleiroy);
});
function reset() {
    pcx = undefined;
    ballwh = 85;
    goleirox = cwidth / 2 - 100 / 2;
    goleiroy = 93;
    caminhogoleirox = cwidth / 2 - 100 / 2;
    caminhogoleiroy = 93;
    golvisivel = 0;
    foravisivel = 0;
    defesavisivel = 0;
    if (erro >= 3) {
        fimDeJogo();
        erro = 0
    }
}
function tipocursor() {
    if (document.getElementById("bola").value === "bola1") {
        cursor = new Image();
        cursor.src = 'Images/cursorball.png';
    } else if (document.getElementById("bola").value === "bola2") {
        cursor = new Image();
        cursor.src = 'Images/cursorball2.png';
    } else if (document.getElementById("bola").value === "bola3") {
        cursor = new Image();
        cursor.src = 'Images/cursorball3.png';
    }
}
function cursorbola() {
    if (cursorx === undefined && cursory === undefined) {
        document.querySelector('canvas').style.cursor = "auto";
    }
    else {
        document.querySelector('canvas').style.cursor = "none";
    }
    canvas.addEventListener("mousemove", function(event) {
        cursorx = event.offsetX;
        cursory = event.offsetY;
    });
    if (pcx === undefined) {
        ctx.drawImage(cursor, cursorx - 26, cursory - 26, 52, 52);
    }
}
function campo() {
    if (document.getElementById("campo").value === "campo1") {
        background = new Image();
        background.src = 'Images/background.png';
    } else if (document.getElementById("campo").value === "campo2") {
        background = new Image();
        background.src = 'Images/background2.png';
    } else if (document.getElementById("campo").value === "campo3") {
        background = new Image();
        background.src = 'Images/background3.png';
    }
}
function tipobola() {
    if (document.getElementById("bola").value === "bola1") {
        ball_image = new Image();
        ball_image.src = 'Images/ball.png';
    } else if (document.getElementById("bola").value === "bola2") {
        ball_image = new Image();
        ball_image.src = 'Images/ball2.png';
    } else if (document.getElementById("bola").value === "bola3") {
        ball_image = new Image();
        ball_image.src = 'Images/ball3.png';
    }
}
function selecionargoleiro() {
    if (document.getElementById("goleiro").value === "goleiro1") {
        goleiro_parado = new Image();
        goleiro_parado.src = 'Images/gp_padrao.png';
        goleiro_movimento = new Image();
        goleiro_movimento.src = 'Images/gm_padrao.png';
    } else if (document.getElementById("goleiro").value === "goleiro2") {
        goleiro_parado = new Image();
        goleiro_parado.src = 'Images/gp_isaac.png';
        goleiro_movimento = new Image();
        goleiro_movimento.src = 'Images/gm_isaac.png';
    } else if (document.getElementById("goleiro").value === "goleiro3") {
        goleiro_parado = new Image();
        goleiro_parado.src = 'Images/gp_fagner.png';
        goleiro_movimento = new Image();
        goleiro_movimento.src = 'Images/gm_fagner.png';
    }
}
function curvaXY(startPt,controlPt,endPt,percent) {
    let x = Math.round(Math.pow(1-percent,2) * startPt.x + 2 * (1-percent) * percent * controlPt.x + Math.pow(percent,2) * endPt.x);
    let y = Math.round(Math.pow(1-percent,2) * startPt.y + 2 * (1-percent) * percent * controlPt.y + Math.pow(percent,2) * endPt.y);
    return( {x:x,y:y} );
}
function diminuir() {
    if (ballwh >= 52) {
        ballwh -= 0.4125;
    }
}
function contagol() {
    if (ballmidx + 15 > goleirox && ballmidx - 15 < goleirox + 100 && ballmidy + 15 > goleiroy && ballmidy - 15 < goleiroy + 40) {
        console.log("Defesa! Total de gols: " + gols);
        defesavisivel = 1;
        erro += 1;
    }
    else if (ballmidx + 15 > goleirox + 15 && ballmidx - 15 < goleirox + 85 && ballmidy + 15 > goleiroy + 41 && ballmidy - 15 < goleiroy + 70) {
        console.log("Defesa! Total de gols: " + gols);
        defesavisivel = 1;
        erro += 1;
    }
    else if (ballmidx + 15 > goleirox + 30 && ballmidx - 15 < goleirox + 70 && ballmidy + 15 > goleiroy + 71 && ballmidy - 15 < goleiroy + 131) {
        console.log("Defesa! Total de gols: " + gols);
        defesavisivel = 1;
        erro += 1;
    }
    else if (ballmidx + 15 > goleirox + 25 && ballmidx - 15 < goleirox + 75 && ballmidy + 15 > goleiroy + 132 && ballmidy - 15 < goleiroy + 192) {
        console.log("Defesa! Total de gols: " + gols);
        defesavisivel = 1;
        erro += 1;
    }
    else if (ballmidx + 15 > goleirox + 15 && ballmidx - 15 < goleirox + 85 && ballmidy + 15 > goleiroy + 193 && ballmidy - 15 < goleiroy + 262) {
        console.log("Defesa! Total de gols: " + gols);
        defesavisivel = 1;
        erro += 1;
    }
    else if (ballmidx > 161 && ballmidx < 933 && ballmidy > 68 && ballmidy < 345) {
        gols += 1
        console.log("Gol! Total de gols: " + gols)
        golvisivel = 1;
    }
    else {
        console.log("Errou! Total de gols: " + gols);
        foravisivel = 1;
        erro += 1;
    }
    console.log("Erros =", erro)
}
function avisogol() {
    if (golvisivel === 1) {
        ctx.drawImage(textogol, 297.5, 185, 505, 230);
    }
}
function avisodefesa() {
    if (defesavisivel === 1) {
        ctx.drawImage(textodefesa, 81, 185, 938, 230);
    }
}
function avisofora() {
    if (foravisivel === 1) {
        ctx.drawImage(textofora, 209, 185, 682, 230);
    }
}
function marcador() {
    ctx.beginPath();
    ctx.font = "bold 40px myFont";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillStyle = "white";
    ctx.fillText("Gols Marcados: " + gols, 30, 580);
    ctx.strokeText("Gols Marcados: " + gols, 30, 580);
    ctx.closePath();
}
function erros() {
    ctx.drawImage(x_transparente, 890, 530, 50, 50);
    ctx.drawImage(x_transparente, 950, 530, 50, 50);
    ctx.drawImage(x_transparente, 1010, 530, 50, 50);
    if (erro === 1) {
        ctx.drawImage(x_vermelho, 890, 530, 50, 50);
    }
    else if (erro === 2) {
        ctx.drawImage(x_vermelho, 890, 530, 50, 50);
        ctx.drawImage(x_vermelho, 950, 530, 50, 50);
    }
    else if (erro >= 3) {
        ctx.drawImage(x_vermelho, 890, 530, 50, 50);
        ctx.drawImage(x_vermelho, 950, 530, 50, 50);
        ctx.drawImage(x_vermelho, 1010, 530, 50, 50);
    }
}
function start() {
    let obj = document.getElementById("myCanvas");
    let obj2 = document.getElementById("menu");
    if (obj2.style.display === "none") {
        obj2.style.display = "block";
    }
    else {
        obj2.style.display = "none";
    }
    if (obj.style.display === "block") {
        obj.style.display = "none";
    }
    else {
        obj.style.display = "block";
    }
}
function fimDeJogo() {
    let obj3 = document.getElementById("fim");
    let obj4 = document.getElementById("myCanvas");
    if (obj4.style.display === "none") {
        obj4.style.display = "block";
    }
    else {
        obj4.style.display = "none";
    }
    if (obj3.style.display === "flex") {
        obj3.style.display = "none";
    }
    else {
        obj3.style.display = "flex";
    }
    golsatual = gols;
    if (golsatual > recorde) {
        recorde = golsatual;
    }
    document.getElementById("golsatualP").innerText="Sua pontuação: " + golsatual;
    document.getElementById("recordeP").innerText="Seu recorde: " + recorde;
    gols = 0;
    cursorx = undefined;
    cursory = undefined;
}
function voltarMenu() {
    let obj6 = document.getElementById("menu");
    let obj5 = document.getElementById("fim");
    if (obj6.style.display === "none") {
        obj6.style.display = "flex";
    }
    else {
        obj6.style.display = "none";
    }
    if (obj5.style.display === "flex") {
        obj5.style.display = "none";
    }
    else {
        obj5.style.display = "flex";
    }
}
function jogarNovamente() {
    let obj8 = document.getElementById("myCanvas");
    let obj7 = document.getElementById("fim");
    if (obj7.style.display === "none") {
        obj7.style.display = "flex";
    }
    else {
        obj7.style.display = "none";
    }
    if (obj8.style.display === "block") {
        obj8.style.display = "none";
    }
    else {
        obj8.style.display = "block";
    }
}
function comojogar() {
    let obj9 = document.getElementById("comojogartexto");
    if (obj9.style.display === "block") {
        obj9.style.display = "none";
    }
    else {
        obj9.style.display = "block";
    }
}
function fecharcomojogar() {
    let obj10 = document.getElementById("comojogartexto");
    if (obj10.style.display === "block") {
        obj10.style.display = "none";
    }
    else {
        obj10.style.display = "block";
    }
}
function caminho() {
    if (percent < 1) {
        percent += 0.0125
    }
    let xy = curvaXY({x: 550, y: 527.5}, {x: pcx, y: pcy}, {x: x_mouse, y: y_mouse}, percent);
    if (pcx === undefined) {
        ballx = 507.5;
        bally = 485;
    }
    else {
        ballx = xy.x - ballwh/2;
        bally = xy.y - ballwh/2;
        ballmidx = xy.x;
        ballmidy = xy.y;
        diminuir();
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function caminhogoleiro() {
    if (goleirox > 550) {
        if (caminhogoleirox < goleirox) {
            caminhogoleirox += 5;
        }
        else if (caminhogoleirox > goleirox) {
            caminhogoleirox = goleirox;
        }
    }
    else if (goleirox <= 550) {
        if (caminhogoleirox > goleirox) {
            caminhogoleirox -= 5;
        }
        else if (caminhogoleirox < goleirox) {
            caminhogoleirox = goleirox;
        }
    }
    if (caminhogoleiroy > goleiroy && caminhogoleirox === goleirox) {
        caminhogoleiroy -= 1
    }
}
function goleiro() {
    if (pcx === undefined) {
        ctx.drawImage(goleiro_parado, cwidth / 2 - 175 / 2, 355 - 245, 175, 245);
    }
    else {
        caminhogoleiro();
        ctx.drawImage(goleiro_movimento, caminhogoleirox, caminhogoleiroy, 100, 262);
    }
}
function bola() {
    selecionargoleiro();
    tipobola();
    tipocursor();
    campo();
    ctx.clearRect(0, 0,1100, 600);
    ctx.drawImage(background, 0, 0, 1100, 600);
    caminho();
    goleiro();
    cursorbola();
    ctx.drawImage(ball_image, ballx, bally, ballwh, ballwh);
    marcador();
    avisogol();
    avisodefesa();
    avisofora();
    erros();
    requestAnimationFrame(bola);
}
bola();
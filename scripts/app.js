// This file contains the JavaScript code that implements the drag-and-drop functionality for the game.

const images = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');

images.forEach(image => {
    image.addEventListener('dragstart', dragStart);
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);

});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    if(txt_status.value == "FINALIZADO") {
        alerta("Jogo já finalizado, clique em reiniciar!", "blue");
        return;
    }
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    const dropzone = e.target;
    console.log(`Dropped ${draggableElement.id} into ${dropzone.id}`);
    origem = draggableElement.id;
    destino = dropzone.id;
    if (origem.slice(3,5)!=destino) {
        //alert('Errado! Tente novamente.');
        erro();
    } else {
        //alert('Correto! Você acertou!');
        acerto();
        dropzone.appendChild(draggableElement);
    }
    mensagem_final();
}
function mensagem_final()
{
    const acertos = document.getElementById("txt_acertos");
    const erros = document.getElementById("txt_erros");
    if (parseInt(acertos.value) == 10) {
        alerta("PARABÉNS VOCÊ ACERTOU TODAS AS OPÇÕES!!!", "blue");
        const status = document.getElementById("txt_status");
        status.value = "FINALIZADO";
    } else if (parseInt(erros.value) == 0) {
        alerta("QUE PENA, VOCÊ EXCEDEU 3 ERROS, PARA TENTAR NOVAMENTE CLIQUE EM REINICIAR ", "blue");
        const status = document.getElementById("txt_status");
        status.value = "FINALIZADO";
        reiniciar();
       
    }
}
function acerto()
{
    const acertos = document.getElementById("txt_acertos");
    acertos.value = parseInt(acertos.value) + 1;
    alerta("Você acertou, parabéns", "green");
}
function erro()
{
    const erros = document.getElementById("txt_erros");
    erros.value = parseInt(erros.value) - 1;
    alerta("Você Errou, tente novamente!", "red");
}
function reiniciar()
{
    document.refresh();
}
function alerta(texto, cor, tamanho="20px")
{
    const alerta = document.getElementById("alerta");
    alerta.innerHTML = texto;
    alerta.style=`color: ${cor}`;
    alerta.style.fontSize = tamanho;
}

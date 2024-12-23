let globalObjects;

function playOnClick() {
    // Verifica se a roleta foi liberada
    const isAuthorized = localStorage.getItem("roletaLiberada") === "true";

    if (!isAuthorized) {
        alert("A roleta ainda não foi liberada. Aguarde autorização.");
        return;
    }

    // Marca a roleta como usada
    localStorage.setItem("roletaLiberada", "false");

    globalObjects = {
        btnPlay: document.getElementById("btnPlay"),
        roleta: document.getElementById("roleta"),
        btnStop: document.getElementById("btnStop"),
    };

    globalObjects.btnPlay.style.visibility = "hidden";
    globalObjects.btnStop.style.visibility = "visible";

    // Rotação aleatória
    const randomRotation = Math.floor(Math.random() * 3600) + 360; // Entre 360 e 3960 graus
    globalObjects.roleta.style.transition = "transform 4s ease-out"; // Transição suave
    globalObjects.roleta.style.transform = `rotate(${randomRotation}deg)`; // Aplica a rotação
}

function stopOnClick() {
    globalObjects.btnStop.style.visibility = "hidden";

    // Extrair o valor da rotação final da roleta
    const transformValue = globalObjects.roleta.style.transform;
    const rotationDegrees = parseInt(transformValue.replace(/[^0-9]/g, '')) % 360;

    // Calcular qual seção foi selecionada
    const sections = 8; // Número de seções
    const sectionDegree = 360 / sections;
    const winningSection = Math.floor(rotationDegrees / sectionDegree);

    const boxGanhador = document.getElementById("opt".concat(winningSection));
    document.getElementById("msgGanhador").innerHTML =
        "Parabéns! Você ganhou ".concat(boxGanhador.innerHTML);

    // Mostrar o botão de play novamente
    globalObjects.btnPlay.style.visibility = "visible";
}

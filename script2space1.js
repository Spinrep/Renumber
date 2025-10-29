const Planetas = {
    tierra: {
        tamano: 1,
        distancia: 400
    },
    mercurio: {
        tamano: 0.38,
        distancia: 57900000
    },
    venus: {
        tamano: 0.95,
        distancia: 108200000
    },
    marte: {
        tamano: 0.53,
        distancia: 78300000
    },
    jupiter: {
        tamano: 11.21,
        distancia: 628700000
    },
    saturno: {
        tamano: 9.46,
        distancia: 1275000000
    },
    urano: {
        tamano: 3.98,
        distancia: 2725000000
    },
    neptuno: {
        tamano: 3.86,
        distancia: 4351000000
    }
};
document.getElementById('comparePlanetsBtn').addEventListener('click', () => {
    const p1 = document.getElementById('planet1').value.toLowerCase();
    const p2 = document.getElementById('planet2').value.toLowerCase();

    if (p1 === p2) {
        alert("Por favor selecciona dos planetas diferentes.");
        return;
    }

    // Oculta el menú, muestra resultado
    document.getElementById('menu-comparador').style.display = 'none';
    document.getElementById('resultado-comparacion').style.display = 'block';

    // Crea los círculos según la proporción
    const container = document.getElementById('circulos-container');
    container.innerHTML = ''; // limpia contenido previo

    const tam1 = Planetas[p1].tamano;
    const tam2 = Planetas[p2].tamano;

    // Escalamos para visualización (multiplicamos por 50 para que se noten los tamaños)
    const factor = 50;
    const radio1 = tam1 * factor;
    const radio2 = tam2 * factor;

    const circulo1 = document.createElement('div');
    circulo1.style.width = `${radio1}px`;
    circulo1.style.height = `${radio1}px`;
    circulo1.title = p1;
    circulo1.innerText = p1;
    circulo1.style.display = 'flex';
    circulo1.style.alignItems = 'center';
    circulo1.style.justifyContent = 'center';

    const circulo2 = document.createElement('div');
    circulo2.style.width = `${radio2}px`;
    circulo2.style.height = `${radio2}px`;
    circulo2.title = p2;
    circulo2.innerText = p2;
    circulo2.style.display = 'flex';
    circulo2.style.alignItems = 'center';
    circulo2.style.justifyContent = 'center';

    container.appendChild(circulo1);
    container.appendChild(circulo2);
});

// Botón de volver
document.getElementById('volverBtn').addEventListener('click', () => {
    document.getElementById('resultado-comparacion').style.display = 'none';
    document.getElementById('menu-comparador').style.display = 'flex';
});
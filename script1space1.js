 // Crear estrellas y meteoritos (código original sin modificar)
 function createStarsAndMeteors() {
    const space = document.getElementById('space');
    for (let i = 0; i < 400; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        space.appendChild(star);
    }
    setInterval(() => {
        for (let i = 0; i < 3; i++) {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.top = `${Math.random() * 50}vh`;
            meteor.style.left = `${Math.random() * 100}vw`;
            space.appendChild(meteor);
            setTimeout(() => meteor.remove(), 3000);
        }
    }, 1000);
}

// Funcionalidad del menú de planetas (código original sin modificar)
const planetButton = document.querySelector('.planet-button');
const planetOptions = document.querySelector('.planet-options');

planetButton.addEventListener('click', () => {
    planetOptions.style.display = planetOptions.style.display === 'block' ? 'none' : 'block';
});

// Información de planetas (código original sin modificar)
const planetOptionsList = document.querySelectorAll('.planet-option');
const infoBox = document.getElementById('info-box');
const infoName = document.getElementById('info-name');
const infoSize = document.getElementById('info-size');
const infoDistance = document.getElementById('info-distance');

planetOptionsList.forEach(planet => {
    planet.addEventListener('mouseenter', () => {
        infoName.textContent = planet.getAttribute('data-name');
        infoSize.textContent = planet.getAttribute('data-size');
        infoDistance.textContent = planet.getAttribute('data-distance');
        imagePreview.src = planet.getAttribute('data-img')
        infoBox.style.display = 'block';
    });

    planet.addEventListener('mouseleave', () => {
        infoBox.style.display = 'none';
    });
});

// NUEVA FUNCIONALIDAD PARA EL CONTROL DE VELOCIDAD
const speedButton = document.getElementById('speed-button');
const speedControl = document.getElementById('speed-control');
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
const riskIndicator = document.getElementById('risk-indicator');
const riskTitle = document.getElementById('risk-title');
const riskDescription = document.getElementById('risk-description');
const riskProbability = document.getElementById('risk-probability');

// Mostrar/ocultar control de velocidad
speedButton.addEventListener('click', () => {
    speedControl.style.display = speedControl.style.display === 'block' ? 'none' : 'block';
    // Cerrar otros menús
    shipOptions.style.display = 'none';
    planetOptions.style.display = 'none';
    planetSelectOptions.style.display = 'none';
});

// Actualizar velocidad y riesgo en tiempo real
speedSlider.addEventListener('input', (e) => {
    const speed = parseInt(e.target.value);
    speedValue.textContent = speed + '%';
    
    // Actualizar información de riesgo según el porcentaje
    updateRiskInfo(speed);
});

function updateRiskInfo(speed) {
    let riskLevel, riskIcon, riskName, description, probability, riskClass;
    
    if (speed >= 0 && speed <= 30) {
        // Riesgo Bajo: 0-30%
        riskLevel = 'low';
        riskIcon = '🟢';
        riskName = 'Riesgo Bajo';
        description = 'El motor opera a velocidad segura con todos los sistemas de protección activos.';
        probability = '1/1000';
        riskClass = 'risk-low';
    } else if (speed >= 31 && speed <= 60) {
        // Riesgo Medio: 31-60%
        riskLevel = 'medium';
        riskIcon = '🟡';
        riskName = 'Riesgo Medio';
        description = 'El motor opera a velocidad moderada con sistemas de seguridad activos.';
        probability = '1/200';
        riskClass = 'risk-medium';
    } else {
        // Riesgo Alto: 61-100%
        riskLevel = 'high';
        riskIcon = '🔴';
        riskName = 'Riesgo Alto';
        description = 'El motor opera al límite. Sistemas críticos bajo estrés extremo.';
        probability = '1/10';
        riskClass = 'risk-high';
    }
    
    // Actualizar elementos visuales
    riskTitle.innerHTML = `<span>${riskIcon}</span><span>${riskName}</span>`;
    riskDescription.textContent = description;
    riskProbability.textContent = `Probabilidad de fallo: ${probability}`;
    
    // Actualizar clase CSS para colores
    riskIndicator.className = `risk-indicator ${riskClass}`;
    
    // Actualizar texto del botón con el porcentaje actual
    speedButton.textContent = `Velocidad: ${speed}%`;
}

// Inicializar con valores por defecto
updateRiskInfo(50);

const shipButton = document.getElementById('ship-button');
const shipOptions = document.getElementById('ship-options');
const shipTooltip = document.getElementById('ship-tooltip');
const shipTooltipName = document.getElementById('ship-tooltip-name');
const shipTooltipSpeed = document.getElementById('ship-tooltip-speed');
const shipTooltipYear = document.getElementById('ship-tooltip-year');
const shipTooltipDescription = document.getElementById('ship-tooltip-description');

// Mostrar/ocultar menú de naves
shipButton.addEventListener('click', () => {
    shipOptions.style.display = shipOptions.style.display === 'block' ? 'none' : 'block';
    // Cerrar menú de planetas si está abierto
    planetOptions.style.display = 'none';
    planetSelectOptions.style.display = 'none';
});

// Funcionalidad de hover para mostrar información de naves
const shipOptionsList = document.querySelectorAll('.ship-option');

shipOptionsList.forEach(ship => {
    ship.addEventListener('mouseenter', () => {
        shipTooltipName.textContent = ship.getAttribute('data-name');
        shipTooltipSpeed.textContent = ship.getAttribute('data-speed') + ' km/h';
        shipTooltipYear.textContent = ship.getAttribute('data-year');
        shipTooltipDescription.textContent = ship.getAttribute('data-description');
        shipTooltip.style.display = 'block';
    });

    ship.addEventListener('mouseleave', () => {
        shipTooltip.style.display = 'none';
    });

    // Seleccionar nave (opcional: agregar funcionalidad de selección)
    ship.addEventListener('click', () => {
        // Remover selección anterior
        shipOptionsList.forEach(s => s.style.backgroundColor = '');
        // Marcar como seleccionada
        ship.style.backgroundColor = 'rgba(106, 142, 251, 0.3)';
        // Actualizar texto del botón
        shipButton.textContent = ship.getAttribute('data-name');
        // Cerrar menú
        shipOptions.style.display = 'none';
    });
});

// Cerrar menús al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.ship-menu')) {
        shipOptions.style.display = 'none';
    }
    if (!e.target.closest('.planet-menu')) {
        planetOptions.style.display = 'none';
    }
    if (!e.target.closest('.speed-menu')) {
        speedControl.style.display = 'none';
    }
    if (!e.target.closest('.planet-select-menu')) {
        planetSelectOptions.style.display = 'none';
    }
});

// Iniciar la creación de estrellas y meteoritos (código original sin modificar)
createStarsAndMeteors();

// NUEVA FUNCIONALIDAD PARA SELECCIÓN DE PLANETAS
const planetSelectButton = document.getElementById('planet-select-button');
const planetSelectOptions = document.getElementById('planet-select-options');
const planetSelectOptionsList = document.querySelectorAll('.planet-select-option');
const selectionMessage = document.getElementById('selection-message');
const selectedPlanetName = document.getElementById('selected-planet-name');
const selectedPlanetDistance = document.getElementById('selected-planet-distance');

// Mostrar/ocultar menú de planetas
planetSelectButton.addEventListener('click', () => {
    planetSelectOptions.style.display = planetSelectOptions.style.display === 'block' ? 'none' : 'block';
    // Cerrar otros menús
    shipOptions.style.display = 'none';
    speedControl.style.display = 'none';
    planetOptions.style.display = 'none';
});

// Manejar selección de planetas
planetSelectOptionsList.forEach(planet => {
    planet.addEventListener('click', () => {
        const planetName = planet.getAttribute('data-name');
        const planetDistance = planet.getAttribute('data-distance');
        
        // Actualizar texto del botón
        planetSelectButton.textContent = planetName;
        
        // Cerrar menú
        planetSelectOptions.style.display = 'none';
        
        // Mostrar mensaje de selección
        selectedPlanetName.textContent = planetName;
        selectedPlanetDistance.textContent = planetDistance;
        selectionMessage.style.display = 'block';
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            selectionMessage.style.display = 'none';
        }, 3000);
    });
});


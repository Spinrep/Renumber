
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

// Iniciar la creación de estrellas y meteoritos
createStarsAndMeteors();
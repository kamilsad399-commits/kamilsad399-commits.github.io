console.log("Максимальный интерфейс активирован!");
const card = document.querySelector('.card');
const themeToggleBtn = document.getElementById('theme-toggle');
const cursor = document.querySelector('.custom-cursor');
const circle1 = document.querySelector('.circle1');
const circle2 = document.querySelector('.circle2');
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
    const moveX = (window.innerWidth / 2 - e.clientX) * 0.05;
    const moveY = (window.innerHeight / 2 - e.clientY) * 0.05;
    if (circle1) circle1.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if (circle2) circle2.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    if (card) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
        card.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
    }
});
const interactiveElements = document.querySelectorAll('.btn, .theme-btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(0, 112, 243, 0.1)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        }
    });
});
document.addEventListener('mouseleave', () => {
    if (card) card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            icon.className = document.body.classList.contains('light-theme') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    });
}
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            
            const colors = ['#0070f3', '#ff007f', '#7928ca'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 10px ${particle.style.backgroundColor}`;
            
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            
            const destinationX = (Math.random() - 0.5) * 200;
            const destinationY = (Math.random() - 0.5) * 200;
            
            particle.style.setProperty('--x', `${destinationX}px`);
            particle.style.setProperty('--y', `${destinationY}px`);
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 600);
        }
    });
});
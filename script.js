console.log("Максимальный интерфейс и игра на 10 уровней запущены!");
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
const interactiveElements = document.querySelectorAll('.btn, .theme-btn, .upgrade-btn');
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
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn') || e.target.closest('.avatar') || e.target.closest('.upgrade-btn') || e.target.closest('.theme-btn')) {
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
    }
});
let score = parseInt(localStorage.getItem('miner_score')) || 0;
let pcLevel = parseInt(localStorage.getItem('miner_pcLevel')) || 1;
let clickPower = parseInt(localStorage.getItem('miner_clickPower')) || 1;
let passiveIncome = parseInt(localStorage.getItem('miner_passiveIncome')) || 0;
let upgradeCost = parseInt(localStorage.getItem('miner_upgradeCost')) || 10;
const hardwareUpgrades = {
    1: { cpu: "AMD Athlon (Слабый)", gpu: "Встроенная графика" },
    2: { cpu: "Intel Core i3", gpu: "GTX 1050 Ti" },
    3: { cpu: "AMD Ryzen 3 3100", gpu: "GTX 1660 Super" },
    4: { cpu: "Intel Core i5", gpu: "RTX 3060" },
    5: { cpu: "Intel Core i7", gpu: "RTX 3080" },
    6: { cpu: "AMD Ryzen 5 5600", gpu: "RTX 4060" },
    7: { cpu: "AMD Ryzen 7 5700X3D", gpu: "RTX 4070" },
    8: { cpu: "AMD Ryzen 7 5700X OEM", gpu: "RTX 4080" },
    9: { cpu: "AMD Ryzen 7 7800X3D OEM", gpu: "RTX 4090" },
    10: { cpu: "AMD Ryzen 7 9800X3D OEM 💥", gpu: "Radeon RX 9070 XT 🚀" }
};
const avatarBtn = document.querySelector('.avatar');
const balanceEl = document.getElementById('balance');
const clickPowerEl = document.getElementById('click-power');
const passiveIncomeEl = document.getElementById('passive-income');
const pcLevelEl = document.getElementById('pc-level');
const cpuNameEl = document.getElementById('cpu-name');
const gpuNameEl = document.getElementById('gpu-name');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeCostEl = document.getElementById('upgrade-cost');
updateUI();
checkMaxLevel();
if (avatarBtn) {
    avatarBtn.addEventListener('click', () => {
        score += clickPower;
        updateUI();
        saveGame();
    });
}
if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => {
        if (score >= upgradeCost && pcLevel < 10) {
            score -= upgradeCost;
            pcLevel++;
            
            clickPower += 2;
            passiveIncome += 5;
            upgradeCost = Math.round(upgradeCost * 2.5);
            
            updateUI();
            checkMaxLevel();
            saveGame();
        }
    });
}
setInterval(() => {
    score += passiveIncome;
    updateUI();
    saveGame();
}, 1000);
function saveGame() {
    localStorage.setItem('miner_score', score);
    localStorage.setItem('miner_pcLevel', pcLevel);
    localStorage.setItem('miner_clickPower', clickPower);
    localStorage.setItem('miner_passiveIncome', passiveIncome);
    localStorage.setItem('miner_upgradeCost', upgradeCost);
}
function updateUI() {
    if (balanceEl) balanceEl.innerText = score;
    if (clickPowerEl) clickPowerEl.innerText = clickPower;
    if (passiveIncomeEl) passiveIncomeEl.innerText = passiveIncome;
    if (pcLevelEl) pcLevelEl.innerText = pcLevel;
    if (upgradeCostEl) upgradeCostEl.innerText = upgradeCost;
    
    if (hardwareUpgrades[pcLevel]) {
        if (cpuNameEl) cpuNameEl.innerText = hardwareUpgrades[pcLevel].cpu;
        if (gpuNameEl) gpuNameEl.innerText = hardwareUpgrades[pcLevel].gpu;
    }
}
function checkMaxLevel() {
    if (pcLevel >= 10) {
        if (upgradeBtn) {
            upgradeBtn.disabled = true;
            upgradeBtn.innerText = "ПК прокачан на МАКСИМУМ! 👑";
            upgradeBtn.style.background = "linear-gradient(90deg, #00ffcc, #0070f3)";
        }
    }
}
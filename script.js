// Configurações de sensibilidade por dispositivo e nível
const sensitivityConfig = {
    android: {
        baixa: {
            geral: 70,
            ponto: 65,
            mira2x: 60,
            mira4x: 55,
            awm: 45,
            olhadinha: 50,
        },
        media: {
            geral: 120,
            ponto: 110,
            mira2x: 100,
            mira4x: 90,
            awm: 70,
            olhadinha: 80,
        },
        alta: {
            geral: 180,
            ponto: 170,
            mira2x: 160,
            mira4x: 150,
            awm: 110,
            olhadinha: 120,
        },
    },
    ios: {
        baixa: {
            geral: 65,
            ponto: 60,
            mira2x: 55,
            mira4x: 50,
            awm: 40,
            olhadinha: 45,
        },
        media: {
            geral: 115,
            ponto: 105,
            mira2x: 95,
            mira4x: 85,
            awm: 65,
            olhadinha: 75,
        },
        alta: {
            geral: 175,
            ponto: 165,
            mira2x: 155,
            mira4x: 145,
            awm: 105,
            olhadinha: 115,
        },
    },
};

// Estado da aplicação
let state = {
    device: null,
    level: null,
    values: {
        geral: 0,
        ponto: 0,
        mira2x: 0,
        mira4x: 0,
        awm: 0,
        olhadinha: 0,
    },
};

// Elementos do DOM
const deviceBtns = document.querySelectorAll('.device-btn');
const levelBtns = document.querySelectorAll('.level-btn');
const levelSection = document.getElementById('level-section');
const configSection = document.getElementById('config-section');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');

const sliders = {
    geral: document.getElementById('geral-slider'),
    ponto: document.getElementById('ponto-slider'),
    mira2x: document.getElementById('mira2x-slider'),
    mira4x: document.getElementById('mira4x-slider'),
    awm: document.getElementById('awm-slider'),
    olhadinha: document.getElementById('olhadinha-slider'),
};

const valueDisplays = {
    geral: document.getElementById('geral-value'),
    ponto: document.getElementById('ponto-value'),
    mira2x: document.getElementById('mira2x-value'),
    mira4x: document.getElementById('mira4x-value'),
    awm: document.getElementById('awm-value'),
    olhadinha: document.getElementById('olhadinha-value'),
};

// Event Listeners para dispositivos
deviceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const device = btn.dataset.device;
        selectDevice(device);
    });
});

// Event Listeners para níveis
levelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        selectLevel(level);
    });
});

// Event Listeners para sliders
Object.entries(sliders).forEach(([key, slider]) => {
    slider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        state.values[key] = value;
        updateValueDisplay(key, value);
    });
});

// Event Listener para copiar
copyBtn.addEventListener('click', copyConfiguration);

// Funções
function selectDevice(device) {
    state.device = device;

    // Atualizar botões
    deviceBtns.forEach((btn) => {
        btn.classList.remove('active');
        if (btn.dataset.device === device) {
            btn.classList.add('active');
        }
    });

    // Mostrar seção de níveis
    levelSection.style.display = 'block';
    levelSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Resetar nível se dispositivo mudou
    if (state.level) {
        state.level = null;
        levelBtns.forEach((btn) => btn.classList.remove('active'));
        configSection.style.display = 'none';
    }
}

function selectLevel(level) {
    state.level = level;

    // Atualizar botões
    levelBtns.forEach((btn) => {
        btn.classList.remove('active');
        if (btn.dataset.level === level) {
            btn.classList.add('active');
        }
    });

    // Carregar configurações
    loadConfiguration();

    // Mostrar seção de configuração
    configSection.style.display = 'block';
    setTimeout(() => {
        configSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function loadConfiguration() {
    const config = sensitivityConfig[state.device][state.level];

    Object.entries(config).forEach(([key, value]) => {
        state.values[key] = value;
        sliders[key].value = value;
        updateValueDisplay(key, value);
    });
}

function updateValueDisplay(key, value) {
    if (valueDisplays[key]) {
        valueDisplays[key].textContent = value;
    }
}

function copyConfiguration() {
    const deviceName = state.device === 'android' ? 'Android' : 'iOS';
    const levelName =
        state.level === 'baixa' ? 'Baixa' : state.level === 'media' ? 'Média' : 'Alta';

    const text = `🎮 Configurações de Sensibilidade Free Fire 🎮

📱 Dispositivo: ${deviceName}
⚡ Nível: ${levelName}

📊 Geral: ${state.values.geral}
🔴 Ponto Vermelho: ${state.values.ponto}
🔍 Mira 2x: ${state.values.mira2x}
🎯 Mira 4x: ${state.values.mira4x}
💥 Mira AWM: ${state.values.awm}
👀 Olhadinha: ${state.values.olhadinha}

Gerado em: Gerador de Sensibilidade Free Fire`;

    navigator.clipboard.writeText(text).then(() => {
        showToast('Configurações copiadas para a área de transferência!');
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Inicialização
console.log('Gerador de Sensibilidade Free Fire carregado!');

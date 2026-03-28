// 1. LÓGICA DO SPLASH SCREEN (2 SEGUNDOS)
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 2000);
});

// 2. LÓGICA DO FORMULÁRIO MULTI-STEP
const steps = Array.from(document.querySelectorAll(".form-step"));
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const progressSteps = document.querySelectorAll(".step-item");
const progressBar = document.getElementById("progressBar");

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (validateInputs()) changeStep(1);
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => changeStep(-1));
});

function changeStep(dir) {
    const active = document.querySelector(".form-step.active");
    let index = steps.indexOf(active);
    steps[index].classList.remove("active");
    progressSteps[index].classList.remove("active");
    
    index += dir;
    
    steps[index].classList.add("active");
    progressSteps[index].classList.add("active");
    
    let percent = (index / (steps.length - 1)) * 100;
    progressBar.style.width = percent + "%";
}

function validateInputs() {
    const active = document.querySelector(".form-step.active");
    const required = active.querySelectorAll("[required]");
    let ok = true;
    required.forEach(i => {
        if (!i.value) { i.style.borderColor = "red"; ok = false; }
        else { i.style.borderColor = "#ccc"; }
    });
    return ok;
}

// 3. LÓGICA DE ENVIO E AVISO PISCANDO
const form = document.getElementById("multiStepForm");
const modal = document.getElementById("modal-aviso");
const btnEntendido = document.getElementById("btn-entendido");
let globalUrl = "";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    let texto = "⭐ *CADASTRO CLUBE SIRIUS* ⭐\n\n";

    formData.forEach((value, key) => {
        if (!(value instanceof File) && value.trim() !== "") {
            texto += `*${key}:* ${value}\n`;
        }
    });

    const fone = "559291404115";
    globalUrl = `https://api.whatsapp.com/send?phone=${fone}&text=${encodeURIComponent(texto)}`;

    // Mostrar o aviso piscando
    modal.style.display = "flex";
});

btnEntendido.addEventListener("click", () => {
    window.location.href = globalUrl;
});

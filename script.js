const contador = document.getElementById("contador");
const valorFinal = 4365;
const duracao = 2000; // tempo da animação em ms

let inicio = 0;
const incremento = Math.ceil(valorFinal / (duracao / 16));

function animarContador() {
    inicio += incremento;
    if (inicio >= valorFinal) {
        contador.textContent = valorFinal;
    } else {
        contador.textContent = inicio;
        requestAnimationFrame(animarContador);
    }
}

animarContador();

/* Formulário */
const WEBHOOK_URL = "https://territorialpiranha-n8n.cloudfy.live/webhook-test/8f4f7a54-aa7c-45b8-904f-590b590eb8ed";

const form = document.getElementById("contabilidade-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        firstname: document.getElementById("firstname").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        source: "form-contabilidade-inteligente",
        submittedAt: new Date().toISOString()
    };

    statusEl.textContent = "Enviando...";

    try {
        const res = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const text = await res.text().catch(() => "");

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText} ${text ? "- " + text : ""}`.trim());
        }

        statusEl.textContent = "Enviado com sucesso! ✅";
        form.reset();
    } catch (err) {
        console.error(err);
        statusEl.textContent = "Falha ao enviar. ❌ Tente novamente em instantes.";
    }
});


const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoTema = document.getElementById("botao-tema");
const corpo = document.body;

// Carregar tema salvo
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "claro") {
    corpo.classList.add("tema-claro");
    botaoTema.textContent = "☀️";
}

botaoTema.addEventListener("click", () => {
    const estaClaro = corpo.classList.toggle("tema-claro");
    botaoTema.textContent = estaClaro ? "☀️" : "🌙";
    localStorage.setItem("tema", estaClaro ? "claro" : "escuro");
});

const perguntas = [
    {
        enunciado: "Você é um jovem camponês numa vila pacífica. Um dia, um mensageiro real chega com notícias de uma ameaça sombria se aproximando. O que você faz?",
        alternativas: [
            {
                texto: "Ignoro a notícia e continuo minha rotina.",
                afirmacao: "Sua inação permitiu que o mal crescesse silenciosamente."
            },
            {
                texto: "Decido juntar forças com os aldeões para se preparar para o pior.",
                afirmacao: "Sua coragem uniu a vila e despertou esperança."
            }
        ]
    },
    {
        enunciado: "Durante a preparação, um velho mago aparece e oferece ajuda. Você aceita?",
        alternativas: [
            {
                texto: "Aceito a ajuda do mago, confiando em seus poderes.",
                afirmacao: "O mago ensinou feitiços que fortaleceram a defesa da vila."
            },
            {
                texto: "Desconfio do mago e o rejeito.",
                afirmacao: "Sem o auxílio mágico, a vila está vulnerável."
            }
        ]
    },
    {
        enunciado: "A noite antes do ataque, um espião inimigo é capturado. Você decide:",
        alternativas: [
            {
                texto: "Interrogá-lo para obter informações.",
                afirmacao: "As informações revelaram pontos fracos do inimigo."
            },
            {
                texto: "Deixá-lo ser levado pela justiça, sem extrair informações.",
                afirmacao: "O inimigo chegou desprevenido, causando caos."
            }
        ]
    },
    {
        enunciado: "A batalha começa. Você lidera um ataque direto ou uma emboscada sorrateira?",
        alternativas: [
            {
                texto: "Ataque direto, mostrando força.",
                afirmacao: "Sua bravura inspira os aldeões, mas as baixas são grandes."
            },
            {
                texto: "Emboscada, usando o terreno a favor.",
                afirmacao: "O inimigo é pego de surpresa e começa a recuar."
            }
        ]
    },
    {
        enunciado: "Após a vitória, você pode escolher:",
        alternativas: [
            {
                texto: "Reconstruir a vila e viver em paz.",
                afirmacao: "Seu povo prospera e histórias de sua coragem são cantadas. Final bom!"
            },
            {
                texto: "Buscar vingança contra os inimigos, entrando em guerra.",
                afirmacao: "A vingança trouxe mais sofrimento e desespero. Final ruim."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Sua jornada termina assim:";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
}

mostraPergunta();

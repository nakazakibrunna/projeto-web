import { projetos } from "./dados.js";

import {
    salvarCadastro,
    carregarCadastro
} from "./storage.js";

import {
    validarNome,
    validarEmail
} from "./validacao.js";


// MENU HAMBÚRGUER

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", function () {

    menu.classList.toggle("menu-aberto");

    const menuAberto =
        menu.classList.contains("menu-aberto");

    menuToggle.setAttribute(
        "aria-expanded",
        menuAberto
    );

    menuToggle.setAttribute(
        "aria-label",
        menuAberto
            ? "Fechar menu"
            : "Abrir menu"
    );
});


// ÁREA PRINCIPAL DA SPA

const app = document.getElementById("app");


// FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO

function renderPage() {

    const page =
        window.location.hash.substring(1);


    // INÍCIO

    if (page === "inicio" || page === "") {

        app.innerHTML = `
            <section>
                <h2>Apresentação</h2>

                <p>
                    O Instituto Expandindo o Reino é uma organização
                    voltada para ações sociais e projetos que buscam
                    contribuir para a comunidade.
                </p>
            </section>

            <section>
                <h2>Quem Somos</h2>

                <p>
                    Somos uma instituição que desenvolve iniciativas
                    sociais e busca envolver pessoas interessadas
                    em contribuir com diferentes ações comunitárias.
                </p>
            </section>

            <section>
                <h2>Nossa Missão</h2>

                <p>
                    Nossa missão é promover ações que contribuam para
                    o bem-estar da comunidade, incentivando a
                    solidariedade, a participação e o voluntariado.
                </p>
            </section>

            <section>
                <h2>Contato</h2>

                <p>
                    Telefone: (96) 99999-9999
                </p>

                <p>
                    E-mail: contato@instituto.org
                </p>
            </section>
        `;


    // PROJETOS

    } else if (page === "projetos") {

        const cardsProjetos =
            projetos.map(function (projeto) {

                return `
                    <article>
                        <h3>${projeto.nome}</h3>

                        <p>
                            ${projeto.descricao}
                        </p>
                    </article>
                `;

            }).join("");


        app.innerHTML = `
            <section>

                <h2>Nossos Projetos</h2>

                <p>
                    Conheça algumas das iniciativas do
                    Instituto Expandindo o Reino.
                </p>

                <div>
                    ${cardsProjetos}
                </div>

                <h3>
                    Distribuição das iniciativas
                </h3>

                <canvas id="graficoProjetos"></canvas>

            </section>
        `;


        const grafico =
            document.getElementById("graficoProjetos");

        new Chart(grafico, {

            type: "bar",

            data: {

                labels: [
                    "Ações Sociais",
                    "Voluntariado",
                    "Projetos Comunitários"
                ],

                datasets: [
                    {
                        label: "Quantidade de iniciativas",

                        data: [4, 3, 5]
                    }
                ]
            },

            options: {

                responsive: true,

                scales: {

                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


    // VOLUNTARIADO

    } else if (page === "voluntariado") {

        app.innerHTML = `
            <section>

                <h2>Voluntariado</h2>

                <p>
                    O voluntariado permite que pessoas interessadas
                    contribuam com os projetos e ações desenvolvidos
                    pelo Instituto Expandindo o Reino.
                </p>

            </section>
        `;


    // CADASTRO

    } else if (page === "cadastro") {

        app.innerHTML = `
            <section>

                <h2>Cadastro</h2>

                <p>
                    Preencha seus dados para demonstrar interesse
                    em participar das atividades do Instituto.
                </p>

                <form id="formCadastro">

                    <label for="nome">
                        Nome:
                    </label>

                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                    >

                    <p
                        id="erroNome"
                        class="mensagem-erro">
                    </p>


                    <label for="email">
                        E-mail:
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                    >

                    <p
                        id="erroEmail"
                        class="mensagem-erro">
                    </p>


                    <button
                        type="submit"
                        class="btn">
                        Enviar cadastro
                    </button>

                    <p id="mensagemCadastro"></p>

                </form>

            </section>
        `;


        configurarFormulario();


    // PÁGINA NÃO ENCONTRADA

    } else {

        app.innerHTML = `
            <section>

                <h2>Página não encontrada</h2>

                <p>
                    O conteúdo solicitado não foi encontrado.
                </p>

            </section>
        `;
    }
}


// CONFIGURAÇÃO DO FORMULÁRIO

function configurarFormulario() {

    const formCadastro =
        document.getElementById("formCadastro");

    const campoNome =
        document.getElementById("nome");

    const campoEmail =
        document.getElementById("email");

    const erroNome =
        document.getElementById("erroNome");

    const erroEmail =
        document.getElementById("erroEmail");

    const mensagemCadastro =
        document.getElementById("mensagemCadastro");


    // RECUPERA DADOS SALVOS

    const dadosCadastro =
        carregarCadastro();

    if (dadosCadastro) {

        campoNome.value =
            dadosCadastro.nome;

        campoEmail.value =
            dadosCadastro.email;
    }


    // ENVIO DO FORMULÁRIO

    formCadastro.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            erroNome.textContent = "";
            erroEmail.textContent = "";

            campoNome.classList.remove(
                "campo-erro"
            );

            campoNome.classList.remove(
                "campo-sucesso"
            );

            campoEmail.classList.remove(
                "campo-erro"
            );

            campoEmail.classList.remove(
                "campo-sucesso"
            );

            mensagemCadastro.textContent = "";

            mensagemCadastro.className = "";


            const nome =
                campoNome.value.trim();

            const email =
                campoEmail.value.trim();


            const erroNomeTexto =
                validarNome(nome);

            const erroEmailTexto =
                validarEmail(email);


            let formularioValido = true;


            // RESULTADO DO NOME

            if (erroNomeTexto !== "") {

                campoNome.classList.add(
                    "campo-erro"
                );

                erroNome.textContent =
                    erroNomeTexto;

                formularioValido = false;

            } else {

                campoNome.classList.add(
                    "campo-sucesso"
                );
            }


            // RESULTADO DO E-MAIL

            if (erroEmailTexto !== "") {

                campoEmail.classList.add(
                    "campo-erro"
                );

                erroEmail.textContent =
                    erroEmailTexto;

                formularioValido = false;

            } else {

                campoEmail.classList.add(
                    "campo-sucesso"
                );
            }


            // SALVAMENTO

            if (formularioValido) {

                const dadosCadastro = {

                    nome: nome,

                    email: email
                };


                salvarCadastro(
                    dadosCadastro
                );


                mensagemCadastro.textContent =
                    "Cadastro realizado com sucesso!";

                mensagemCadastro.classList.add(
                    "mensagem-sucesso"
                );
            }
        }
    );


    // EVENTO INPUT DO NOME

    campoNome.addEventListener(
        "input",
        function () {

            campoNome.classList.remove(
                "campo-erro"
            );

            erroNome.textContent = "";
        }
    );


    // EVENTO INPUT DO E-MAIL

    campoEmail.addEventListener(
        "input",
        function () {

            campoEmail.classList.remove(
                "campo-erro"
            );

            erroEmail.textContent = "";
        }
    );
}


// NAVEGAÇÃO DA SPA

window.addEventListener(
    "hashchange",
    renderPage
);


// CARREGAMENTO INICIAL

renderPage();
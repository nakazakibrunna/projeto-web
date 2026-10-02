export function salvarCadastro(dadosCadastro) {

    localStorage.setItem(
        "dadosCadastro",
        JSON.stringify(dadosCadastro)
    );
}


export function carregarCadastro() {

    const dadosSalvos =
        localStorage.getItem("dadosCadastro");

    if (dadosSalvos) {

        return JSON.parse(dadosSalvos);
    }

    return null;
}
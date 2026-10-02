export function validarNome(nome) {

    if (nome === "") {
        return "Digite seu nome.";
    }

    const nomeValido =
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    if (!nomeValido.test(nome)) {
        return "Digite um nome válido, usando apenas letras.";
    }

    return "";
}


export function validarEmail(email) {

    if (email === "") {
        return "Digite seu e-mail.";
    }

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        return "Digite um e-mail válido.";
    }

    return "";
}
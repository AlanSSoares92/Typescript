"use strict";
//Selecionar o formulário
const form = document.querySelector(".form");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");
// os 3 '...' representam que o typescript vai buscar todos os elementos dentro do parametro 'inputs'
const button = document.querySelector("button");
button.disabled = true;
function habilitarBotaoSubmit(form) {
    let erros = form.querySelectorAll('.show-error-message');
    if (erros.length > 0) {
        button.disabled = true;
    }
    else {
        button.disabled = false;
    }
}
function verificarCamposVazios(...inputs) {
    inputs.forEach(function (campo) {
        if (!campo.value) {
            console.log(`${campo.className} está vazio, por favor preencher!`);
            apresentaMSGErro(campo, "O campo não pode ficar vazio");
        }
    });
}
function excluirMSGErro(form) {
    form.querySelectorAll(".show-error-message").forEach(function (item) {
        item.classList.remove("show-error-message");
    });
}
function verificaSenha(password, password2) {
    if (password2.value != password.value) {
        console.log("As senhas não se correspondem!");
    }
}
function verificarSenhaCurta(password) {
    if (password.value.length < 8) {
        console.log("A senha é muito curta");
        apresentaMSGErro(password, "A senha é muito curta");
    }
}
//definindo evento do form
form.addEventListener("submit", function (event) {
    //eu quero que ele cancele o evento de submeter para ir para outra página
    event.preventDefault();
    verificaSenha(password, password2);
    excluirMSGErro(form);
    verificarCamposVazios(username, email, password, password2);
    let usuario = {
        username: username.value,
        email: email.value,
        password: password.value
    };
    username.value = "";
    email.value = "";
    password2.value = "";
    password.value = "";
    button.disabled = true;
});
function apresentaMSGErro(input, msg) {
    //define o form como pai do campo abaixo
    const formField = input.parentElement;
    const errorMessage = formField.querySelector(".error-message");
    errorMessage.innerText = msg;
    formField.classList.add("show-error-message");
}
form.querySelectorAll("input").forEach((elemento) => {
    elemento.addEventListener('blur', (event) => {
        event.preventDefault();
        if (!elemento.value) {
            apresentaMSGErro(elemento, 'O campo não pode ser vazio!');
        }
        else {
            let formField = elemento.parentElement;
            formField.classList.remove('show-error-message');
            if (elemento.className == 'password') {
                verificarSenhaCurta(password);
            }
            if (elemento.className == 'password2') {
                verificaSenha(password, password2);
            }
        }
        habilitarBotaoSubmit(form);
    });
});
///A diferença entre queryselector e getelementbyID é que o segundo só busca o id já o query
//busca tanto classe quanto id
//selecionar todos
//document.querySelectorAll('.form');

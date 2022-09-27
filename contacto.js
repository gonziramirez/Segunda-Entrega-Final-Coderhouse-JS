const inputNombre = document.querySelector("#inputNombre")
const inputEmail = document.querySelector("#inputEmail")
const inputComentarios = document.querySelector("#inputComentarios")
const btnEnviar = document.querySelector("#btnEnviar")


const guardarDatos = () =>{
    localStorage.setItem("nombre",inputNombre.value)
    localStorage.setItem("email",inputEmail.value)
    localStorage.setItem("comentarios",inputComentarios.value)
}

btnEnviar.addEventListener("click",guardarDatos)

const devolverDatos = ()=>{
    inputNombre.value = localStorage.getItem("nombre")
    inputEmail.value = localStorage.getItem("email")
    inputComentarios.value = localStorage.getItem("comentarios")
}

document.addEventListener("DOMContentLoaded",devolverDatos)
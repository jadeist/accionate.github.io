//Controlador para el inicio de sesion
import { obtenerRolUsuario } from "../js/util.js"

console.log("si funciona")

const signinForm = document.querySelector("#signin-form")

signinForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    auth.signInWithEmailAndPassword(email, password)
        .then((credentials) => {
            console.log("El usuario inició sesión exitosamente")
            console.log("el usuario", credentials.user.email)
        })
        .catch((error) => window.alert("Ocurrio un error iniciando sesion: " + error))
})

//Revisar si el usuario tiene sesion
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("hay usuario")

        var usuarioRef = fs.collection("Usuarios").doc(user.email)

        usuarioRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data())
                    const rol = doc.data().rol
                    console.log("rol", rol)
                    if (rol == "Voluntario") {
                        location.href = "dashboardVoluntario.html"
                        console.log("es voluntario")
                    }
                    if (rol == "Administrador") {
                        location.href = "dashboardAdministrador.html"
                        console.log("es admin")
                    }
                    if (rol == "Asociacion") {
                        location.href = "dashboardAsociacion.html"
                        console.log("es asociacion")
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!")
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error)
            })

        console.log("hay un usuario" + user.email)
    } else {
        console.log("No hay usuario")
    }
})

// console.log("hola si funciona")

// const signupForm = document.querySelector("#signup-form")

// signupForm.addEventListener("submit", (e) => {
//     e.preventDefault()
//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value
//     console.log("submiting" + email + password)

//     auth.createUserWithEmailAndPassword(email, password)
//         .then((userCredentian) => {
//             console.log("El se registró exitosamente")
//         })
//         .catch((error) => window.alert("Ocurrio un error en el registro: " + error))
// })

const logout = document.querySelector("#boton-logout")

logout.addEventListener("click", (e) => {
    e.preventDefault()
    auth.signOut().then(() => {
        console.log("Se cerro sesion exitosamente")
    })
})

// //Traer las asociaciones

// const listaAsociacionesHTML = document.querySelector("#asociaciones")

// const mostrarAsociaciones = (data) => {
//     if (data.length) {
//         let html = ""

//         data.forEach((doc) => {
//             var asociacion = doc.data()

//             const li = `<li class="list-group-item"> <h5> ${asociacion.nombreAsociacion} </h5> <p> </p>  </li>`
//             html += li
//         })

//         listaAsociacionesHTML.innerHTML = html
//     } else {
//         listaAsociacionesHTML.innerHTML = "<p> No hay asociaciones </p>"
//     }
// }

// //Evento para saber si el usuario esta autenticado

// auth.onAuthStateChanged((user) => {
//     if (user) {
//         console.log("hay un usuario", user.email)
//         //ver asociaciones si el usuario esta logueado

//         fs.collection("Asociaciones")
//             .get()
//             .then((snapshot) => {
//                 console.log("Las asociaciones son: " + snapshot.docs)
//                 mostrarAsociaciones(snapshot.docs)
//             })
//     } else {
//         console.log("no hay usuario")
//         mostrarAsociaciones([])
//     }
// })

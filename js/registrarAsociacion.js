//Controlador para registrar la asociacion

import { obtenerRolUsuario, subirStorage } from "../js/util.js"

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

//Llenado del formulario de registrar asociacion

const signupForm = document.querySelector("#signup-form")

signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const password = document.querySelector("#password").value
    const passwordconfirm = document.querySelector("#passwordconfirm").value
    if (password === passwordconfirm) {
        const email = document.querySelector("#email").value
        const nombreCompleto = document.querySelector("#fullName").value
        const edad = document.querySelector("#age").value
        const ocupacion = document.querySelector("#ocupation").value
        const descripcion = document.querySelector("#description").value

        var urlFotoPerfil =
            "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        if (document.querySelector("#profilepic").value) {
            const fotoPerfil = "/Users/jade/Documents/windows 2020/d97785fac0dfdbc65cd2689280bf735a.jpg"
            console.log("hay foto de perfil " + fotoPerfil)
            ;(async () => {
                urlFotoPerfil = await subirStorage(`perfil-${email}`, fotoPerfil)
                console.log(users)
            })()

            console.log("url foto perfil ", urlFotoPerfil)
        }

        var urlIdentificacion =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZq5zFm5H6B-hFroeOU_bKO1Gd8dP6vBJCF2p7_d5gz6khDUB6hwyX8bchjCy76VMQDc&usqp=CAU"
        if (document.querySelector("#identification").value) {
            const identificacion = document.querySelector("#identification").value
            console.log("hay identificacion " + identificacion)
            urlIdentificacion = async () => {
                const result = await subirStorage(`identificacion-${email}`, identificacion)

                return result
            }
        }

        fs.collection("Usuarios")
            .doc(email)
            .set({
                email: email,
                nombreCompleto: nombreCompleto,
                edad: edad,
                ocupacion: ocupacion,
                descripcion: descripcion,
                urlFotoPerfil: urlFotoPerfil,
                urlIdentificacion: urlIdentificacion,
                rol: "Voluntario",
            })
            .then(() => {
                console.log("Document successfully written!")
            })
            .catch((error) => {
                console.error("Error writing document: ", error)
            })

        auth.createUserWithEmailAndPassword(email, password)
            .then((credentials) => {
                console.log("El se registró exitosamente")
                location.href = "dashboardVoluntario.html"
            })
            .catch((error) => window.alert("Ocurrio un error en el registro: " + error))
    } else {
        window.alert("La contraseña no coincide con la confirmacion de contraseña")
    }
})

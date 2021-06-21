//Controlador para las asociaciones

const signupForm = document.querySelector("#user-content")
const listaAsociacionesHTML = document.querySelector("#asociaciones")

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
                        console.log("es voluntario")

                        fs.collection("Asociaciones")
                            .get()
                            .then((snapshot) => {
                                console.log("Las asociaciones son: " + snapshot.docs)
                                mostrarAsociaciones(snapshot.docs)
                            })
                    }
                    if (rol == "Administrador") {
                        location.href = "dashboardAdministrador.html"
                        console.log("es admin")
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
        mostrarAsociaciones([])
    }
})

const logout = document.querySelector("#logout")

logout.addEventListener("click", (e) => {
    e.preventDefault()
    auth.signOut().then(() => {
        console.log("Se cerro sesion exitosamente")
        location.href = "inicio.html"
    })
})

//Traer las asociaciones

const mostrarAsociaciones = (data) => {
    if (data.length) {
        let html = ""

        data.forEach((doc) => {
            var asociacion = doc.data()

            const elemento = `<div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  ${asociacion.nombreAsociacion}
                </button>
              </h5>
            </div>
        
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </div>
          </div>`
            html += elemento
        })

        listaAsociacionesHTML.innerHTML = html
    } else {
        listaAsociacionesHTML.innerHTML = "<p> No hay asociaciones </p>"
    }
}

// //Llenado del formulario de registrar voluntario

// signupForm.addEventListener("submit", (e) => {
//     e.preventDefault()
//     const password = document.querySelector("#password").value
//     const passwordconfirm = document.querySelector("#passwordconfirm").value
//     if (password === passwordconfirm) {
//         const email = document.querySelector("#email").value
//         const nombreCompleto = document.querySelector("#fullName").value
//         const edad = document.querySelector("#age").value
//         const ocupacion = document.querySelector("#ocupation").value
//         const descripcion = document.querySelector("#description").value

//         var urlFotoPerfil =
//             "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//         if (document.querySelector("#profilepic").value) {
//             const fotoPerfil = "/Users/jade/Documents/windows 2020/d97785fac0dfdbc65cd2689280bf735a.jpg"
//             console.log("hay foto de perfil " + fotoPerfil)
//             ;(async () => {
//                 urlFotoPerfil = await subirStorage(`perfil-${email}`, fotoPerfil)
//                 console.log(users)
//             })()

//             console.log("url foto perfil ", urlFotoPerfil)
//         }

//         var urlIdentificacion =
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZq5zFm5H6B-hFroeOU_bKO1Gd8dP6vBJCF2p7_d5gz6khDUB6hwyX8bchjCy76VMQDc&usqp=CAU"
//         if (document.querySelector("#identification").value) {
//             const identificacion = document.querySelector("#identification").value
//             console.log("hay identificacion " + identificacion)
//             urlIdentificacion = async () => {
//                 const result = await subirStorage(`identificacion-${email}`, identificacion)

//                 return result
//             }
//         }

//         fs.collection("Usuarios")
//             .doc(email)
//             .set({
//                 email: email,
//                 nombreCompleto: nombreCompleto,
//                 edad: edad,
//                 ocupacion: ocupacion,
//                 descripcion: descripcion,
//                 urlFotoPerfil: urlFotoPerfil,
//                 urlIdentificacion: urlIdentificacion,
//                 rol: "Voluntario",
//             })
//             .then(() => {
//                 console.log("Document successfully written!")
//             })
//             .catch((error) => {
//                 console.error("Error writing document: ", error)
//             })

//         auth.createUserWithEmailAndPassword(email, password)
//             .then((credentials) => {
//                 console.log("El se registró exitosamente")
//                 location.href = "dashboardVoluntario.html"
//             })
//             .catch((error) => window.alert("Ocurrio un error en el registro: " + error))
//     } else {
//         window.alert("La contraseña no coincide con la confirmacion de contraseña")
//     }
// })

// //Evento para saber si el usuario esta autenticado

// auth.onAuthStateChanged((user) => {
//     if (user) {
//         console.log("hay un usuario" + user.email)
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

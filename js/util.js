export async function obtenerRolUsuario(fs, email) {
    var usuarioRef = fs.collection("Usuarios").doc(email)

    usuarioRef
        .get()
        .then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().rol)
                return doc.data().rol
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!")
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error)
        })
}

//Storage

export async function subirStorage(nombre_archivo, archivo) {
    if (archivo instanceof File && archivo.size > 0) {
        await storage.ref(nombre_archivo).put(archivo)
        return await obtenerURLStorage(nombre_archivo)
    }
}

export async function obtenerURLStorage(nombre_archivo) {
    try {
        return await storage.ref(nombre_archivo).getDownloadURL()
    } catch (e) {
        console.log(e)
        return ""
    }
}

export async function eliminaStorage(nombre_archivo) {
    return await storage.ref(nombre_archivo).delete()
}

//Fin Storage

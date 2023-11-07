

class Usuario {
    constructor({ id, nombre, apellido, usuario, contrasenia, salt }) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.id = id;
        this.salt = salt;
    }


}
exports.Usuario = Usuario;
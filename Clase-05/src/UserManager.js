const {promises: fs} = require('fs')
const { Usuario } = require('./Usuario.js')
const crypto = require('crypto')

class userManager{
    constructor(ruta){
        this.ruta= ruta
    }

    async registrar({nombre, apellido, usuario, contrasenia}){
        const id = crypto.randomUUID()
        const salt = crearSalt()
        contrasenia = encriptar(contrasenia,salt)

        
        const nuevoUsuario = new Usuario({id,nombre, apellido, usuario, contrasenia, salt})

        const usuarios = await this.obtenerUsuarios()
        usuarios.push(nuevoUsuario)
        await fs.writeFile(this.ruta, JSON.stringify(usuarios, null, 2))
        return nuevoUsuario
    }



    async logear (nombreUsuario, contrasenia){
        const usuarios = await this.obtenerUsuarios()
        const buscado = usuarios.find(u => u.usuario === nombreUsuario)
        if(!buscado){
            throw new Error('credenciales invalidas')
        }
        const contraseniaRecibida = encriptar(contrasenia, buscado.salt)
        if(buscado.contrasenia !== contraseniaRecibida){
            throw new Error('Credenciales invalidas')
        }
        return buscado

    }

    async obtenerUsuarios(){
        const jsonUsuarios = await fs.readFile(this.ruta, 'utf-8')
        const arrayUsuarios = JSON.parse(jsonUsuarios)
        return arrayUsuarios

    }

    

}

exports.userManager = userManager;

function encriptar(valor, salt){

    return crypto.createHmac('sha256',salt).update(valor).digest('hex')
}
function crearSalt(){
    return crypto.randomBytes(128).toString('base64')
}
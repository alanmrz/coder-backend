const {promises: fs} = require('fs')
const crypto = require('crypto')
const { error } = require('console')
const { Usuario } = require('./Usuario.js')
const { userManager } = require('./UserManager.js')




async function main(){
    const um = new userManager('./db/usuarios.json')
    console.log(await um.obtenerUsuarios())
    await um.registrar({nombre:"alan",apellido:'mm', usuario:'amartinez', contrasenia:'123'})
    console.log(await um.obtenerUsuarios())
    const logueado = await um.logear('amartinez', '123')
    console.log(logueado)

}
main()

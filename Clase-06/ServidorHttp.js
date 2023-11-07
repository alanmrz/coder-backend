import http from 'http'

const server = http.createServer((request, response)=>{
    const {url, method} = request
    const path = url.split('?')[0]
    const estudiantes = [
        {nombre: 'eduardo'}
    ]
    const profes = [
        {nombre: 'marian', rol: 'profe'},
        {nombre: 'leandro', rol: 'tutor'},
        {nombre: 'diego', rol: 'tutor'},
        {nombre: 'franco', rol: 'tutor'}

    ]


    console.log(method, url)
    if(method=== 'GET'){
        if(path === '/estudiantes'){
            response.end(JSON.stringify(estudiantes))

        }
        else if(path === '/profes'){
            const query = url.split('?')[1]
            const [atributo,valor] = query.split('=')
            
            response.end(JSON.stringify({
                profes:
                    profes.filter(p => p[atributo]=== valor)

            }))

        }
    }

})

server.listen(8080,()=>{
    console.log('conectado al puerto 8080')
})
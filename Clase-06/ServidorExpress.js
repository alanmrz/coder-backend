import  Express  from 'express'

const app = Express()

const estudiantes = [
    {id:1, nombre: 'eduardo'}
]
const profes = [
    {id:2, nombre: 'marian', rol: 'profe'},
    {id:3, nombre: 'leandro', rol: 'tutor'},
    {id:4, nombre: 'diego', rol: 'tutor'},
    {id:1, nombre: 'franco', rol: 'tutor'}

]

app.get('/estudiantes',(req,res)=>{
res.json({estudiantes})
})

app.get('/profes',(req,res)=>{
    
    if(req.query['rol']){
        res.json({profes:
        profes.filter(p=> p.rol=== req.query['rol'])
        })
    }

    else{
        res.json({profes})
    }

    })

    app.get('/profes/:id',(req,res)=>{
        const idProfe= parseInt(req.params['id'])
    const buscado = profes.find(p=> p.id === idProfe)
        if(buscado){
            res.json({profe: buscado})
        }else{
            res.json({error: 'ocurrio un error'})
        }
        
    
        })

app.get('/',(req,res)=>{
        res.send(`<h1>Aguante el backend</h1>`)
        })
app.listen(8080,()=>{
    console.log('conectado al puerto 8080')
})
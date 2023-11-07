//const { ProductManager } = require('./ProductManager.js')
import { ProductManager } from "./src/ProductManager.js"
import  Express  from 'express'

const Pm = new ProductManager('./src/productos.json')

const app = Express()



app.get('/products',async (req,res)=>{

    if(req.query['limit']){
        const allProducts = await Pm.getProducts()
        const limitProducts = allProducts.slice(0,req.query['limit'])
        res.json(limitProducts)
    }else{
    const allProducts = await Pm.getProducts()
    res.json(allProducts)
    }
})



app.get('/products/:pid',async (req,res)=>{
        const idProduct= parseInt(req.params['pid'])
        const pBuscado = await Pm.getProductsById(idProduct)
    //const buscado = profes.find(p=> p.id === idProfe)
        if(pBuscado){
            res.json(pBuscado)
        }else{
            res.json({error: 'ocurrio un error'})
        }
        
    
        })


app.listen(8080,()=>{
    console.log('conectado al puerto 8080')
})
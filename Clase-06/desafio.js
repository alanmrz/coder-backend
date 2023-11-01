const {promises: fs} = require('fs')

class Producto{
    constructor({title,description,price,thumbnail,code,stock},id){
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock=stock
        this.id = id
    }
}

class ProductManager{
    
    static id= 0
    #products


    constructor({ruta}){
        this.path = ruta   
        this.#products = []
       
    }

    async init(){
        try {
          await  this.#readProducts()

        } catch (error) {
            await this.#writeProducts()
        }
        if(this.#products.length===0){
        }
        else{
            ProductManager.id= this.#products.at(-1).id
        }
        
    }

    addProduct(title,description,price,thumbnail,code,stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return console.log("Un dato esta vacio o incorrecto")
        }
        if(this.#products.find(el=> el.code==code)){
            return console.log('Ya existe un elemento con ese codigo')
        }
    const product= new Producto({title,description,price,thumbnail,code,stock},++ProductManager.id)
    this.#products.push(product)
    this.#writeProducts()
    }

    async getProducts(){
        await this.#readProducts()
        return console.log(this.#products)
    }

    
    async getProductsById(value){
        
        await this.#readProducts()
        const producto = this.#products.find(el=> el.id==value)
        if(producto){
            return console.log(producto)
        }
        else{
            console.log('Not found')
        }
    }
    
    async deleteProduct(id){
        const index = this.#products.findIndex((e)=> e.id ===id)
        
        if(index!= -1){
            this.#products.splice(index,1)
            this.#writeProducts()
        }
        else{
            console.log('El producto no existe')
        }
    }
    
    async updateProducts(id,title,description,price,thumbnail,code,stock){
        const index = this.#products.findIndex((e)=> e.id ===id)
        if(index!=-1){
            const product= new Producto({title,description,price,thumbnail,code,stock},id)
            this.#products[index] = product
            this.#writeProducts()
        }
        else{
            console.log('El producto no existe')
        }
    }
    
    async #readProducts(){
        const productos = await fs.readFile(this.path, 'utf-8')
        this.#products = JSON.parse(productos)
    }
    async #writeProducts(){
        await fs.writeFile(this.path, JSON.stringify(this.#products))
        
    }
}

async function main(){
let test = new ProductManager({ruta: 'productos.json'})
await test.init()
await test.addProduct(1,1,1,1,21,1)
//test.addProduct(2,2,2,2,2,2)
//test.deleteProduct(99)
await test.getProducts()
//test.getProductsById(1)

}
main()
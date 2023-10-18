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
    
        static #products = []
        static id= 0
  
    addProduct(title,description,price,thumbnail,code,stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return console.log("Un dato esta vacio o incorrecto")
        }
        if(ProductManager.#products.find(el=> el.code==code)){
            return console.log('Ya existe un elemento con ese codigo')
        }
    let product= new Producto({title,description,price,thumbnail,code,stock},ProductManager.id++)
        ProductManager.#products.push(product)
    }

    get getProducts(){
        return ProductManager.#products
    }

    getProductsById(value){

        const producto = ProductManager.#products.find(el=> el.id==value)
        if(producto){
        return console.log(producto)
        }
        else{
            console.log('Not found')
        }
    }
}


let test = new ProductManager()
console.log(test.getProducts)
test.addProduct('a','a','a','a','a','a')
let test2 = new ProductManager()
test2.addProduct('a1','a1','a1','a1','a1','a1')
//console.log(test.getProducts)
test.getProductsById(1)
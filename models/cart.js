const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)
// no need to use constructor for cart, not for every new product we need a new cart, there always will be a cart in app.
module.exports = class Cart{
    static addProduct(id, productPrice) {
     // fetch the previous cart, analyze it, find existing product, add new product/ increase quantity
     fs.readFile(p, (err, fileContent)=>{
        let cart = { products: [], totalPrice: 0};
        if(!err){
            //if we dont have an error so I know I have an existing cart.
            cart = JSON.parse(fileContent);
        }
        // Analyze the cart => find existing product
        const existingProductIndex = cart.products.findIndex(x => x.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProducts;
        if(existingProduct) {
            updatedProducts = {...existingProduct};
            updatedProducts.qty = updatedProducts.qty + 1;
            cart.products = [...cart.products]; // do not add updated product as already exists
            cart.products[existingProductIndex] = updatedProducts;
        } else {
            updatedProducts = {id : id, qty: 1};
            cart.products = [...cart.products, updatedProducts];
        }
        cart.totalPrice = cart.totalPrice + productPrice;
        //where to write =p = path, what to write = cart
        fs.writeFile(p, JSON.stringify(cart), (err) => {
            console.log(err);
        })
     });

    }
}
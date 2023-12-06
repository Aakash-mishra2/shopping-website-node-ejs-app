const fs = require('fs');
const path = require('path');

const p = path.json(
    path.dirname(process.mainModule.fileName),
    'data',
    'cart.json'
)
// no need to use constructor for cart, not for every new product we need a new cart, there always will be a cart in app.
module.exports = class Cart{
    static addProduct(id) {
     // fetch the previous cart, analyze it, find existing product, add new product/ increase quantity
     fs.readFile(p, (err, fileContent)=>{
        let cart = { products: [], totalPrice: 0};
        if(!err){
            //if we dont have an error so I know I have an existing cart.
            cart = JSON.parse(fileContent);
        }
        // Analyze the cart => find existing product
        const existingProduct = cart.products.find(x => x.id === id);
        let updatedProducts;
        if(existingProduct) {
            updatedProducts = {...existingProduct};
            updatedProducts.qty = updatedProducts.qty + 1;
        }
     })

    }
}
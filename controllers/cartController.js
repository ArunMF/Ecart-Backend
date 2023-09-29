// import carts model
const carts = require('../models/cartSchema');

// add to cart collection
exports.addToCart= async(req,res)=>{
    // get products details from the request
    const {id,title,price,image,quantity} = req.body

    // logic - 
    try{
        // check if the product is already in cart
        const products= await carts.findOne({id})
        if (products) {
            // product is present in cart, update the quantity and price accordingly
            products.quantity+=1

            // Update the grand total 
            products.grandTotal=products.price*products.quantity

            // Save changes to the db
            products.save()

            // Send response back to the client
            res.status(200).json("Product details updated.")
        }
        else{
            // product does not present in the cart, Add product to cart
            const newProduct = new carts({
                id,title,price,image,quantity,grandTotal:price
            })
            
            // Save new product details
            newProduct.save()

            // Send response back to client 
            res.status(200).json("Product added successfully.")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

// Get cart products
exports.getCart= async(req,res)=>{
    try{
        const allCarts = await carts.find()
        res.status(200).json(allCarts)
    }
    catch(error){
        res.status(404).json(error)
    }
}

// delete a particular item from cart
exports.deleteCartProduct= async (req,res)=>{
    // logic
    // get id from request
    const {id}=req.params;
    try{
        const removeProduct = await carts.deleteOne({id})
        // get remaining all cart products after deleting particular product
        if (removeProduct) {
            const allCarts = await carts.find()
            res.status(200).json(allCarts)
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

// Increment the cart product count
exports.incrementProductCount = async (req,res)=>{
    // Find product id
    const {id}= req.params

    // If the product is already in the cart then quantity will be incremented by 1
        // then update the grand total
    try{
        const product = await carts.findOne({id})
        if (product) {
            product.quantity+=1;
            product.grandTotal=product.price*product.quantity
            // Save changes to the db
            await product.save();
            // after the product has been saved , update the content into the client side
            const allCart= await carts.find()
            res.status(200).json(allCart)
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

// decrement the cart product count
exports.decrementProductCount = async (req,res)=>{
    // Find product id
    const {id}= req.params

    // If the product is already in the cart then quantity will be decremented by 1
        // then update the grand total
    try{
        const product = await carts.findOne({id})
        if (product) {
            product.quantity-=1;
            if (product.quantity==0) {
                // remove the product from the cart
                const removeProduct = await carts.deleteOne({id})
                // remaining products will be send back to client
                const allCart= await carts.find()
                res.status(200).json(allCart)
            } 
            else {    
                // Update the grand total
                product.grandTotal = product.price * product.quantity
                // Save changes to the db
                await product.save();
                // after the product has been saved , update the content into the client side
                const allCart = await carts.find()
                res.status(200).json(allCart)
            }
            
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}
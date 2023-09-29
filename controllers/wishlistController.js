// logic for wishlistSchema
// import wishlists from model
const wishlists = require('../models/wishlistSchema')

// logic for add wishlist
exports.addToWishlist=async(req,res)=>{
    // get product details
    // Destructuring
    const {id,title,price,image}= req.body;
    // logic
    try{
        // check if product is already available in wishlist
    const item = await wishlists.findOne({id})
    if (item) {
        res.status(403).json("Product is already available in wishlists")
    } else {
        // Add a new project in the wishlists
        const newProduct = new wishlists({id, title, price, image})
        // To store the new product in the wishlists
        await newProduct.save();
        // Send response back to the client
        res.status(200).json("Product added successfully.")
    }
    }

    catch(error){
        res.status(401).json(error)
    }
}

// get all wishlists products
exports.getWishlistItems=async(req,res)=>{
    // logic
    try{
        const allWishlist = await wishlists.find()
        res.status(200).json(allWishlist) // wishlist products details
    }
    catch(error){
        res.status(404).json(error) // error msg send back to client
    }
} 

// delete a particular item from wishlist
exports.deleteProduct= async(req,res)=>{
    // logic
    // get id from request
    const {id}=req.params
    try{
        const removeProduct = await wishlists.deleteOne({id})
        // get remaining all wishlist products after deleting particular product
        if(removeProduct){
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}
// To define routes for client requests

// 1. import express
const express = require('express')

// 4. import product controller
const ProductController = require('../controllers/productController')
const WishlistController = require('../controllers/wishlistController')
const CartController = require('../controllers/cartController')

// 2. using express create object for Router class inorder to setup path
const router = new express.Router()

// 3. Use router object to resolve client request
    // get all products api request
    router.get('/products/all-products',ProductController.getAllProducts)

    // get a particular product details
    router.get('/products/view-product/:id',ProductController.viewProduct)

    // add new product to wishlist
    router.post('/wishlists/add-to-wishlist',WishlistController.addToWishlist)

    // View all wishlist products
    router.get('/wishlists/view-all-wishlist',WishlistController.getWishlistItems)

    // Delete a particular item from wishlist
    router.delete('/wishlists/delete-wishlist-product/:id',WishlistController.deleteProduct)

    // Add to cart
    router.post('/carts/add-to-cart',CartController.addToCart)

    // Get cart products
    router.get('/carts/view-all-carts',CartController.getCart)

    // Delete a particular item from cart
    router.delete('/carts/delete-product/:id',CartController.deleteCartProduct)

    // Increment cart quantity
    router.get('/carts/increment-product/:id',CartController.incrementProductCount)

    // decrement cart quantity
    router.get('/carts/decrement-product/:id',CartController.decrementProductCount)

    // 5. export routes
    module.exports=router
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const products = useLoaderData();
    const [cart, setCart] = useState([]);
    
    const clearCart =()=>{
        setCart([]);
        deleteShoppingCart();
    };

    useEffect(()=>{
        const storedCart = getStoredCart()
        const saveCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product=> product.id ===id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct)
                
            }
        }
        setCart(saveCart);
    },[products])
    
    const handleAddToCard = (selectedProduct) =>{
        const exists  = cart.find(product=> product.id === selectedProduct.id);
        let newCart = [];
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    }
    return (
        <div className='shop-container'>
            <div className="products-part">
                {
                    products.map(product => <Product 
                        key = {product.id}
                        product = {product}
                        handleAddToCard = {handleAddToCard}
                    ></Product>)
                }
            </div>
            <div className="order-part">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/orders'><button>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
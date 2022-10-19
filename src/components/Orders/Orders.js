import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import ReViewItems from '../reviewitems/ReViewItems';

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    const [cart , setCart] =useState(initialCart);
    const handleRemoveItems= (id)=>{
        const removeItems = cart.filter(product=> product.id !== id);
        setCart(removeItems);
        removeFromDb(id);
    }

    const clearCart =()=>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className='product-parts'>
                {
                    cart.map(product =><ReViewItems 
                        key={product.id} 
                        product={product}
                        handleRemoveItems={handleRemoveItems}
                    ></ReViewItems>)
                }
                {
                    cart.length === 0 && <h3>No More Review.. Pleaze click <Link to='/'>Shop More</Link> </h3>
                }
            </div>
            <div className='order-part'>
                <Cart clearCart={clearCart} cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Orders;
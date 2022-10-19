import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const { cart, clearCart , children}= props;
    // console.log(cart)
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    };
    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = (total + shipping + tax).toFixed(2)
    return (
        <div className='cart'>
            <h2 style={{textAlign:'center'}}>Order list</h2>
            <h4>Selected Items: {quantity}</h4>
            <h4>Total Price: ${total}</h4>
            <h4>Total Shipping Charge: ${shipping}</h4>
            <h4>Tax: ${tax}</h4>
            <h3>Grand Total: ${grandTotal}</h3>
            <button onClick={clearCart}>Clear cart</button>
            <br />
            {children}
        </div>
    );
};

export default Cart;
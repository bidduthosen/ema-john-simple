import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import './Shop.css'


/*
count : loaded 
par-page (size): 10
pages : count/ par page
current page: page
*/ 


const Shop = () => {
    // const {products, count} = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10)

    const pages = Math.ceil(count / size);
    console.log(pages)

    useEffect(()=>{
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        fetch(url)
            .then(res => res.json())
            .then(data =>{
                setCount(data.count);
                setProducts(data.products);
            })
    },[page, size])


    
    const clearCart =()=>{
        setCart([]);
        deleteShoppingCart();
    };

    useEffect(()=>{
        const storedCart = getStoredCart()
        const saveCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product=> product._id ===id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct)
                
            }
        }
        setCart(saveCart);
    },[products])
    
    const handleAddToCard = (selectedProduct) =>{
        const exists  = cart.find(product=> product._id === selectedProduct._id);
        let newCart = [];
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct._id);
    }
    return (
        <div className='shop-container'>
            <div className="products-part">
                {
                    products.map(product => <Product 
                        key = {product._id}
                        product = {product}
                        handleAddToCard = {handleAddToCard}
                    ></Product>)
                }
            </div>
            <div className="order-part">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/orders'><button>Review Orders</button></Link>
                </Cart>
            </div>
            <div className='pagination-container'>
                <p>Currently Selected Page: {page + 1} and Size: {size}</p>
                <div className='pagination'>
                    {
                        [...Array(pages).keys()].map(number=> <button 
                            key={number}
                            className={number === page && "selected"}
                            onClick={()=>setPage(number)}
                            >{number + 1}</button>)
                    }
                    <select onClick={event => setSize(event.target.value)} className='select-option'>
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Shop;
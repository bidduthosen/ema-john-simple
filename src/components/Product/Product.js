import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css'

const Product = ({handleAddToCard, product}) => {
    // const {handleAddToCard, product} = props;
    // console.log(props)
    const {img, name, price, seller, ratings}= product;
    
    return (
        <div className="product">
            <img src={img} alt="" ></img>
            <div className='product-info'>
                <h3>{name}</h3>
                <h4>Price: ${price}</h4>
                <p>Manufacturer: {seller}</p>
                <p>Rating: {ratings}</p>
            </div>
            <button onClick={() => handleAddToCard(product)} className='btn-cat'><p className='ft-icon'>Add to Cart</p>
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></button>
        </div>
    );
};

export default Product;
import { getStoredCart } from "../utilities/fakedb";

export const ProductAndCardDLoader = async()=>{
    const productData = await fetch('http://localhost:5000/products');
    const {products} = await productData.json();

    // card 
    const saveCart = getStoredCart();
    let initialCart =[];
    for(const id in saveCart){
        const addedProduct = products.find(product=> product._id === id);
        if(addedProduct){
            const quantity =saveCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }
    return {products, initialCart};
}
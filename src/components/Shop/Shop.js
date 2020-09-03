import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [products , setProducts] = useState(first10);
    const [ cart , setCart]=useState([]);
     
    useEffect(() => {
        const getData = getDatabaseCart();
        const productKeys = Object.keys(getData);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd =>pd.key === key);
            console.log(product);
            product.quantity = getData[key];
             return product;
        })
        
        setCart(cartProducts);
    },[])

    const handleAddProduct = (product) =>{
        let newCart=[...cart , product];
        const sameProduct = cart.find(key => product.key === key.key);
        let count = 1;
        if(sameProduct){
           count = sameProduct.quantity + 1;
           sameProduct.quantity = count;
           const others = newCart.filter(pd => pd.key !== product.key);
           newCart=[...others , sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart , product];
        }
        //const count= sameProduct.length;
        setCart(newCart);
        addToDatabaseCart(product.key , count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => 
                    <Product
                    showcart={true}
                    handleAddProduct={handleAddProduct}
                     product={pd}
                    ></Product>)
                }
            </div> 
            <center>
            <div className="cart-container">
                 <Cart cart={cart}>
                 <Link to="/review">
                    <button className= "main-button" >
                        Review Item 
                    </button>
                 </Link>
                 </Cart>
            </div> 
            </center> 
        </div>
    );
};

export default Shop;
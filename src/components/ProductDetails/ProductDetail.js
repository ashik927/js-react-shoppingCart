import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const ProductDetail = () => {
    const {productkey} = useParams();
    const product = fakeData.find(pd=>pd.key === productkey);
    
    return (
        <div className="shop-container">
            <div className="product-container">
           <Product 
            product={product}
            showcart={false}
            >
           </Product>
           </div>
           {/* <div className="cart-container"
                <Cart cart={cart}></Cart>
           </div> */}
        </div>
    );
};

export default ProductDetail;
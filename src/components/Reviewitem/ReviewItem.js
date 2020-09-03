import React from 'react';
import Product from '../Product/Product';

const ReviewItem = (props) => {
    console.log(props);
    const {img, name ,seller, price  ,key ,quantity} = props.pd;
    return (
        // <Product product={props.pd}> </Product>
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p> <small> by: {seller} </small> </p>
                <p>${price}</p>
                <br/>
                <p> <small> Total Quantity : {quantity}  </small> </p>

                <button className="main-button" onClick={()=>{props.removeItem(key)}}>
                        Remove
                </button>
            </div>
            
        </div>
    );
};

export default ReviewItem;
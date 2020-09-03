import React from 'react';


const Cart = (props) => {
    const cart=props.cart;
    const total= cart.reduce((total, prd)=>total+prd.price*prd.quantity,0);
    let shipping=0;
    if(total>35){
        shipping=0;
    }
    else if(total>15){
        shipping=4.99;
    }
    else if(total>0){
        shipping=12.99;
    }
    const tax=(total/10).toFixed(2);
    const grandTotal=total + shipping + Number(tax);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered : {cart.length}</p>
            <p> <small>Shippng Cost : {shipping}</small> </p>
            <p> <small>Tax Cost : {tax}</small> </p>
            <p> Total Price :{grandTotal} </p>
            {
                props.children

            }
        </div>
    );
};

export default Cart;
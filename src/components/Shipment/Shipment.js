import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data =>{
        console.log(data);
    }

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.name && <span className="error">name is required</span>}
<br/>
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
        {errors.email && <span className="error">email is required</span>}
<br/>
        <input name="address" defaultValue={loggedInUser.address} ref={register({ required: true })} />
        {errors.address && <span className="error">address is required</span>}
<br/>
        <input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} />
        {errors.phone && <span className="error">phone is required</span>}
        
        <input type="submit" />
        </form>
    );
};

export default Shipment;
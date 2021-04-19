import React from 'react'
import { useCart } from '../../cart-context/CartContext'
import Nav from '../Nav'

function Cart() {
    const {state,dispatch} = useCart();
    const {cart} = state;
    return (
        <>
        <Nav/>
            {/* {cart.map(item=>{console.log(item)})} */}
        </>
    )
}

export default Cart

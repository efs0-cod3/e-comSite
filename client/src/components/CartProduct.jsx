import React from 'react'

const CartProducts = ({url,pName,desc,handleDeleteFromCart}) => {

  return (
    <div className='cart_product_container'>
      <button className='del_product' onClick={handleDeleteFromCart}>X</button>
        <img src={url}/>
        <h3>{pName}</h3>
        <p>{desc}</p>
        <div>
        <input type='number' defaultValue={1}/>
        </div>
    </div>
  )
}

export default CartProducts
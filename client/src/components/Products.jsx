import React from 'react'

const Products = ({url,pName,desc, handleAddToCart}) => {

  return (
    <div className='product_container'>
        <img src={url}/>
        <h3>{pName}</h3>
        <p>{desc}</p>
        <div>
            <button onClick={handleAddToCart}>Add to cart</button>
        </div>
    </div>
  )
}

export default Products
import React, { useEffect, useState } from 'react'
import SingleProduct from './single-product'

const AllProduct = () => {
    let [allProduct,setAllProduct]=useState('')

    useEffect(()=>{
        fetch('http://localhost:5000/product/all',{
            method:'GET'
        }).then(res=>res.json())
        .then(data=>setAllProduct(data.allProduct))
    },[])
    return (
        <div className='all-product'>
            {allProduct && allProduct.map((sig,index)=> <SingleProduct img={sig.img[0].src} qty={sig.qty} price={sig.price} id={sig._id} name={sig.title}/>)}
        </div>
    )
}

export default AllProduct;

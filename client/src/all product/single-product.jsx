import React from 'react'
import { Link } from 'react-router-dom'
import './all-product.css'
const SingleProduct = ({img,name,price,qty,id}) => {
    return (
        <div className='single-product'>
            <table style={{fontSize:'2rem'}} class="table caption-top">
                <caption>All Products</caption>
                <thead>
                     <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th style={{textAlign:'center'}}>Action</th>
                    </tr>
                </thead>

                <tbody style={{backgroundColor:'#a5f7ad'}}>
                        <tr>
                        <td><img style={{width:'77px'}} src={img} alt="" /></td>
                        <td>{name}</td>
                        <td>{price}</td>
                        <td>{qty}</td>
                        <td style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                            <Link to={`/dasboard/product/edit/${id}`}>
                            <button className='btn btn-outline-success m-3'>Edit</button>
                            </Link>
                            <button className='btn btn-outline-danger'>Delete</button>

                        </td>
                        </tr>
                      
                </tbody>
            </table>
        
        </div>
    )
}

export default SingleProduct;

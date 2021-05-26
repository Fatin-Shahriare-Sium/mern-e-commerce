import React from 'react'
import './add-product.css'
import upload from '../assets/upload.svg'
const AddProduct = () => {
    return (
        <div className='addProduct'>
            <p style={{textAlign:'center',fontSize:'2rem',color:'#000000'}}>Add Product</p>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    <textarea  class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Price</label>
                    <input  class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Price off</label>
                    <input  class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Quantity</label>
                    <input  class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Brands</label>
                    <select>
                        <option value='apple'>Apple</option>
                        <option value='xiaomi'>Xiaomi</option>
                        <option value='realme'>Realme</option>
                        <option value='easy'>Easy Fashion</option>
                    </select>
                </div>
                <div class="mb-3 uploadImg">
                    <div className="uploadImg-btn">
                    <img src={upload} alt="" />
                    <input type="file" />
                    <p style={{fontSize:'2rem',color:'#000000',fontWeight:'700',paddingLeft:'7px'}}>Upload Image</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;

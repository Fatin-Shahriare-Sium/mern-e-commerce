import React, { useState } from 'react'
import './add-product.css'
import upload from '../assets/upload.svg'
import ImgUploaderPreview from './img-uploader-preview'
import useCreateProduct from '../hooks/useCreateProduct'
const AddProduct = () => {
    let [imgContainer,setImgContainer]=useState([])
    let {handleCreateProduct}=useCreateProduct()
    //cd backend/mern-cart
    let handleImgUploader=(e)=>{
        e.preventDefault()
        let picx=e.target.files[0]
        const data = new FormData();
        data.append('file',picx)
        data.append('upload_preset', 'taskman');
        fetch('https://api.Cloudinary.com/v1_1/sium/image/upload',{
            method:'POST',
            body:data
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data)
            let id=data.asset_id
            let src=data.url
            let alt=''
            let imgObj={
                id,
                src,
                alt
            }
            setImgContainer(()=>[...imgContainer,imgObj])
        })
        
        
    }

    let altHandler=(e,id)=>{
        e.preventDefault()
        let preImgContainer=[...imgContainer]
        let indexOFimg=preImgContainer.findIndex(sig=>sig.id==id)
        preImgContainer[indexOFimg].alt=e.target.value

        console.log(preImgContainer);
        setImgContainer(()=>preImgContainer)
    }

    let deleteHandler=(id)=>{
        let filterImgContainer=imgContainer.filter(sig=>sig.id !== id)
        setImgContainer(()=>filterImgContainer)
    }
    return (
        <div className='addProduct'>
            <p style={{textAlign:'center',fontSize:'2.3rem',color:'#000000',fontWeight:'700'}}>Add Product</p>
            <form onSubmit={(event)=>handleCreateProduct(event)}>
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
                    <input onChange={(event)=>handleImgUploader(event)} type="file" />
                    <p style={{fontSize:'2rem',color:'#000000',fontWeight:'700',paddingLeft:'7px'}}>Upload Image</p>
                    </div>
                    <div className="uploadImg-container">
                        {imgContainer && imgContainer.map((sig,index)=> <ImgUploaderPreview key={index} deleteHandler={deleteHandler} id={sig.id} altHandler={altHandler} src={sig.src} alt={sig.alt}/>)}
                        
                    </div>
                </div>
                <button type="submit" style={{fontSize:'2rem'}} className='btn btn-outline-dark my-5'>Create Product</button>
            </form>
        </div>
    )
}

export default AddProduct;

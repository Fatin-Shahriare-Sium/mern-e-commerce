import React, { useEffect, useState } from 'react'
import './add-product.css'
import upload from '../assets/upload.svg'
import ImgUploaderPreview from './img-uploader-preview'
import useCreateProduct from '../hooks/useCreateProduct'
import { useLocation, useParams } from 'react-router'
import TextEditor from '../editor/text-editor'


const AddProduct = () => {
    let [imgContainer, setImgContainer] = useState([])
    let [edit, setEdit] = useState(false)
    let { handleCreateProduct, error, loading } = useCreateProduct()
    let [preview, setPreview] = useState(false)
    //cd backend/mern-cart
    let location = useLocation()
    let { id } = useParams()
    useEffect(() => {
        let name = document.getElementById('name')
        let price = document.getElementById('price')
        let priceoff = document.getElementById('priceoff')
        let qty = document.getElementById('qty')
        let brand = document.getElementById('brand')
        let category = document.getElementById('category')
        localStorage.setItem('__description', '')
        if (location.pathname == `/dasboard/product/edit/${id}`) {
            console.log('in location' + id);
            fetch(`http://localhost:5000/product/${id}`, {
                method: 'GET'
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    name.value = data.singleProduct.title
                    localStorage.setItem('__description', data.singleProduct.description)
                    price.value = data.singleProduct.price
                    priceoff.value = data.singleProduct.priceOff
                    qty.value = data.singleProduct.remain
                    // qty.value = 100
                    brand.value = data.singleProduct.brand
                    category.value = data.singleProduct.category
                    setEdit(true)
                    setImgContainer(data.singleProduct.img)
                })
        }

    }, [])


    let handleImgUploader = (e) => {
        e.preventDefault()
        let picx = e.target.files[0]
        const data = new FormData();
        data.append('file', picx)
        data.append('upload_preset', 'taskman');
        fetch('https://api.Cloudinary.com/v1_1/sium/image/upload', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
                let id = data.asset_id
                let src = data.url
                let alt = ''
                let imgObj = {
                    id,
                    src,
                    alt
                }
                setImgContainer(() => [...imgContainer, imgObj])
            })


    }

    let altHandler = (e, id) => {
        e.preventDefault()
        let preImgContainer = [...imgContainer]
        let indexOFimg = preImgContainer.findIndex(sig => sig.id == id)
        preImgContainer[indexOFimg].alt = e.target.value

        console.log(preImgContainer);
        setImgContainer(() => preImgContainer)
    }

    let deleteHandler = (id) => {
        let filterImgContainer = imgContainer.filter(sig => sig.id !== id)
        setImgContainer(() => filterImgContainer)
    }

    // onSubmit={(event) => handleCreateProduct(event, imgContainer, edit, id)}
    return (
        <div className='addProduct'>
            <p style={{ textAlign: 'center', fontSize: '2.3rem', color: '#000000', fontWeight: '700' }}>Add Product</p>
            {error && <p classname={`alert alert-${error.color}`}>{error.msg}</p>}
            <form onSubmit={(event) => handleCreateProduct(event, imgContainer, edit, id)}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Title</label>
                    <input type="text" class="form-control" id='name' aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    {/* <textarea class="form-control" id='description' /> */}
                    <TextEditor needToPreview={preview} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Price</label>
                    <input id='price' class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Price off</label>
                    <input id='priceoff' class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Quantity</label>
                    <input id='qty' class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Brands</label>
                    <select id='brand'>
                        <option value='apple'>Apple</option>
                        <option value='xiaomi'>Xiaomi</option>
                        <option value='realme'>Realme</option>
                        <option value='asus'>Asus</option>
                        <option value='intel'>Intel</option>
                        <option value='acer'>Acer</option>
                        <option value='lenovo'>Lenovo</option>
                        <option value='hero'>Hero</option>
                        <option value='tvs'>TVS</option>
                        <option value="samsung">Samsung</option>
                        <option value='naviforce'>naviforce [watch]</option>
                        <option value="walton">Walton</option>
                        <option value='easy'>Easy Fashion</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Category</label>
                    <select id='category'>
                        <option value='desktop'>Desktop</option>
                        <option value='laptop'>Laptop</option>
                        <option value='watch'>Watch</option>
                        <option value='motor bike'>Motor Bike</option>
                        <option value='smart phone'>Smart Phone</option>
                        <option value="tv">Smart tv & Android Tv</option>
                        <option value="ac">Smart AC</option>
                    </select>
                </div>
                <div class="mb-3 uploadImg">
                    <div className="uploadImg-btn">
                        <img src={upload} alt="" />
                        <input onChange={(event) => handleImgUploader(event)} type="file" />
                        <p style={{ fontSize: '2rem', color: '#000000', fontWeight: '700', paddingLeft: '7px' }}>Upload Image</p>
                    </div>
                    <div className="uploadImg-container">
                        {imgContainer && imgContainer.map((sig, index) => <ImgUploaderPreview key={index} deleteHandler={deleteHandler} id={sig.id} altHandler={altHandler} src={sig.src} alt={sig.alt} />)}

                    </div>
                </div>
                <button onClick={() => setPreview(pre => true)} type="submit" style={{ fontSize: '2rem' }} className='btn btn-outline-dark my-5'>{loading ? 'loading...' : 'Create Product'}</button>

            </form>
        </div>
    )
}

export default AddProduct;

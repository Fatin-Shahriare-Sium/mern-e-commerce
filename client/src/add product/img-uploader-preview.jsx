import React, { useEffect } from 'react'
import './add-product.css'
import login from '../assets/login.svg'
const ImgUploaderPreview = ({src,alt,altHandler,id,deleteHandler}) => {
    useEffect(()=>{
        let altx=document.getElementById('alt')
        altx.value=alt
    },[])
    return (
        <div className='img-preview'>
            <img style={{width:'107px'}} src={src} alt="" />
            <div className="img-preview__alt">
                <label>Alt</label>
            <input key={id} onChange={(event)=>altHandler(event,id)} id='alt'  type="text" placeholder='alt' />
            </div>
            <button onClick={()=>deleteHandler(id)} type='button' className='btn btn-outline-danger'>Delete</button>
        </div>
    )
}

export default ImgUploaderPreview;

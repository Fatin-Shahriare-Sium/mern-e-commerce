import { useState } from "react"


let useCreateProduct=()=>{
    let[error,setError]=useState('')
    let handleCreateProduct=(e,imgContainer,edit,id)=>{
        e.preventDefault()
        let title=e.target[0].value
        let description=e.target[1].value
        let price=e.target[2].value
        let priceOff=e.target[3].value
        let qty=e.target[4].value
        let brand=e.target[5].value
        let category=e.target[6].value

        if(title && description && price){
            fetch(edit?`http://localhost:5000/product/edit/${id}`:'http://localhost:5000/product/create',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    title,
                    description,
                    price,
                    priceOff,
                    qty,
                    brand,
                    category,
                    img:imgContainer
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data);
                setError({msg:data.msg,color:data.color})
            })
        }
    }

    return {handleCreateProduct,error}
}

export default useCreateProduct;
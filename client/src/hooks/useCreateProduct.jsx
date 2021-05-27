

let useCreateProduct=()=>{

    let handleCreateProduct=(e,imgContainer)=>{
        e.preventDefault()
        let title=e.target[0].value
        let description=e.target[1].value
        let price=e.target[2].value
        let priceOff=e.target[3].value
        let qty=e.target[4].value
        let brand=e.target[5].value
        console.log(title);
        if(title && description && price){
            fetch('http://localhost:5000/product/create',{
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
                    // img:imgContainer
                })
            }).then(res=>res.json())
            .then(data=>console.log(data))
        }
    }

    return {handleCreateProduct}
}

export default useCreateProduct;
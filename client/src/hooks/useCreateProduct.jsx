import { useState } from "react"
import UseUrl from "./useUrl"


let useCreateProduct = () => {
    let [error, setError] = useState('')
    let [loading, setLodaing] = useState(false)
    let { url } = UseUrl()

    let handleCreateProduct = (e, imgContainer, edit, id) => {
        e.preventDefault()
        console.log(e);
        setLodaing(true)
        let title = e.target[0].value
        let description = localStorage.getItem('__description')
        let price = e.target[1].value
        console.log('description', description);
        let priceOff = e.target[2].value
        let qty = e.target[3].value
        let brand = e.target[4].value
        let category = e.target[5].value

        if (title && description && price) {
            fetch(edit ? `${url}/product/edit/${id}` : `${url}/product/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    priceOff,
                    qty,
                    brand,
                    category,
                    img: imgContainer
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setLodaing(false)
                    setError({ msg: data.msg, color: data.color })
                })
        }
    }

    return { handleCreateProduct, error, loading }
}

export default useCreateProduct;
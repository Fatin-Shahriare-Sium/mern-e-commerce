import { useState } from "react"
import UseUrl from "./useUrl"


let useCreateProduct = () => {
    let [error, setError] = useState('')
    let [loading, setLodaing] = useState(false)
    let { url } = UseUrl()

    let handleCreateProduct = (e, imgContainer, edit, id, editorData) => {
        e.preventDefault()
        console.log('editorData', editorData);

        let title = e.target[0].value
        let description = editorData.html
        let price = e.target[8].value
        let priceOff = e.target[9].value
        let qty = e.target[10].value
        let brand = e.target[11].value
        let category = e.target[12].value
        console.log('description', price);
        if (title && description && price) {
            setLodaing(true)
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
                    img: imgContainer,
                    editorBlocks: editorData.dataOfBlocks
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
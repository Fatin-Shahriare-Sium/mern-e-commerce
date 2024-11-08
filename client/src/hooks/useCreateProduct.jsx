import { useState } from "react";
import UseUrl from "./useUrl";

let useCreateProduct = () => {
  let [error, setError] = useState("");
  let { url } = UseUrl();

  let handleCreateProduct = (e, imgContainer, edit, id) => {
    console.log(e);
    e.preventDefault();

    let title = e.target[0].value;
    let description = localStorage.getItem("__description");
    let price = Number(e.target[27].value);
    let priceOff = e.target[28].value;
    let qty = e.target[29].value;
    let brand = e.target[30].value;
    let category = e.target[31].value;

    if (title && description && price) {
      fetch(edit ? `${url}/product/edit/${id}` : `${url}/product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setError({ msg: data.msg, color: data.color });
        });
    }
  };

  return { handleCreateProduct, error };
};

export default useCreateProduct;

import React from 'react'
import { createContext, useState } from 'react'
export const ProductContext = createContext();
function ProductContextProvider({ children }) {
    const [filterProduct, setFilterProduct] = useState([])
    const [product, setProduct] = useState([])
    const handleChangeInput = (event) => {
        const { name, value } = event.target
        setEditProduct(prevState => ({
            ...prevState,
            [name]: value
        }))
    };
    const [editProduct, setEditProduct] = useState({
        img: '',
        name: '',
        price: '',
        discount: ''
    });
    return (
        <ProductContext.Provider value={{
            filterProduct,
            setFilterProduct,
            product,
            setProduct,
            editProduct,
            setEditProduct,
            handleChangeInput
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider

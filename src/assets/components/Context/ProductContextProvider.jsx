import React from 'react'
import PropTypes from 'prop-types';
import { createContext, useState } from 'react'
export const ProductContext = createContext();
function ProductContextProvider({ children }) {
    const [filterProduct, setFilterProduct] = useState([])
    const [product, setProduct] = useState([])
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
            setEditProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}
ProductContextProvider.propTypes = {
    children: PropTypes.node
}
export default ProductContextProvider

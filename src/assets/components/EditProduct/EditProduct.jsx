import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './EditProduct.css'
import axios from 'axios'
import { ProductContext } from '../Context/ProductContextProvider';
function EditProduct() {
    const { productId } = useParams();
    const { editProduct, setEditProduct } = useContext(ProductContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/Product/${productId}`, editProduct);
            window.location.href = '/product';
            console.log('response.data', response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setEditProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/Product/${productId}`);
            setEditProduct(response.data)
            console.log(response.data);

        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [productId]);
    return (
        <div>
            <div className='body_content'>
                <p className="content_desc">
                    <b>Important</b>
                    We have used an advance caching system. If you change anything in the admin panel, please, make sure to clear the cache from here. Setting

                    <button className="btn_close">
                        <AiOutlineCloseCircle />
                    </button>
                </p>
                <div className='editForm'>
                    <h4 className='Title'>
                        Edit Product Form
                    </h4>
                    <hr />
                    <form action="" className='FormInput'>
                        <label>Product Img</label>
                        <input name='img' className='TitleInput' value={editProduct.img} onChange={handleChangeInput} />
                        <div className='imgInput'>
                            <img style={{ width: `100%`, height: '100%' }} src={editProduct.img} alt="" />
                        </div>
                        <label>Product Name</label>
                        <input type="text" name='name' className='TitleInput' value={editProduct.name} onChange={handleChangeInput} />
                        <label>Price (VNĐ)</label>
                        <input type="number" name='price' className='TitleInput' value={editProduct.price} onChange={handleChangeInput} />
                        <label>Discount (%)</label>
                        <input type="number" name='discount' className='TitleInput' value={editProduct.discount} onChange={handleChangeInput} />
                        <button className='btn' onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct

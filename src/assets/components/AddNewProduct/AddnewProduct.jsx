import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
function AddnewProduct() {
    const [newProduct, setNewProduct] = useState({
        id: '',
        img: '',
        name: '',
        price: '',
        discount: ''
    })
    const handleChangeInput = (event) => {
        const { name, value } = event.target
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const HandleSubmit = async (event) => {
        event.preventDefault();
        const newProductId = {
            ...newProduct,
            id: uuidv4()
        }
        try {
            await axios.post(`http://localhost:3001/Product`, newProductId, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            window.location.href = '/product'
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
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
                    Category Form
                </h4>
                <hr />
                <form action="" className='FormInput'>
                    <label>Product Img</label>
                    <input name='img' className='TitleInput' value={newProduct.img} onChange={handleChangeInput} />
                    <div className='imgInput'>
                        <img style={{ width: `100%`, height: '100%' }} src={newProduct.img} alt="Ảnh thêm" />
                    </div>
                    <label>Product Name</label>
                    <input type="text" name='name' value={newProduct.name} className='TitleInput' onChange={handleChangeInput} />
                    <label>Price (VNĐ)</label>
                    <input type="number" name='price' value={newProduct.price} className='TitleInput' onChange={handleChangeInput} />
                    <label>Discount (%)</label>
                    <input type="number" name='discount' value={newProduct.discount} className='TitleInput' onChange={handleChangeInput} />
                    <button className='btn' onClick={HandleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddnewProduct

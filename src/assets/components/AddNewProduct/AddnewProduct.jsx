import axios from 'axios'
import { useState, useEffect } from 'react'
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
    const [formErrors, setFormErrors] = useState({
        img: '',
        name: '',
        price: '',
        discount: ''
    });
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newProduct.img) {
            errors.img = 'Hãy nhập đường dẫn ảnh sản phẩm.';
            isValid = false;
        }

        if (!newProduct.name) {
            errors.name = 'Hãy nhập tên sản phẩm.';
            isValid = false;
        }

        if (!newProduct.price) {
            errors.price = 'Hãy nhập giá sản phẩm.';
            isValid = false;
        } else if (isNaN(newProduct.price)) {
            errors.price = 'Giá sản phẩm phải là một số.';
            isValid = false;
        }

        if (!newProduct.discount) {
            errors.discount = 'Hãy nhập phần trăm giảm giá.';
            isValid = false;
        } else if (isNaN(newProduct.discount)) {
            errors.discount = 'Phần trăm giảm giá phải là một số.';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };
    const handleChangeInput = (event) => {
        const { name, value } = event.target
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }
    useEffect(() => {
        // Tính lại giá trị priceAfterDisCount sau khi price hoặc discount thay đổi
        const price = parseFloat(newProduct.price);
        const discount = parseFloat(newProduct.discount);
        const priceAfterDisCount = price * (1 - discount / 100);
        setNewProduct((prevState) => ({
            ...prevState,
            priceAfterDisCount,
        }));
    }, [newProduct.price, newProduct.discount]);
    const HandleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const newProductId = {
                ...newProduct,
                id: uuidv4()
            };

            try {
                await axios.post(`http://localhost:3001/Product`, newProductId, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                window.location.href = '/product';
            } catch (error) {
                console.log(error);
            }
        }
    };
    let priceAfterDisCount = newProduct.price * (1 - newProduct.discount / 100)
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
                    Add Product Form
                </h4>
                <hr />
                <form action="" className='FormInput'>
                    <label>Product Img</label>
                    <input name='img' className='TitleInput' value={newProduct.img} onChange={handleChangeInput} />
                    {formErrors.img && <span style={{ color: 'red' }} className="error">{formErrors.img}</span>}

                    <div className='imgInput'>
                        <img style={{ width: `100%`, height: '100%' }} src={newProduct.img} alt="Ảnh thêm" />
                    </div>

                    <label>Product Name</label>
                    <input type="text" name='name' value={newProduct.name} className='TitleInput' onChange={handleChangeInput} />
                    {formErrors.name && <span style={{ color: 'red' }} className="error">{formErrors.name}</span>}

                    <label>Price (VNĐ)</label>
                    <input type="number" name='price' value={newProduct.price} className='TitleInput' onChange={handleChangeInput} />
                    {formErrors.price && <span style={{ color: 'red' }} className="error">{formErrors.price}</span>}

                    <label>Discount (%)</label>
                    <input type="number" name='discount' value={newProduct.discount} className='TitleInput' onChange={handleChangeInput} />
                    {formErrors.discount && <span style={{ color: 'red' }} className="error">{formErrors.discount}</span>}
                    <input type="number" name='priceAfterDisCount' className='TitleInput' value={priceAfterDisCount} onChange={handleChangeInput} />
                    <button className='btn' onClick={HandleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddnewProduct

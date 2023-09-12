import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { ProductContext } from '../Context/ProductContextProvider';
import './ProductRender.css';
import { NavLink, useParams } from 'react-router-dom';
function ProductRender() {
    const { setProduct, setFilterProduct, filterProduct } = useContext(ProductContext);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Product');
            setProduct(response.data);
            setFilterProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/Product/${productId}`)
            fetchData();
            console.log(productId);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ backgroundColor: '#F4F6F9' }}>
            <table>
                <thead className='headerTable'>
                    <tr style={{ width: `100%` }}>
                        <th>Img</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Price After Discount</th>
                        <th>Edit Product</th>
                        <th>Delete Product</th>
                    </tr>
                </thead>
                <tbody>
                    {filterProduct.map((item) => (
                        <tr key={item.id}>
                            <td className='item'><img src={item.img} alt={item.name} className='productImg' /></td>
                            <td className='item'>{item.name}</td>
                            <td className='item'>{item.price === 'Liên hệ' ? 'Liên hệ' : `${parseInt(item.price).toLocaleString("vi-VN")}VNĐ`}</td>
                            <td className='item'>{item.discount !== 0 ? `${item.discount}%` : ''}</td>
                            <td className='item'>{`${parseInt(item.priceAfterDisCount).toLocaleString("vi-VN")}VNĐ`}</td>
                            <td className='item'><NavLink to={`/edit/${item.id}`} className='btn1'>Edit</NavLink></td>
                            <button onClick={() => { handleDelete(item.id) }} className='btn2'>Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default ProductRender;

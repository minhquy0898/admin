import MultiStep from 'react-multistep'
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
function Management() {
    const [activeStep, setActiveStep] = useState(0);
    const [filterCart, setFilterCart] = useState([])
    const username = Cookies.get('jwt')
    const HandleRenderOrder = async () => {
        const response = await axios.get(`http://localhost:3001/carts`)
        const filterCart = response.data
        setFilterCart(filterCart)
    }

    useEffect(() => {
        HandleRenderOrder()
    }, [activeStep])
    console.log(filterCart);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Đơn hàng của bạn</h2>
            {filterCart.map((cart, index) => (
                <div key={index} style={{ border: '1px solid', padding: 15, margin: '50px 0px' }}>
                    <h3>Người mua: {cart[cart.length - 1].username}</h3>
                    {cart.map((item) => (
                        <div key={item.id}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>Tên sản phẩm: {item.name}</div>
                                <div>SL: {item.quantity}</div>
                            </div>
                            {/* Các thông tin khác về sản phẩm */}
                        </div>
                    ))}
                    <MultiStep activeStep={activeStep}>
                        <h4 style={{ marginLeft: 100 }}>{cart[cart.length - 1].status}</h4>
                        <h4 style={{ marginLeft: 65 }}>{cart[cart.length - 1].status}</h4>
                        <h4 style={{ marginLeft: 120 }}>{cart[cart.length - 1].status}</h4>
                        <h4 style={{ marginLeft: 100 }}>{cart[cart.length - 1].status}</h4>
                    </MultiStep>
                </div>
            ))}

        </div>

    );
}

export default Management;

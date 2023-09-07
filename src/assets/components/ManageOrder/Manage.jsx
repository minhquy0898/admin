import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Steps, Panel, Placeholder, ButtonGroup, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { FiTablet } from 'react-icons/fi';
function Management() {
    const [step, setStep] = useState(0);

    const [orderStatus, setOrderStatus] = useState([]);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const handlePushServer = async () => {
        const title = ["Chờ xác nhận", "Đặt hàng thành công", "Chờ giao hàng", "Giao hàng thành công"][step];
        const newStatus = {
            id: "",
            status: title,
            username: Cookies.get("jwt"),
        };

        // Gửi trạng thái mới lên server
        await axios.put(`http://localhost:3001/carts`, newStatus);
    };
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    const [filterCart, setFilterCart] = useState([]);
    const username = Cookies.get('jwt')
    const HandleRenderOrder = async () => {
        const response = await axios.get(`http://localhost:3001/carts`)
        const filterCart = response.data
        setFilterCart(filterCart)
    }
    useEffect(() => {
        handlePushServer();
    }, [step]);

    useEffect(() => {
        HandleRenderOrder()
    }, [step])
    const test = [filterCart]
    console.log(test.flat());
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ marginTop: 50, marginLeft: 500 }}>Đơn hàng của bạn</h2>
            {filterCart.map((cart, index) => (
                <div key={index} style={{ border: '1px solid', padding: 15, margin: '50px 0px 0px 500px' }}>
                    <h3>Người mua: {cart[cart.length - 1].username}</h3>
                    {cart.map((item) => (
                        <div key={item.id}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>Tên sản phẩm: {item.name}</div>
                                <div>SL: {item.quantity}</div>

                            </div>
                        </div>
                    ))}
                    <div>
                        <Steps current={step}>
                            <Steps.Item title="Chờ xác nhận" />
                            <Steps.Item title="Đặt hàng thành công" />
                            <Steps.Item title="Chờ giao hàng" />
                            <Steps.Item title="Giao hàng thành công" />
                        </Steps>
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 3}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>
                    <button onClick={() => handlePushServer()}>Submit to Server</button>
                </div>
            ))
            }

        </div >

    );
}

export default Management;
